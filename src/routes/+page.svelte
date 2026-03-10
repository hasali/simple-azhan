<script lang="ts">
	
   
    import { onMount } from 'svelte';
    import { shuffle } from '$lib/helpers/shuffler'
	import { tracks } from '$lib/tracks';
    import Clock from '$lib/components/Clock.svelte'
	import { SvelteDate, SvelteSet } from "svelte/reactivity";
    import { getSunTimes } from '$lib/helpers/sun';
   
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
            
            console.log(lat, lon, times)
            //load functions need to return data that is serializable
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
                //create a safety windows of 5 seconds before and 60 seconds after
                console.log(now, targetTime, diff)
                if(diff >= -5000 && diff <= 60000 && (!played.has(targetTime))){ 
                    audio.src = timing.src              
                    audio?.play().catch(()=>{})
                    played.add(targetTime)
                }
            }                    
        }

        tick()
        const interval = setInterval(tick, 15000)
        //midnight reset incase the app is never closed. 
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
<header>
    <h1>Classic Azhan</h1>
</header>
<main>
    <Clock />
    <br/>
    <div>
        <h3>Sehri Time: {prayerTimings.at(0)?.time.toLocaleTimeString([], {timeStyle:'short'})}</h3>
        <h3>Zuhr Time: {prayerTimings.at(1)?.time.toLocaleTimeString([], {timeStyle:'short'})}</h3>
        <h3>Iftar Time: {prayerTimings.at(2)?.time.toLocaleTimeString([], {timeStyle:'short'})}</h3>
    </div>
    <br/>
    {#if !audioUnlocked}
    <button class="btn" onclick={unlockAudio}>Enable Audio</button>
{/if}
    <audio bind:this={audio}></audio>
    
</main>
