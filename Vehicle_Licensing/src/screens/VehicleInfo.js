// VehicleInfoScreen.js

import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Picker } from 'react-native';
import axios from 'axios';

const VehicleInfoScreen = ({ route, navigation }) => {
  
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [make, setMake] = useState('');
  const [seriesName, setSeriesName] = useState('');
  const [vehicleCategory, setVehicleCategory] = useState('');
  const [driven, setDriven] = useState('');
  const [vehicleDescription, setVehicleDescription] = useState('');
  const [netPowerAndEngineCapacity, setNetPowerAndEngineCapacity] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [tareAndGrossVehicleMass, setTareAndGrossVehicleMass] = useState('');
  const [permissibleVMass, setPermissibleVMass] = useState('');
  const [drawingVMass, setDrawingVMass] = useState('');
  const [transmission, setTransmission] = useState('');
  const [colour, setColour] = useState('');
  const [transpotationOf, setTranspotationOf] = useState('');
  const [economicSector, setEconomicSector] = useState('');
  const [vStreetAddress, setVStreetAddress] = useState('');
  const [ownership, setOwnership] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3001/vehicle_info', {
        registrationNumber,
        make,
        seriesName,
        vehicleCategory,
        driven,
        vehicleDescription,
        netPowerAndEngineCapacity,
        fuelType,
        tareAndGrossVehicleMass,
        permissibleVMass,
        drawingVMass,
        transmission,
        colour,
        transpotationOf,
        economicSector,
        vStreetAddress,
        ownership,
      });

      console.log(response.data);

      if (response.status === 200) {
        alert('Vehicle info stored successfully');
        // Navigate to the next screen or perform any other action
      } else {
        alert('Failed to store vehicle info');
      }
    } catch (error) {
      console.error('Error storing vehicle info:', error);
      alert('Error storing vehicle info. Please try again.');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>E. Particulars of Motor Vehicle</Text>
      <TextInput
        style={styles.input}
        placeholder="Registration Number"
        value={registrationNumber}
        onChangeText={setRegistrationNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Make"
        value={make}
        onChangeText={setMake}
      />
      <TextInput
        style={styles.input}
        placeholder="Series Name"
        value={seriesName}
        onChangeText={setSeriesName}
      />
      <TextInput
        style={styles.input}
        placeholder="Vehicle Category"
        value={vehicleCategory}
        onChangeText={setVehicleCategory}
      />                        
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Driven:</Text>
        <Picker
          selectedValue={driven}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setDriven(itemValue)}
        >
          <Picker.Item label="Select Type" value="" />
          <Picker.Item label="Self-propelled" value="Self-propelled" />
          <Picker.Item label="Trailor" value="Trailor" />
          <Picker.Item label="semi-trailor" value="semi-trailor" />
          <Picker.Item label="trailer drawn by tractor" value="trailer drawn by tractor" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Vehicle Description"
        value={vehicleDescription}
        onChangeText={setVehicleDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Net Power and engine capacity"
        value={netPowerAndEngineCapacity}
        onChangeText={setNetPowerAndEngineCapacity}
      />
      <TextInput
        style={styles.input}
        placeholder="Fuel Type"
        value={fuelType}
        onChangeText={setFuelType}
      />
      <TextInput
        style={styles.input}
        placeholder="Tare(T) and Gross Vehicle Mass(GVM)"
        value={tareAndGrossVehicleMass}
        onChangeText={setTareAndGrossVehicleMass}
      />
      <TextInput
        style={styles.input}
        placeholder="Maximum Permissible Vehicle Mass"
        value={permissibleVMass}
        onChangeText={setPermissibleVMass}
      />
      <TextInput
        style={styles.input}
        placeholder="Maximum Drawing Vehicle Mass"
        value={drawingVMass}
        onChangeText={setDrawingVMass}
      />
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Transmission:</Text>
        <Picker
          selectedValue={transmission}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setDriven(itemValue)}
        >
          <Picker.Item label="Select Type" value="" />
          <Picker.Item label="Manual" value="Manual" />
          <Picker.Item label="semi-automatic" value="semi-automatic" />
          <Picker.Item label="automatic" value="automatic" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Main Colour"
        value={colour}
        onChangeText={setColour}
      />
      <TextInput
        style={styles.input}
        placeholder="Used for the Transportation of:"
        value={transpotationOf}
        onChangeText={setTranspotationOf}
      />
      <TextInput
        style={styles.input}
        placeholder="Economic Sector in Which Used:"
        value={economicSector}
        onChangeText={setEconomicSector}
      />
      <TextInput
        style={styles.input}
        placeholder="Street Address where Vehicle is Kept"
        value={vStreetAddress}
        onChangeText={setVStreetAddress}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ownership:</Text>
        <Picker
          selectedValue={ownership}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setDriven(itemValue)}
        >
          <Picker.Item label="Select Type" value="" />
          <Picker.Item label="Private" value="Private" />
          <Picker.Item label="Business" value="Business" />
          <Picker.Item label="Motor Dealer" value="MOtor Dealer" />
        </Picker>
      </View>
      

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};
 
 
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  }, 
});

export default VehicleInfoScreen;

