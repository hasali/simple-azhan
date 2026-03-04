<script lang="ts">
	import type { PageProps } from "./$types";
    import Clock from '$lib/components/Clock.svelte'
    import { onMount } from 'svelte';
    
    const { data }: PageProps = $props()
    
    //need to convert the string array back to a an array of dates.
    const prayerTimings: Date[] = $derived(data.timesList?.filter((t): t is string => !!t).map((t) => new Date(t)))
    
    let audio:any
    
    onMount(() => {
        for(let timing of prayerTimings ){
            const delay = timing?.getTime() - Date.now()
            const interval = setTimeout(() => {
                audio.play()
            }, delay);

            return () => clearInterval(interval);
        }    
    });
    
</script>
<header>
    <h1>Classic Azhan</h1>
</header>
<main>
    <Clock />
    <br/>
    <div>
        <h3>Sehar Time: {prayerTimings.at(0)?.toLocaleTimeString([], {timeStyle:'short'})}</h3>
        <h3>Iftar Time: {prayerTimings.at(2)?.toLocaleTimeString([], {timeStyle:'short'})}</h3>
    </div>
    <audio bind:this={audio} src="/audio/01_ismail.mp3"></audio>
</main>
