import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RenewalScreen from './src/screens/RenewalForm'; // Import RenewalForm
import VehicleInfoScreen from './src/screens/VehicleInfo';
import CustomHeader from './src/components/CustomHeader';

const Stack = createStackNavigator();

const Register = () => {
  return (
    <Stack.Navigator initialRouteName="VehicleInfo"> 
      <Stack.Screen name="RenewalForm" component={RenewalScreen} options={{ headerShown: false }} /> 
      <Stack.Screen name="VehicleInfo" options={{ header: (props) => <CustomHeader {...props} /> }} component={VehicleInfoScreen} />
    </Stack.Navigator>
  );
};

export default Register;

