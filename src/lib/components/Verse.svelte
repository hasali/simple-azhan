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
<div class="flex-col verse-container text-amber-200">
    
    <div class="verse text-3xl ">
        <p dir="rtl">{msg.verseArab}</p>
    </div>
    <div class="text-sm">

        <p class="verse-eng">{msg.verseEng}</p>
        <p class="verse-ref">{msg.verseSurah}</p>
        <p class="verse-ref">{msg.verseAyah}</p><br/>
        
        <p class="hadith">{msg.hadith}</p>
        <p class="hadith-src">{msg.hadithSrc}</p><br/>
        
        
    </div>

</div>
<style>
    .verse-container{
    position: relative;
    padding: 4rem;
    

    /* Islamic ornamental border */
    background-image: url("/verse-frame.svg");
    background-size: contain;
background-repeat: no-repeat;
background-position: center;
    /* inner panel */
   
}

/* Arabic verse */
.verse-arabic{
    text-align: center;
    line-height: 1.9;
    margin-bottom: 1rem;
    font-family: "Noto Naskh Arabic", serif;
}

/* English translation */
.verse-eng{
    font-style: italic;
    
    margin-bottom: 0.5rem;
}

/* reference text */
.verse-ref{
    text-align: center;
    opacity: 0.85;
}

/* hadith */
.hadith{
    margin-top: 1rem;
    font-style: italic;
}

.hadith-src{
    opacity: 0.75;
}

/* theme */
.theme{
    margin-top: 0.5rem;
    font-weight: 500;
    opacity: 0.9;
}
</style>