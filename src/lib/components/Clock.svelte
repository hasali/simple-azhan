<script>
  import { onMount } from 'svelte';
  let time = $state(new Date());

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  });
</script>

<h1>{time.toLocaleTimeString()}</h1>