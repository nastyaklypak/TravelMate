import { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { PLACES } from '../data/places';
import { colors, s } from '../theme';

export default function ExploreScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const favs = useSelector((st) => st.favorites.ids);
  const q = query.toLowerCase();
  const data = PLACES.filter((p) => (p.name + p.city).toLowerCase().includes(q));

  return (
    <FlatList style={{ backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16 }}
      data={data} keyExtractor={(p) => p.id}
      ListHeaderComponent={<TextInput style={s.input} placeholder="🔎 Search places or cities..." value={query} onChangeText={setQuery} />}
      renderItem={({ item }) => (
        <TouchableOpacity style={s.card} onPress={() => navigation.navigate('PlaceDetails', item)}>
          <Text style={s.title}>{favs.includes(item.id) ? '❤️ ' : '⭐ '}{item.name}</Text>
          <Text style={s.muted}>{item.city} · {item.category}</Text>
        </TouchableOpacity>
      )} />
  );
}
