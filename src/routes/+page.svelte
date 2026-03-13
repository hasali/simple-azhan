<script lang="ts">
    import { onMount } from 'svelte';
    import { shuffle } from '$lib/helpers/shuffler'
	import { tracks } from '$lib/data/tracks';
    import Clock from '$lib/components/Clock.svelte'
	import { SvelteDate, SvelteMap, SvelteSet } from "svelte/reactivity";
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
    const SAFETY_WINDOW = 2 * 60 * 1000 
    let scheduledTimeouts = new SvelteMap<number, ReturnType<typeof setTimeout>>()
    let trackList = shuffle(tracks)
    let audioUnlocked = $state(false)
    let audio:HTMLAudioElement
    let played = new SvelteSet<number>()
    let timesList = $state<sunCalcTiming[]>([])
    let currentDay = $state(new Date().toDateString())

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

        if (!audio) return

        audio.src = '/audio/silent.mp3'

        audio.play()
            .then(() => {
                audio.pause()
                audio.currentTime = 0
                audioUnlocked = true
                console.log("audio unlocked")
            })
            .catch(err => console.log("unlock failed:", err))
    }

    //Create an array of timings matched with randomized audio tracks 
    const prayerTimings = $derived(
        (timesList ?? []).map(({ name, time }, i) => ({
            name,
            time,
            src: trackList[i % trackList.length].src
        }))
    );
    
    played = new SvelteSet(
        prayerTimings
            .filter(p => Date.now() - p.time.getTime() > SAFETY_WINDOW)
            .map(p => p.time.getTime())
    );
    //Separate logic into three categories: rules for audio, scheduling, and missing scheduled time
    const attemptPlay= ((prayer: PrayerTiming)=>{
        const targetTime = prayer.time.getTime()
        const diff = Date.now() - targetTime

        if(played.has(targetTime)){
            console.log("Yes, it has the target time")
            return
        } 
            
        if(diff > SAFETY_WINDOW) {
            played.add(targetTime)   
            return
        }
        if(!audioUnlocked){

            console.log("The Audio is not unlocked")
            return
        } 
            
        audio.src = prayer.src

        audio.play()
            .then(()=>played.add(targetTime))
            .catch(()=>{
                setTimeout(()=>attemptPlay(prayer),5000)
            })
    })

    const clearScheduled = (()=>{
        for (const id of scheduledTimeouts.values()){
             clearTimeout(id)
        }
        scheduledTimeouts.clear()
    })

    const schedulePrayers = (() => {
        clearScheduled()

        for (const prayer of prayerTimings){
            const targetTime = prayer.time.getTime()
            const delay = targetTime - Date.now()

            if (delay <= -SAFETY_WINDOW )
                continue

            const id = setTimeout(() => {
                attemptPlay(prayer)
            }, delay)

            scheduledTimeouts.set(targetTime, id)
        }
    })
    const catchMissedPrayers = (() => {
        for (const prayer of prayerTimings) {
            attemptPlay(prayer)
        }
    })
    
        // Reset at midnight
    const scheduleMidnightReset = (() => {
        const nowTime = new Date();
        // next midnight
        const midnight = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate() + 1);
        const msUntilMidnight = midnight.getTime() - now.getTime();

        setTimeout(() => {
            // Reset for the new day
            currentDay = new Date().toDateString();
            played.clear();
            localStorage.removeItem('prayerTimings');
            localStorage.removeItem('prayerTimingsDate');

            // Schedule the next reset
            scheduleMidnightReset();
        }, msUntilMidnight);
    })

    //Find prayers that have occured or have yet to play for UI logic
    
    const nextPrayer = $derived.by<PrayerTiming | null>(() => {        
	    return prayerTimings.find(
            p => p.time.getTime() > now.getTime() && !played.has(p.time.getTime())
        ) ?? null
    })

    const nextPrayerCountdown = $derived.by(() => {
        if (!nextPrayer) return 0

        return nextPrayer.time.getTime() - now.getTime()
    })
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
        if (prayerTimings.length > 0) {
            schedulePrayers()
            catchMissedPrayers()
        }
        scheduleMidnightReset();
        console.log(played)
        console.log(scheduledTimeouts)
    })
    // $effect(() => {
    //     console.log("timesList:", timesList)
    //     console.log("prayerTimings:", prayerTimings)
    //     console.log("tick: ", now.getTime())
    // })
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
                    <div class="stat flex justify-between">
                        {#if nextPrayer?.name === prayer.name}
                        <div>

                            <div class="stat-title text-secondary">{prayer.name}</div>
                            <div class="stat-value text-secondary text-3xl">
                                {nextPrayer.time.toLocaleTimeString([], { timeStyle: 'short' })}
                            </div>
                        </div>
                            <div class="flex stat-value text-secondary text-sm items-end ">  
                                <div>

                                    {formatCountdown(nextPrayerCountdown)}                       
                                </div>                     
                            </div>
                        {:else}
                        <div>

                            <div class="stat-title">{prayer.name}</div>
                            <div class="stat-value text-primary text-xl">
                                {prayer.time.toLocaleTimeString([], { timeStyle: 'short' })}
                            </div>
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
