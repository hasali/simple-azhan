<script lang="ts">
    import { dailyVerses, type DailyMessage } from "$lib/data/verses";
    const getDailyVerse = (verses:DailyMessage[]):DailyMessage =>{

        const today = new Date()
        
        const seed =
        today.getFullYear() * 10000 +
        (today.getMonth() + 1) * 100 +
        today.getDate()
        
        const index = seed % dailyVerses.length

        return verses[index]
    }
    const msg = getDailyVerse(dailyVerses)
</script>
<div class="flex-col verse-container ">
    <img src="/verse-ceiling.svg" alt="lantern svg">
    <div class="verse text-2xl text-accent font-bold">
        <p dir="rtl">{msg.verseArab}</p>
    </div>
    <div class="text-sm my-2">

        <p class="italic">{msg.verseEng}</p>
        <p class="verse-ref">{msg.verseSurah} {msg.verseAyah}</p>
        
        <p class="hadith">{msg.hadith}</p>
        <p class="hadith-src">{msg.hadithSrc}</p><br/>
        
        
    </div>

</div>
<style>
    .verse-container{
    position: relative;
    padding: 3rem;
    

    /* Islamic ornamental border */
    
    /* inner panel */
   
}

/* Arabic verse */


/* reference text */
.verse-ref{
    text-align: center;
    opacity: 0.75;
}

/* hadith */
.hadith{
    margin-top: 1rem;
    font-style: italic;
}

.hadith-src{
    text-align: center;
    opacity: 0.75;
}

/* theme */
.theme{
    margin-top: 0.5rem;
    font-weight: 500;
    opacity: 0.9;
}
</style>