export async function getWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    '&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather request failed');
  const data = await res.json();
  return data.current;
}
