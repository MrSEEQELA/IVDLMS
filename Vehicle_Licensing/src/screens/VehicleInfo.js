// VehicleInfoScreen.js

import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const VehicleInfoScreen = ({ route }) => {
  const { name, email } = route.params;
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <View>
      <Text>Personal Information:</Text>
      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
      <TextInput
        placeholder="Vehicle Model"
        value={vehicleModel}
        onChangeText={setVehicleModel}
      />
      <TextInput
        placeholder="Vehicle Make"
        value={vehicleMake}
        onChangeText={setVehicleMake}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default VehicleInfoScreen;

