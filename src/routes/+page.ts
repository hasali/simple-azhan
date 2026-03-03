import { shuffle } from '$lib/helpers/shuffler'
import { tracks } from '$lib/tracks'
import type { PageLoad } from './$types'
import { getSunTimes } from '$lib/helpers/sun'

export const load: PageLoad = async () => {
    
    const lat = 43.486167
    const lon = -79.868157
    const date = new Date()
       
    const times = getSunTimes(date, lat, lon) 
    
    //const tracklist = shuffle(tracks)
    return{
        
        sehar: times.customDawn,
        iftar: times.sunset

    } 
}


