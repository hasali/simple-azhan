import SunCalc from 'suncalc';

// Register once at module load
SunCalc.addTime(-15, 'customDawn', 'customDusk');

export const getSunTimes = (date: Date,lat: number,lon: number) => {
  return SunCalc.getTimes(date, lat, lon) as SunCalc.GetTimesResult & {
    customDawn?: Date;
    customDusk?: Date;
  };
}