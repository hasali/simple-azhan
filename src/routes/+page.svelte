<script lang="ts">
	
    import type { PageProps } from "./$types";
    import { onMount } from 'svelte';
    import { shuffle } from '$lib/helpers/shuffler'
	import { tracks } from '$lib/tracks';
    import Clock from '$lib/components/Clock.svelte'
	import { SvelteDate, SvelteSet } from "svelte/reactivity";
    
    const { data }: PageProps = $props()
    let trackList = shuffle(tracks)
    //need to convert the string array back to a an array of dates.
    let prayerTimings = $derived(
        (data.timesList ?? [])
        .filter((t): t is string => !!t)
        .map((t, i) => ({
            time: new SvelteDate(t),
            src: trackList[i % trackList.length].src
        }))
    )
 
    let audioUnlocked = $state(false);

    
    let audio:HTMLAudioElement
    let played = new SvelteSet()

    const unlockAudio = () => {
        audio.play().then(() => {
            audio.pause();
            audioUnlocked = true;
        });
    }
    //let testDate = Date.now() + 60000;
    onMount(() => {
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
        <h3>Sehar Time: {prayerTimings.at(0)?.time.toLocaleTimeString([], {timeStyle:'short'})}</h3>
        <h3>Zuhr Time: {prayerTimings.at(1)?.time.toLocaleTimeString([], {timeStyle:'short'})}</h3>
        <h3>Iftar Time: {prayerTimings.at(2)?.time.toLocaleTimeString([], {timeStyle:'short'})}</h3>
    </div>
    <br/>
    {#if !audioUnlocked}
    <button onclick={unlockAudio}>Enable Audio</button>
{/if}
    <audio bind:this={audio}></audio>
    
</main>
