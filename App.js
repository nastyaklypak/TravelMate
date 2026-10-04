import { Provider } from 'react-redux';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import store from './src/redux/store';
import { colors } from './src/theme';
import TripsScreen from './src/screens/TripsScreen';
import TripDetailsScreen from './src/screens/TripDetailsScreen';
import BudgetScreen from './src/screens/BudgetScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import PlaceDetailsScreen from './src/screens/PlaceDetailsScreen';
import SavedScreen from './src/screens/SavedScreen';

const Tab = createBottomTabNavigator();
const TripsStack = createNativeStackNavigator();
const ExploreStack = createNativeStackNavigator();

const header = {
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: 'bold' },
};

function TripsNav() {
  return (
    <TripsStack.Navigator screenOptions={header}>
      <TripsStack.Screen name="TripsList" component={TripsScreen} options={{ title: 'My Trips' }} />
      <TripsStack.Screen name="TripDetails" component={TripDetailsScreen} options={({ route }) => ({ title: route.params.city })} />
      <TripsStack.Screen name="Budget" component={BudgetScreen} options={{ title: 'Trip Budget' }} />
    </TripsStack.Navigator>
  );
}

function ExploreNav() {
  return (
    <ExploreStack.Navigator screenOptions={header}>
      <ExploreStack.Screen name="ExploreList" component={ExploreScreen} options={{ title: 'Explore' }} />
      <ExploreStack.Screen name="PlaceDetails" component={PlaceDetailsScreen} options={({ route }) => ({ title: route.params.name })} />
    </ExploreStack.Navigator>
  );
}

const icon = (e) => () => <Text style={{ fontSize: 20 }}>{e}</Text>;

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ ...header, tabBarActiveTintColor: colors.primary }}>
          <Tab.Screen name="Trips" component={TripsNav} options={{ headerShown: false, tabBarIcon: icon('🧳') }} />
          <Tab.Screen name="Explore" component={ExploreNav} options={{ headerShown: false, tabBarIcon: icon('📍') }} />
          <Tab.Screen name="Saved" component={SavedScreen} options={{ tabBarIcon: icon('❤️') }} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
