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
<div class="">
    <div class="">
        <img src="/ca-verse-ceiling.svg" alt="lantern svg">
    </div>
    <div class="">           
        <div class="verse text-2xl text-amber-200 font-bold border-b border-amber-400 border-dashed ">
            <p class="pt-2 pb-1" dir="rtl">{msg.verseArab}</p>
        </div>       
        <div class=" my-3 italic text-amber-100 flex flex-col items-center">
            <div class="self-start py-2 w-full">              
                <p>{msg.verseEng}</p>
                <div class="text-center text-gray-400">                        
                    <p>{msg.verseSurah} {msg.verseAyah}</p>

                </div>
            </div>
            <div class="w-10 h-10 my-3">

                <img class="" src="/ca-divider.svg" alt="UI divider logo">
            </div>
            
            <div class="self-start py-2 w-full">               
                <p>{msg.hadith}</p>
                <div class="text-center text-gray-400">                  
                    <p class="text-gray-400">{msg.hadithSrc}</p><br/>
                </div>
            </div>
        </div>  
    </div>
</div>
