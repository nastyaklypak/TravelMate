import { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, removeExpense } from '../redux/tripsSlice';
import { colors, s } from '../theme';

export default function BudgetScreen({ route }) {
  const { tripId } = route.params;
  const trip = useSelector((st) => st.trips.items.find((t) => t.id === tripId));
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  if (!trip) return null;
  const spent = trip.expenses.reduce((a, e) => a + e.amount, 0);
  const left = trip.budget - spent;
  const pct = Math.min(100, (spent / trip.budget) * 100);

  const add = () => {
    if (!title.trim() || !Number(amount)) return;
    dispatch(addExpense({ tripId, title: title.trim(), amount: Number(amount) }));
    setTitle(''); setAmount('');
  };

  const header = (
    <View>
      <View style={s.card}>
        <Text style={s.title}>€{trip.budget} total</Text>
        <View style={{ height: 10, backgroundColor: colors.bg, borderRadius: 5, marginVertical: 10 }}>
          <View style={{ width: `${pct}%`, height: 10, borderRadius: 5, backgroundColor: left < 0 ? colors.danger : colors.primary }} />
        </View>
        <Text style={s.muted}>Spent €{spent} · Remaining €{left}</Text>
      </View>
      <TextInput style={s.input} placeholder="Expense, e.g. Dinner" value={title} onChangeText={setTitle} />
      <TextInput style={s.input} placeholder="Amount, €" keyboardType="numeric" value={amount} onChangeText={setAmount} />
      <TouchableOpacity style={[s.btn, { marginBottom: 14 }]} onPress={add}><Text style={s.btnText}>+ Add expense</Text></TouchableOpacity>
    </View>
  );

  return (
    <FlatList style={{ backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16 }}
      data={trip.expenses} keyExtractor={(e) => e.id} ListHeaderComponent={header}
      renderItem={({ item }) => (
        <View style={[s.card, s.row]}>
          <Text style={s.text}>{item.title} · €{item.amount}</Text>
          <TouchableOpacity onPress={() => dispatch(removeExpense({ tripId, expenseId: item.id }))}>
            <Text style={{ color: colors.danger, fontWeight: 'bold' }}>Delete</Text>
          </TouchableOpacity>
        </View>
      )} />
  );
}
