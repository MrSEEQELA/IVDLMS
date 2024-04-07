/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Text, SafeAreaView, View, TouchableOpacity, Image} from 'react-native';
import AppTextInput from '../components/AppTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Login: React.FC<Props> = ({navigation: {navigate}}) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <SafeAreaView>
      <View style={{padding:20}}>
          <View style={{alignItems:'center'}}>
                <Image
                style={{height: 100}}
                resizeMode="contain"
                source={require('../../assets/social.png')} />
                <Text style={{fontSize:30, color:'#1f41bb', marginVertical:30, fontWeight:'bold'}}>
                      Login Here
                </Text>
                <Text style={{fontSize:24, maxWidth:'60%', textAlign:'center', fontWeight:'600'}}>
                  Welcome back you've been missed!
                </Text>
          </View>
          <View style={{marginVertical:30}}>
              <AppTextInput  placeholder='Email' />
              <AppTextInput  placeholder='Password' />
          </View>

          <View>
              <Text style={{
                fontSize:14,
                color:'#1f41bb',
                alignSelf:'flex-end'
              }}>
                Forgot your password ?
              </Text>
          </View>
          <TouchableOpacity style={{
              padding:20,
              marginVertical:30,
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
                    Sign in
                  </Text>

          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
                console.log('login');
                navigate("Register");
              }} style={{
              padding:10}}>

                  <Text style={{
                    color:'#000',
                    textAlign:'center',
                    fontSize:14
                  }}>
                   Create new account
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

export default Login;
Copy