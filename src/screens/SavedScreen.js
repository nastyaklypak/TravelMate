import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favoritesSlice';
import { PLACES } from '../data/places';
import { colors, s } from '../theme';

export default function SavedScreen() {
  const ids = useSelector((st) => st.favorites.ids);
  const dispatch = useDispatch();
  const data = PLACES.filter((p) => ids.includes(p.id));

  return (
    <FlatList style={{ backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16 }}
      data={data} keyExtractor={(p) => p.id}
      ListEmptyComponent={<Text style={s.muted}>No saved places yet. Save some in Explore ❤️</Text>}
      renderItem={({ item }) => (
        <View style={[s.card, s.row]}>
          <View>
            <Text style={s.title}>❤️ {item.name}</Text>
            <Text style={s.muted}>{item.city}</Text>
          </View>
          <TouchableOpacity onPress={() => dispatch(toggleFavorite(item.id))}>
            <Text style={{ color: colors.danger, fontWeight: 'bold' }}>Remove</Text>
          </TouchableOpacity>
        </View>
      )} />
  );
}
