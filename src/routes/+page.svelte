<script lang="ts">
	
    import type { PageProps } from "./$types";
    import { onMount } from 'svelte';
    import { shuffle } from '$lib/helpers/shuffler'
	import { tracks } from '$lib/tracks';
    import Clock from '$lib/components/Clock.svelte'
    
    const { data }: PageProps = $props()
    let trackList = shuffle(tracks)
    //need to convert the string array back to a an array of dates.
    let prayerTimings = $derived(
        (data.timesList ?? [])
        .filter((t): t is string => !!t)
        .map((t, i) => ({
            time: new Date(t),
            src: trackList[i % trackList.length].src
        }))
    )
 
    
    let audio:HTMLAudioElement
    let played = new Set()
    onMount(() => {
        const interval = setInterval(() => {
            const now = Date.now()
            for(const timing of prayerTimings ){
                const targetTime = timing?.time.getTime()
                const diff = now - targetTime //so the exact time is past
                //create a safety windows of 5 seconds before and 60 seconds after
                
                if(diff >= -5000 && diff <= 60000 && (!played.has(targetTime))){ 
                    audio.src = timing.src              
                    audio?.play().catch(()=>{})
                    played.add(targetTime)
                }
            }                    
        }, 15000);
        //midnight reset incase the app is never closed. 
        const now = new Date();
        const midnight = new Date();
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
        <h3>Sehar Time: {prayerTimings.at(0)?.time.toLocaleTimeString([], {timeStyle:'short'})}</h3>
        <h3>Iftar Time: {prayerTimings.at(2)?.time.toLocaleTimeString([], {timeStyle:'short'})}</h3>
    </div>
    
    <audio bind:this={audio}></audio>
    
</main>
