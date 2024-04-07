/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Text, SafeAreaView, View, TouchableOpacity, Image} from 'react-native';
import AppTextInput from '../components/AppTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Register: React.FC<Props> = ({navigation: {navigate}}) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <SafeAreaView>
      <View style={{padding:20}}>
          <View style={{alignItems:'center'}}>
             
                <Text style={{fontSize:30, color:'#1f41bb', marginVertical:30, fontWeight:'bold'}}>
                     Create Account
                </Text>
                <Text style={{fontSize:20, maxWidth:'80%', textAlign:'center', fontWeight:'600'}}>
                 Create an account so you can explore all the Social platform
                </Text>
          </View>
          <View style={{marginVertical:30}}>
              <AppTextInput placeholder='Name' />
              <AppTextInput placeholder='Email' />
              <AppTextInput placeholder='Password' />
              <AppTextInput placeholder='Confirm Password' />
          </View>
          <TouchableOpacity style={{
              padding:20,
              marginVertical:10,
              backgroundColor: '#1F41BB',
              borderRadius: 10,
              shadowColor: '#1f41bb',
              shadowOffset: {width: 0, height: 10},
              shadowOpacity: 0.3,
              shadowRadius: 10}}>

                  <Text style={{
                    color:'#fff',
                    textAlign:'center',
                    fontSize:20
                  }}>
                    Sign up
                  </Text>

          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
              console.log('login');
              navigate("Login");
            }} style={{
              padding:10}}>

              <Text style={{
                color:'#000',
                textAlign:'center',
                fontSize:14
              }}>
                Already have an account
              </Text>

          </TouchableOpacity>

          <View style={{marginVertical:30}}>
                <Text style={{color:'#1f41bb', textAlign:'center', fontSize:14}}>
                  or continue with
                </Text>

                <View style={{
                  marginTop:10,
                  flexDirection:'row',
                  justifyContent:'center'
                }}>
                  <TouchableOpacity style={{padding:10, backgroundColor:'#ddd', borderRadius:5, marginHorizontal:10}}>
                      <Ionicons name="logo-google" color="#000" size={20} />
                  </TouchableOpacity>

                  <TouchableOpacity style={{padding:10, backgroundColor:'#ddd', borderRadius:5, marginHorizontal:10}}>
                      <Ionicons name="logo-apple" color="#000" size={20} />
                  </TouchableOpacity>

                  <TouchableOpacity style={{padding:10, backgroundColor:'#ddd', borderRadius:5, marginHorizontal:10}}>
                      <Ionicons name="logo-twitter" color="#000" size={20} />
                  </TouchableOpacity>

                  <TouchableOpacity style={{padding:10, backgroundColor:'#ddd', borderRadius:5, marginHorizontal:10}}>
                      <Ionicons name="logo-facebook" color="#000" size={20} />
                  </TouchableOpacity>

                </View>
          </View>
      </View>   
    </SafeAreaView>
  );
};

export default Register;