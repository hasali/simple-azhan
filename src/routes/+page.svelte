<script lang="ts">
    import { onMount } from 'svelte';
    import { shuffle } from '$lib/helpers/shuffler'
	import { tracks } from '$lib/data/tracks';
    import Clock from '$lib/components/Clock.svelte'
	import { SvelteDate, SvelteSet } from "svelte/reactivity";
    import { getSunTimes } from '$lib/helpers/sun';
	import Verse from '$lib/components/Verse.svelte';
	import { formatCountdown } from '$lib/helpers/formatCountdown';
    
    interface sunCalcTiming{
        name: string,
        time: Date
    }
    interface PrayerTiming {
        name: string
        time: Date
        src: string
    }
    let trackList = shuffle(tracks)
    let audioUnlocked = $state(false)
    let audio:HTMLAudioElement
    let played = new SvelteSet()
    let timesList = $state<sunCalcTiming[]>([])
    
    //A resuable current time, no need for multiple setIntervals/Timeouts
    const now = new SvelteDate()
    $effect(() => {
	    const interval = setInterval(() => {
		    now.setTime(Date.now())
	    }, 1000)

	    return () => clearInterval(interval)
    })

    //Bypass browser auto play policies
    const unlockAudio = () => {
        audio.play().then(() => {
            audio.pause();
            audioUnlocked = true;
        });
    }

   
    const prayerTimings = $derived(
        (timesList ?? []).map(({ name, time }, i) => ({
            name,
            time,
            src: trackList[i % trackList.length].src
        }))
    );
    
    //let testDate = Date.now() + 30000;
    onMount(() => {
        const cached = localStorage.getItem('prayerTimings')
        const cacheDate = localStorage.getItem('prayerTimingsDate')
        const today = new Date().toDateString()

        if (cached && cacheDate === today) {
            timesList = JSON.parse(cached).map((t:sunCalcTiming) => ({
                name: t.name,
                time: new Date(t.time)
            }))
            
        }
        else if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((pos) => {
                const lat = pos.coords.latitude
                const lon = pos.coords.longitude
                const date = new Date();      
                const times = getSunTimes(date, lat, lon);
                const asr = new Date(
                    times.solarNoon.getTime() +
                    (times.sunset.getTime() - times.solarNoon.getTime()) / 2
                )
                //console.log(lat, lon, times)
            
                timesList= [
                    {
                        name: "Fajr",
                        time: times.customDawn
                    },
                    {
                        name: "Zuhr",
                        time: times.solarNoon
                    },
                    {
                        name: "Asr",
                        time: asr
                    },
                    {
                        name: "Maghrib",
                        time: times.sunset
                    },
                    {
                        name: "Isha",
                        time: times.customDusk
                    }
                ]   
                localStorage.setItem('prayerTimings', JSON.stringify(
                    timesList.map(t => ({
                        name: t.name,
                        time: t.time.toISOString()
                    })
                )))
                localStorage.setItem('prayerTimingsDate', today)
            }  
       )}
    })
    $effect(()=>{
        for(const timing of prayerTimings ){
            const targetTime = timing.time.getTime()
            const diff = now.getTime() - targetTime //so the prayer target time has passed if positive
            
            //console.log(now, targetTime, diff)
            
            //create a safety windows of 5 seconds before and 60 seconds after
            if(diff >= -5000 && diff <= 120000 && (!played.has(targetTime))){ 
                audio.src = timing.src              
                audio?.play().catch(()=>{})
                played.add(targetTime)
            }
            else if(diff > 120000 || !(played.has(targetTime)) ){
                played.add(targetTime)
            }   
        }                    
    })

    //midnight reset incase the app is never closed 
    
    let currentDay = $state(new Date().toDateString())

    $effect(() => {
        const today = new Date(now.getTime()).toDateString()

        if (today !== currentDay) {
            currentDay = today
            played.clear()

            localStorage.removeItem('prayerTimings')
            localStorage.removeItem('prayerTimingsDate')
        }
    }) 

    //Find prayers that have occured or have yet to play for UI logic
    
    const nextPrayer = $derived.by<PrayerTiming | null>(() => {
	    return prayerTimings.find(
            p => p.time.getTime() > now.getTime()
        ) ?? null
    })
    const nextPrayerCountdown = $derived.by(()=>{
        
        let timeUntil = 0
        if(nextPrayer)
            timeUntil= nextPrayer.time.getTime() - now.getTime()
	    return nextPrayer ? timeUntil : 0
    })
    $effect(() => {
    console.log("timesList:", timesList)
    console.log("prayerTimings:", prayerTimings)
})
</script>

<header class="navbar bg-base-200 shadow-md">
    <div class="navbar-center w-full justify-center">
        <h1 class="text-2xl font-bold">Classic Azhan</h1>
    </div>
</header>
<main class="flex flex-col items-center gap-6 p-6">

    <div class="card bg-base-200 shadow-xl p-6">
        <Clock />
    </div>

    <div class="card bg-base-100 shadow-xl w-full max-w-md">
        <div class="card-body">
            <h2 class="card-title justify-center">Prayer Times</h2>

            <div class="stats stats-vertical shadow">
                {#each prayerTimings as prayer (prayer.name)}
                <div class="stat">
                    <div class="stat-title">{prayer.name}</div>
                    {#if nextPrayer?.name === prayer.name}
                        <div class="stat-value text-primary text-2xl">
                            {nextPrayer.time.toLocaleTimeString([], { timeStyle: 'short' })}
                        </div>
                        <div class="stat-value text-primary text-sm">                       
                            {formatCountdown(nextPrayerCountdown)}                       
                        </div>
                    {:else}
                        <div class="stat-value text-gray-500 text-xl">
                            {prayer.time.toLocaleTimeString([], { timeStyle: 'short' })}
                        </div>
                    {/if}                   
                </div>
                {/each}     
            </div>
            {#if !audioUnlocked}
                <div class="card-actions justify-center mt-4">
                    <button class="btn btn-primary" onclick={unlockAudio}>
                        Enable Audio
                    </button>
                </div>
            {/if}

        </div>
    </div>

    <audio bind:this={audio}></audio>
<Verse />
</main>
