import { StyleSheet } from 'react-native';
export const colors = { primary: '#0f766e', bg: '#f1f5f9', card: '#ffffff', text: '#0f172a', muted: '#64748b', accent: '#f59e0b', danger: '#dc2626' };
export const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  card: { backgroundColor: colors.card, borderRadius: 14, padding: 14, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: 'bold', color: colors.text },
  text: { fontSize: 15, color: colors.text },
  muted: { fontSize: 14, color: colors.muted, marginTop: 2 },
  input: { backgroundColor: colors.card, borderRadius: 10, padding: 12, marginBottom: 10, fontSize: 15 },
  btn: { backgroundColor: colors.primary, borderRadius: 10, padding: 13, alignItems: 'center', marginTop: 4 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
