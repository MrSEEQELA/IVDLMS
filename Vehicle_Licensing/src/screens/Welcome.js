/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text,
  SafeAreaView,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const {height} = Dimensions.get('window');

const Welcome: React.FC<Props> = ({navigation: {navigate}}) => {
  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          style={{height: height / 2.5, marginTop:10}}
          resizeMode="contain"
          source={require('../../assets/social.png')} />
        <View style={{paddingHorizontal:40, paddingTop:40 }}>
            <Text style={{fontSize: 35, color: '#1F41BB', textAlign: 'center'}}>
                Discover Your Social Platform Here
            </Text>

            <Text style={{fontSize:14, color:'#000', textAlign:'center', marginTop:20}}>
                Explore all the soical role based on your interest
            </Text>
        </View>
        <View style={{paddingHorizontal:20, paddingTop:60, flexDirection:"row"}}>
          <TouchableOpacity
            onPress={() => {
              console.log('login');
              navigate("Login");
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#1F41BB',
              paddingVertical: 15,
              paddingHorizontal: 20,
              width: '48%',
              borderRadius: 10,
              shadowColor: '#1f41bb',
              shadowOffset: {width: 0, height: 10},
              shadowOpacity: 0.3,
              shadowRadius: 10}}>
                <Text style={{color:'#fff', fontSize:20, textAlign:'center'}}>
                    Login
                </Text>
            </TouchableOpacity>


            <TouchableOpacity style={{paddingVertical:15, paddingHorizontal:20, width:'48%', borderRadius:10,  shadowColor: '#FFF',
              shadowOffset: {width: 0, height: 10},
              shadowOpacity: 0.3,
              shadowRadius: 10}}
              onPress={() => {
                console.log('login');
                navigate("Register");
              }}
              >
                <Text style={{color:'#000', fontSize:20, textAlign:'center'}}>
                    Register
                </Text>

            </TouchableOpacity>
        </View>

      </View>   
    </SafeAreaView>
  );
};

export default Welcome;
Copy