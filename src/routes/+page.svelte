<script lang="ts">
	import type { PageProps } from "./$types";
    import Clock from '$lib/components/Clock.svelte'

    let { data }: PageProps = $props()

    let currentDate = new Date();
    let seharTime = $derived(data.sehar?.setSeconds(0,0))
    let iftarTime = $derived(data.iftar?.setSeconds(0,0))

    currentDate.setSeconds(0,0)
    
    
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
</main>
