import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome icon library

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = async () => {
    // Clear session
    await AsyncStorage.removeItem('isLoggedIn');
    // Navigate back to login screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBack}>
        <Icon name="arrow-left" size={20} color="white" style={styles.icon} /> {/* Back icon */}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={toggleMenu}>
        <Icon name="user-circle" size={20} color="white" style={styles.icon} /> {/* Profile icon */}
      </TouchableOpacity>
      {menuVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.menuItem}>Logout</Text>
          </TouchableOpacity>
          {/* Add more menu items as needed */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'green',
    height: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  icon: {
    marginRight: 10,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50, // Adjust the top position as needed
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 8,
  },
});

export default CustomHeader;

