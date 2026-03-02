
import type { PageLoad } from './$types';
import { getSunTimes } from '$lib/sun';

export const load: PageLoad = async () => {
    
    const lat = 43.486167
    const lon = -79.868157
    const date = new Date()
       
    const times = getSunTimes(date, lat, lon) 
        
    return{
        sehar: times.customDawn,
        iftar: times.sunset

    } 
}


