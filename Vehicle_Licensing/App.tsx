// import * as React from 'react'; // Commented out to avoid importing the entire React library
import React from 'react'; // Importing React to use JSX syntax
import { NavigationContainer, NavigationProp } from '@react-navigation/native'; // Importing NavigationContainer and NavigationProp from @react-navigation/native package
import { createStackNavigator, RouteProp } from '@react-navigation/stack'; // Importing createStackNavigator and RouteProp from @react-navigation/stack package
import { View, Button, TextInput, TouchableOpacity, Text } from 'react-native'; // Importing necessary components from react-native package
import RegisterScreen from './Register'; // Importing RegisterScreen component
import RenewalScreen from './Renewal'; // Importing RenewalScreen component
import ChangeOfOwnershipScreen from './ChangeOfOwnership'; // Importing ChangeOfOwnershipScreen component

// Defining types for navigation parameters
type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Renewal: undefined;
  ChangeOfOwnership: undefined;
};

// Creating a stack navigator with RootStackParamList type
const Stack = createStackNavigator<RootStackParamList>();

// Defining types for navigation props
type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

// Home screen component
function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
  const [searchText, setSearchText] = React.useState(''); // State for search text
  const [searchResult, setSearchResult] = React.useState<any[]>([]); // State for search result

  // Function to handle search
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3001/?q=${searchText}`); // Fetching data from backend
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // Parsing response data
      setSearchResult(data); // Updating search result state
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Text input for search */}
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginRight: 10, paddingHorizontal: 8 }}
          onChangeText={setSearchText}
          value={searchText}
          placeholder="Enter search query"
        />
        {/* Button to trigger search */}
        <TouchableOpacity onPress={handleSearch} style={{ backgroundColor: 'blue', padding: 10 }}>
          <Text style={{ color: 'white' }}>Search</Text>
        </TouchableOpacity>
      </View>
      {/* Displaying search results */}
      {searchResult.length > 0 && (
        <View>
          <Text>Search Results:</Text>
          {searchResult.map((merchant, index) => (
            <Text key={index}>{merchant.name || 'Unnamed Merchant'}</Text>
          ))}
        </View>
      )}
      {/* Buttons to navigate to other screens */}
      <Button
        title="Registration"
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title="Renewal"
        onPress={() => navigation.navigate('Renewal')}
      />
      <Button
        title="Change of Ownership"
        onPress={() => navigation.navigate('ChangeOfOwnership')}
      />
    </View>
  );
}

// App component
function App() {
  return (
    <NavigationContainer>
      {/* Using Stack navigator to define navigation flow */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Renewal" component={RenewalScreen} />
        <Stack.Screen name="ChangeOfOwnership" component={ChangeOfOwnershipScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App; // Exporting the App component

