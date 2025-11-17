
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LocationsScreen from './src/screens/LocationsScreen';
import NewRequestScreen from './src/screens/NewRequestScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import PublicInfoScreen from './src/screens/PublicInfoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Locais" component={LocationsScreen} />
          <Stack.Screen name="Nova Solicitação" component={NewRequestScreen} />
          <Stack.Screen name="Painel" component={DashboardScreen} />
          <Stack.Screen name="Informações Públicas" component={PublicInfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
