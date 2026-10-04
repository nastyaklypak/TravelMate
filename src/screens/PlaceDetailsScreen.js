import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favoritesSlice';
import { colors, s } from '../theme';

export default function PlaceDetailsScreen({ route }) {
  const { id, name, city, category, description } = route.params;
  const dispatch = useDispatch();
  const isFav = useSelector((st) => st.favorites.ids.includes(id));

  return (
    <View style={s.screen}>
      <View style={s.card}>
        <Text style={s.title}>{name}</Text>
        <Text style={s.muted}>{city} · {category}</Text>
        <Text style={[s.text, { marginTop: 12, lineHeight: 22 }]}>{description}</Text>
      </View>
      <TouchableOpacity style={[s.btn, isFav && { backgroundColor: colors.accent }]} onPress={() => dispatch(toggleFavorite(id))}>
        <Text style={s.btnText}>{isFav ? '❤️ Saved — tap to remove' : '🤍 Save place'}</Text>
      </TouchableOpacity>
    </View>
  );
}
