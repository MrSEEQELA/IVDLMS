import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RenewalScreen from './src/screens/RenewalForm'; // Import RenewalForm
import VehicleInfoScreen from './src/screens/VehicleInfo';

const Stack = createStackNavigator();

const Register = () => {
  return (
    <Stack.Navigator initialRouteName="RenewalForm"> 
      <Stack.Screen name="RenewalForm" component={RenewalScreen} /> 
      <Stack.Screen name="VehicleInfo" component={VehicleInfoScreen} />
    </Stack.Navigator>
  );
};

export default Register;

