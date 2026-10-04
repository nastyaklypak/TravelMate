import { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTrip, removeTrip } from '../redux/tripsSlice';
import { DESTINATIONS } from '../data/places';
import { colors, s } from '../theme';

export default function TripsScreen({ navigation }) {
  const trips = useSelector((st) => st.trips.items);
  const dispatch = useDispatch();
  const [dest, setDest] = useState(DESTINATIONS[1]);
  const [dates, setDates] = useState('');
  const [budget, setBudget] = useState('');

  const create = () => {
    if (!dates.trim() || !Number(budget)) return Alert.alert('Fill in dates and budget');
    dispatch(addTrip({ ...dest, dates, budget: Number(budget) }));
    setDates(''); setBudget('');
  };

  const header = (
    <View style={s.card}>
      <Text style={s.title}>New trip</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8 }}>
        {DESTINATIONS.map((d) => (
          <TouchableOpacity key={d.city} onPress={() => setDest(d)}
            style={{ padding: 8, borderRadius: 20, marginRight: 6, marginBottom: 6, backgroundColor: dest.city === d.city ? colors.primary : colors.bg }}>
            <Text style={{ color: dest.city === d.city ? '#fff' : colors.text }}>{d.flag} {d.city}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput style={s.input} placeholder="Dates, e.g. 20–25 Nov 2026" value={dates} onChangeText={setDates} />
      <TextInput style={s.input} placeholder="Budget, €" keyboardType="numeric" value={budget} onChangeText={setBudget} />
      <TouchableOpacity style={s.btn} onPress={create}><Text style={s.btnText}>+ Add trip</Text></TouchableOpacity>
    </View>
  );

  return (
    <FlatList style={{ backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16 }}
      data={trips} keyExtractor={(t) => t.id} ListHeaderComponent={header}
      ListEmptyComponent={<Text style={s.muted}>No trips yet.</Text>}
      renderItem={({ item }) => {
        const spent = item.expenses.reduce((a, e) => a + e.amount, 0);
        return (
          <TouchableOpacity style={s.card} onPress={() => navigation.navigate('TripDetails', { tripId: item.id, city: item.city })}
            onLongPress={() => Alert.alert('Delete trip?', item.city, [{ text: 'Cancel' }, { text: 'Delete', style: 'destructive', onPress: () => dispatch(removeTrip(item.id)) }])}>
            <Text style={s.title}>{item.flag} {item.city}</Text>
            <Text style={s.muted}>{item.dates}</Text>
            <Text style={s.muted}>Spent €{spent} of €{item.budget}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}
