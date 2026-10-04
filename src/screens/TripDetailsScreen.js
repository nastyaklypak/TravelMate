import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { getWeather } from '../services/weatherApi';
import { colors, s } from '../theme';

export default function TripDetailsScreen({ route, navigation }) {
  const trip = useSelector((st) => st.trips.items.find((t) => t.id === route.params.tripId));
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!trip) return;
    getWeather(trip.lat, trip.lon).then(setWeather).catch(() => setError('Could not load weather.'));
  }, [trip?.lat, trip?.lon]);

  if (!trip) return <Text style={s.muted}>Trip not found.</Text>;
  const spent = trip.expenses.reduce((a, e) => a + e.amount, 0);

  return (
    <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16 }}>
      <Text style={s.title}>{trip.flag} {trip.city}, {trip.country}</Text>
      <Text style={[s.muted, { marginBottom: 12 }]}>{trip.dates}</Text>

      <Text style={[s.title, { fontSize: 17 }]}>🌤️ Weather now</Text>
      <Text style={[s.card, { marginTop: 8 }]}>
        {error ? error : !weather ? '' : `${Math.round(weather.temperature_2m)}°C (feels like ${Math.round(weather.apparent_temperature)}°C)\nHumidity ${weather.relative_humidity_2m}%\nWind ${weather.wind_speed_10m} km/h`}
      </Text>
      {!weather && !error && <ActivityIndicator color={colors.primary} />}

      <TouchableOpacity style={s.card} onPress={() => navigation.navigate('Budget', { tripId: trip.id })}>
        <Text style={s.title}>💰 Budget</Text>
        <Text style={s.muted}>Spent €{spent} of €{trip.budget} · tap to manage</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
