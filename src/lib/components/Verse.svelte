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
<div>
    <h1>Saaf Kar Apne Apko</h1><br/>
    <p>{msg.verseArab}</p>
    <p>{msg.verseEng}</p>
    <p>{msg.verseSurah}</p>
    <p>{msg.verseAyah}</p><br/>
    <p>{msg.hadith}</p>
    <p>{msg.hadithSrc}</p><br/>
    <p>{msg.theme}</p>
</div>