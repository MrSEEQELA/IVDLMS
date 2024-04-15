import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChangeOOScreen from './src/screens/ChangeOO';
import VehicleInfoScreen from './src/screens/VehicleInfo';

const Stack = createStackNavigator();

const Register = () => {
  return (
    <Stack.Navigator initialRouteName="ChangeOO">
      <Stack.Screen name="ChangeOO" component={ChangeOOScreen} />
      <Stack.Screen name="VehicleInfo" component={VehicleInfoScreen} />
    </Stack.Navigator>
  );
};

export default Register;

