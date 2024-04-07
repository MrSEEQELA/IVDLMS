import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalInfoScreen from './src/screens/PersonalInfo';
import VehicleInfoScreen from './src/screens/VehicleInfo';

const Stack = createStackNavigator();

const Register = () => {
  return (
    <Stack.Navigator initialRouteName="PersonalInfo">
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="VehicleInfo" component={VehicleInfoScreen} />
    </Stack.Navigator>
  );
};

export default Register;

