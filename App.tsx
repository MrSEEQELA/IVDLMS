import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Picker, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import RenewalScreen from './Renewal';
import ChangeOfOwnershipScreen from './ChangeOfOwnership';
import MyVehiclesScreen from './MyVehiclesScreen';
import CustomHeader from './src/components/CustomHeader';
import PersonalInfoScreen from './src/screens/PersonalInfo';
import ApplyLicenseScreen from './src/screens/ApplyLicenseScreen';
import QuizScreen from './src/screens/QuizScreen';
import QuestionScreen from './src/screens/QuestionScreen';
import ApplicationForm from './src/screens/ApplicationForm';
import AdminScreen from './Admin/AdminScreen';
import ManageDriverScreen from './Admin/ManageDriverScreen';


// Define types for navigation parameters
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Renewal: undefined;
  ChangeOfOwnership: undefined;
  MyVehiclesScreen: undefined;
  PersonalInfo: undefined;
  ApplyLicenseScreen: undefined;
  QuizScreen: undefined;
  QuestionScreen: undefined;
  AdminScreen: undefined;
};

// Create a stack navigator with RootStackParamList type
const Stack = createStackNavigator<RootStackParamList>();



// Home screen component
function HomeScreen({ navigation }: { navigation: any }) {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<any[]>([]);

  const handleMyVehicles = () => {
    navigation.navigate('MyVehiclesScreen'); // Corrected screen name
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/registrations?registrationnumber=${searchText}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Title */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Vehicle Licensing</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 10 }} /> {/* Separator */}
          <Button
            title="My Vehicles"
            onPress={handleMyVehicles} // Handle My Vehicles button press
          />
          <View style={{ width: 10 }} /> {/* Separator */}
          <Button
            title="Registration"
            onPress={() => navigation.navigate('Renewal')}
          />
          <View style={{ width: 10 }} /> {/* Separator */}
          <Button
            title="Driver"
            onPress={() => navigation.navigate('Driver')}
          />
        </View>
      </View>

      {/* Search Input and Button */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', padding: 10 }}>
        <TextInput
          style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, marginRight: 10, paddingHorizontal: 8 }}
          onChangeText={setSearchText}
          value={searchText}
          placeholder="Enter search query"
        />
        <TouchableOpacity onPress={handleSearch} style={{ backgroundColor: 'blue', padding: 10 }}>
          <Text style={{ color: 'white' }}>Search</Text>
        </TouchableOpacity>
      </View>
      
      {/* Displaying search results */}
      {searchResult.length > 0 && (
        <View style={{ padding: 10 }}>
          <Text>Search Results:</Text>
          {searchResult.map((registrations, index) => (
            <Text key={index}>{registrations.status || 'No vehicle'}</Text>
          ))}
        </View>
      )}
    </View>
  );
}










// App component
function App() {
  return (
    <NavigationContainer>
      {/* Using Stack navigator to define navigation flow */}
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Driver" options={{ header: (props) => <CustomHeader {...props} /> }} component={ApplyLicenseScreen} />
        <Stack.Screen name="Home" options={{ header: (props) => <CustomHeader {...props} /> }} component={HomeScreen} />
        <Stack.Screen name="AdminScreen" options={{ header: (props) => <CustomHeader {...props} /> }} component={AdminScreen} />
        <Stack.Screen name="QuizScreen" options={{ header: (props) => <CustomHeader {...props} /> }} component={QuizScreen} />
        <Stack.Screen name="QuestionScreen" options={{ header: (props) => <CustomHeader {...props} /> }} component={QuestionScreen} />
        <Stack.Screen name="ApplicationForm" options={{ header: (props) => <CustomHeader {...props} /> }} component={ApplicationForm} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
        <Stack.Screen name="MyVehiclesScreen" options={{ header: (props) => <CustomHeader {...props} /> }} component={MyVehiclesScreen} />
        <Stack.Screen name="Renewal" component={RenewalScreen} />
        <Stack.Screen name="ChangeOfOwnership" component={ChangeOfOwnershipScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

