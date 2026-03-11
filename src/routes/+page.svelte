<script lang="ts">
	
   
    import { onMount } from 'svelte';
    import { shuffle } from '$lib/helpers/shuffler'
	import { tracks } from '$lib/data/tracks';
    import Clock from '$lib/components/Clock.svelte'
	import { SvelteDate, SvelteSet } from "svelte/reactivity";
    import { getSunTimes } from '$lib/helpers/sun';
	import Verse from '$lib/components/Verse.svelte';
   
    interface PrayerTiming {
        time: Date;
        src: string;
    }
    let prayerTimings = $state<PrayerTiming[]>([])
    let trackList = shuffle(tracks)
    let audioUnlocked = $state(false)
    let audio:HTMLAudioElement
    let played = new SvelteSet()
    let timesList:Date[]=[]
   
    const unlockAudio = () => {
        audio.play().then(() => {
            audio.pause();
            audioUnlocked = true;
        });
    }
    //let testDate = Date.now() + 30000;
    onMount(() => {
        if(!navigator.geolocation){
            console.error("Geolocation not supported")
            return
        }
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude
            const lon = pos.coords.longitude
            const date = new Date();      
            const times = getSunTimes(date, lat, lon);
            
            //console.log(lat, lon, times)
        
            timesList= [
                times.customDawn,
                times.solarNoon,
                times.sunset
            ]   
            prayerTimings = (timesList ?? []).map((t, i) => ({
            time: new Date(t),
            src: trackList[i % trackList.length].src
        })) 
         })
        
        const tick = () => {
            const now = Date.now()
            for(const timing of prayerTimings ){
                const targetTime = timing?.time.getTime()
                const diff = now - targetTime //so the exact time is past
                
                //console.log(now, targetTime, diff)

                //create a safety windows of 5 seconds before and 60 seconds after
                if(diff >= -5000 && diff <= 120000 && (!played.has(targetTime))){ 
                    audio.src = timing.src              
                    audio?.play().catch(()=>{})
                    played.add(targetTime)
                }
                // else if(diff > 120000 && now > targetTime && !(played.has(targetTime)) ){
                //     played.add(targetTime)
                // }

            }                    
        }

        tick()
        const interval = setInterval(tick, 15000)
        //midnight reset incase the app is never closed 
        const now = new SvelteDate();
        const midnight = new SvelteDate();
        midnight.setHours(24, 0, 0, 0);
        const msUntilMidnight = midnight.getTime() - now.getTime();

        const midnightTimeout = setTimeout(() => {
            played.clear();
        }, msUntilMidnight);  
        return () => {
            clearTimeout(midnightTimeout)   
            clearInterval(interval) 
        }
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

                <div class="stat">
                    <div class="stat-title">Sehri</div>
                    <div class="stat-value text-primary text-2xl">
                        {prayerTimings.at(0)?.time.toLocaleTimeString([], { timeStyle: 'short' })}
                    </div>
                </div>

                <div class="stat">
                    <div class="stat-title">Zuhr</div>
                    <div class="stat-value text-secondary text-2xl">
                        {prayerTimings.at(1)?.time.toLocaleTimeString([], { timeStyle: 'short' })}
                    </div>
                </div>

                <div class="stat">
                    <div class="stat-title">Iftar</div>
                    <div class="stat-value text-accent text-2xl">
                        {prayerTimings.at(2)?.time.toLocaleTimeString([], { timeStyle: 'short' })}
                    </div>
                </div>

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
