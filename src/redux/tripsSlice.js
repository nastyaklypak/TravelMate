import { createSlice, nanoid } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'trips',
  initialState: {
    items: [{ id: '1', city: 'Rome', country: 'Italy', flag: '🇮🇹', lat: 41.9, lon: 12.5, dates: '12–17 Oct 2026', budget: 700,
      expenses: [{ id: 'e1', title: 'Hotel', amount: 250 }] }],
  },
  reducers: {
    addTrip: {
      reducer: (state, action) => { state.items.push(action.payload); },
      prepare: (trip) => ({ payload: { ...trip, id: nanoid(), expenses: [] } }),
    },
    removeTrip: (state, action) => { state.items = state.items.filter((t) => t.id !== action.payload); },
    addExpense: (state, { payload }) => {
      const trip = state.items.find((t) => t.id === payload.tripId);
      if (trip) trip.expenses.push({ id: nanoid(), title: payload.title, amount: payload.amount });
    },
    removeExpense: (state, { payload }) => {
      const trip = state.items.find((t) => t.id === payload.tripId);
      if (trip) trip.expenses = trip.expenses.filter((e) => e.id !== payload.expenseId);
    },
  },
});
export const { addTrip, removeTrip, addExpense, removeExpense } = slice.actions;
export default slice.reducer;
