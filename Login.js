import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import PersonalInfoScreen from './src/screens/PersonalInfo';
import CustomHeader from './src/components/CustomHeader';
import AdminScreen from './Admin/AdminScreen';
import ManageDriverScreen from './Admin/ManageDriverScreen';

const Stack = createStackNavigator();

const Login = () => {
  return (
    <Stack.Navigator initialRouteName="NavLogin"> 
      <Stack.Screen name="NavLogin" component={LoginScreen} options={{ headerShown: false }} /> 
      <Stack.Screen name="PersonalInfo" options={{ header: (props) => <CustomHeader {...props} /> }} component={PersonalInfoScreen} />
      <Stack.Screen name="AdminScreen" options={{ header: (props) => <CustomHeader {...props} /> }} component={AdminScreen} />
      <Stack.Screen name="ManageDriverScreen" options={{ header: (props) => <CustomHeader {...props} /> }} component={ManageDriverScreen} />
    </Stack.Navigator>
  );
};

export default Login;
