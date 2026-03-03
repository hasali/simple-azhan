<script lang="ts">
	import type { PageProps } from "./$types";
    import Clock from '$lib/components/Clock.svelte'
    import { onMount } from 'svelte';
    
    let { data }: PageProps = $props()
    let time = $state(new Date());

    let currentDate = new Date();
    let seharTime = $derived<Date | undefined>(data.sehar)
    let iftarTime = $derived<Date | undefined>(data.iftar)
    
    let audio:any
    let enabled = false
    let targetTime = new Date(Date.now() + 60000)

    
    
    currentDate.setSeconds(0,0)
    onMount(() => {
        const delay = targetTime.getTime() - Date.now()
        const interval = setTimeout(() => {
            audio.play()
            // time = new Date();
            // if ((seharTime?.getTime() == time.getTime()) || iftarTime?.getTime() == time.getTime()){
            //     audio.play()
            // }
        }, delay);
        
        return () => clearInterval(interval); // Cleanup
    });
    
</script>
<header>
    <h1>Classic Azhan</h1>
</header>
<main>
    <Clock />
    <div>
        <h3>Sehar Time: {data.sehar?.toLocaleTimeString([], {timeStyle:'short'})}</h3>
        <h3>Iftar Time: {data.iftar?.toLocaleTimeString([], {timeStyle:'short'})}</h3>
    </div>
    <audio bind:this={audio} src="/audio/01_ismail.mp3"></audio>
</main>
