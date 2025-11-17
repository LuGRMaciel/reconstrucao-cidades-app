
import fetch from 'node-fetch';

export interface WeatherPoint { time: string; temperature_2m?: number; precipitation_probability?: number; }

export async function fetchWeather(lat: number, lon: number) {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(lat));
  url.searchParams.set('longitude', String(lon));
  url.searchParams.set('hourly', 'temperature_2m,precipitation_probability');
  url.searchParams.set('timezone', 'auto');

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Weather API error: ' + res.status);
  const json = await res.json();

  const times: string[] = json.hourly?.time || [];
  const temps: number[] = json.hourly?.temperature_2m || [];
  const precip: number[] = json.hourly?.precipitation_probability || [];
  const points = times.map((t: string, i: number) => ({
    time: t,
    temperature_2m: temps[i],
    precipitation_probability: precip[i]
  }));

  return {
    latitude: json.latitude,
    longitude: json.longitude,
    timezone: json.timezone,
    hourly: points.slice(0, 24) // 24h
  };
}
