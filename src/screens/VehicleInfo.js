import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Picker, ScrollView } from 'react-native';
import axios from 'axios';

const VehicleInfoScreen = ({ route, navigation }) => {
  
  const [chasisnumber, setchasisnumber] = useState('');
  const [make, setMake] = useState('');
  const [series_name, setseries_name] = useState('');
  const [vehicle_category, setvehicle_category] = useState('');
  const [driven, setDriven] = useState('');
  const [vehicle_description, setvehicle_description] = useState('');
  const [net_power_and_engine_capacity, setnet_power_and_engine_capacity] = useState('');
  const [fuel_type, setfuel_type] = useState('');
  const [tare_and_gross_vehicle_mass, settare_and_gross_vehicle_mass] = useState('');
  const [permissible_v_mass, setpermissible_v_mass] = useState('');
  const [drawing_v_mass, setdrawing_v_mass] = useState('');
  const [transmission, setTransmission] = useState('');
  const [colour, setColour] = useState('');
  const [transpotation_of, settranspotation_of] = useState('');
  const [economic_sector, seteconomic_sector] = useState('');
  const [v_street_address, setv_street_address] = useState('');
  const [ownership, setOwnership] = useState('');
  const [identification_number, setidentification_number] = useState('');
  
  

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/vehicle-info', {
        chasisnumber,
        make,
        series_name,
        vehicle_category,
        driven,
        vehicle_description,
        net_power_and_engine_capacity,
        fuel_type,
        tare_and_gross_vehicle_mass,
        permissible_v_mass,
        drawing_v_mass,
        transmission,
        colour,
        transpotation_of,
        economic_sector,
        v_street_address,
        ownership,
        identification_number
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>E. Particulars of Motor Vehicle</Text>
      <TextInput
        style={styles.input}
        placeholder="Chasis Number"
        value={chasisnumber}
        onChangeText={setchasisnumber}
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
        value={series_name}
        onChangeText={setseries_name}
      />
      <TextInput
        style={styles.input}
        placeholder="Vehicle Category"
        value={vehicle_category}
        onChangeText={setvehicle_category}
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
        value={vehicle_description}
        onChangeText={setvehicle_description}
      />
      <TextInput
        style={styles.input}
        placeholder="Net Power and engine capacity"
        value={net_power_and_engine_capacity}
        onChangeText={setnet_power_and_engine_capacity}
      />
      <TextInput
        style={styles.input}
        placeholder="Fuel Type"
        value={fuel_type}
        onChangeText={setfuel_type}
      />
      <TextInput
        style={styles.input}
        placeholder="Tare(T) and Gross Vehicle Mass(GVM)"
        value={tare_and_gross_vehicle_mass}
        onChangeText={settare_and_gross_vehicle_mass}
      />
      <TextInput
        style={styles.input}
        placeholder="Maximum Permissible Vehicle Mass"
        value={permissible_v_mass}
        onChangeText={setpermissible_v_mass}
      />
      <TextInput
        style={styles.input}
        placeholder="Maximum Drawing Vehicle Mass"
        value={drawing_v_mass}
        onChangeText={setdrawing_v_mass}
      />
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Transmission:</Text>
        <Picker
          selectedValue={transmission}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setTransmission(itemValue)}
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
        value={transpotation_of}
        onChangeText={settranspotation_of}
      />
      <TextInput
        style={styles.input}
        placeholder="Economic Sector in Which Used:"
        value={economic_sector}
        onChangeText={seteconomic_sector}
      />
      <TextInput
        style={styles.input}
        placeholder="Street Address where Vehicle is Kept"
        value={v_street_address}
        onChangeText={setv_street_address}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ownership:</Text>
        <Picker
          selectedValue={ownership}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setOwnership(itemValue)}
        >
          <Picker.Item label="Select Type" value="" />
          <Picker.Item label="Private" value="Private" />
          <Picker.Item label="Business" value="Business" />
          <Picker.Item label="Motor Dealer" value="Motor Dealer" />
        </Picker>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Identification Number"
        value={identification_number}
        onChangeText={setidentification_number}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};
 
 
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default VehicleInfoScreen;

