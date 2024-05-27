import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleLogin = async () => {
    try {
      console.log(`Fetching personal info for ID: ${identificationNumber}`);
      const response = await axios.get(`http://localhost:8080/personal-info/${identificationNumber}`);

      if (response.status === 200) {
        const userInfo = response.data.storedPersonalInfo;
        console.log('Fetched user info:', userInfo);

        const isAuthorized = (identificationNumber === userInfo.identification_number) && (password === userInfo.password);
        console.log('Entered password:', password);
        console.log('Stored password:', userInfo.password);
        console.log('Is authorized:', isAuthorized);

        if (isAuthorized) {
          setIsLoggedIn(true);
          setLoginError('');
          toggleModal();

          if (identificationNumber.startsWith('0000')) {
            navigation.navigate('AdminScreen');
          } else {
            navigation.navigate('Home');
          }
        } else {
          setLoginError('Incorrect identification number or password.');
        }
      } else {
        setLoginError('Failed to fetch personal info');
      }
    } catch (error) {
      setLoginError('Error logging in. Please try again.');
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIdentificationNumber('');
    setPassword('');
    toggleModal();
  };

  const navigateToPersonalInfo = () => {
    toggleModal(); // Close the modal before navigating
    navigation.navigate('PersonalInfo');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to IVDLMS</Text>
        <TouchableOpacity onPress={toggleModal} style={styles.profileIcon}>
          <FontAwesome name="user-circle" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>MANAGE YOUR LICENSES IN THE COMFORT OF YOUR HOME</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>IVDLMS</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {isLoggedIn ? (
              <>
                <TouchableOpacity onPress={handleLogout} style={styles.modalButton}>
                  <Text>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
                  <Text>Settings</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Identification Number"
                  value={identificationNumber}
                  onChangeText={setIdentificationNumber}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
                {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                  <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToPersonalInfo} style={styles.createAccountButton}>
                  <Text>Create New Account</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    height: 60,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,
  },
  headerText: {
    fontSize: 20,
    color: '#ffffff',
    flex: 1,
  },
  profileIcon: {
    position: 'absolute',
    right: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentText: {
    fontSize: 18,
    textAlign: 'center',
  },
  footer: {
    height: 60,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    color: '#ffffff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
  },
  loginButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  createAccountButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  modalButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;

