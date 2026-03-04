import type { PageLoad } from './$types';
import { getSunTimes } from '$lib/helpers/sun';

export const load: PageLoad = () => {
	const lat = 43.486167;
	const lon = -79.868157;
	const date = new Date();

	const times = getSunTimes(date, lat, lon);

	//load functions need to return data that is serializable
    return {
        timesList: [
            times.customDawn?.toISOString(),
            times.solarNoon?.toISOString(),
            times.sunset?.toISOString()
        ]
    };
};
