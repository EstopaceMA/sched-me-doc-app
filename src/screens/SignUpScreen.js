import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Alert, 
  ActivityIndicator 
} from 'react-native';
import axios from 'axios';
import faker from 'faker';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import Screen from '../components/Screen';


const SignUpScreen = ({navigation, route}) => {
    const [userType] = useState(route.params);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onRegister = () => {
        console.log(userType);
        if(name !== '' && address !=='' && email !== '' && password !== '' && confirmPassword !== '') {
          if(password !== confirmPassword) {
            Alert.alert("Password didn't match!");
          } else {
            register();
          }

        } else {
          Alert.alert("Fill all the fields!");
        }
    }

    const register = async () => {
      userData = {
        "name": name,
        "email": email,
        "password": password,
        "address": address,
        "image": `https://randomuser.me/api/portraits/${faker.helpers.randomize(['men'])}/${faker.datatype.number(60)}.jpg`
      }

      userData.work_schedule = {};

      const params = JSON.stringify(userData);

      const url = (userType === 'patient') 
        ? "https://us-central1-sched-me-doc.cloudfunctions.net/user"
        : "https://us-central1-sched-me-doc.cloudfunctions.net/doctor";

      setIsLoading(true);
      await axios.post(url, params,{
            "headers": {
              "content-type": "application/json",
          },
      }).then((res) => {
        setIsLoading(false);
        Alert.alert("Registration success!");
        navigation.navigate("Login", userType);
      }).catch((err) => {
        console.log(err);
      });
    }


    if(isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <Screen>
        <View style={[styles.container, {flex: 2}]}>
          <AppTextInput 
            placeholder="Name"
            textAlign="left"
            value={name}
            onChangeText={(val) => setName(val)}
          />    
          <AppTextInput 
            placeholder="Email"
            textAlign="left"
            value={email}
            onChangeText={(val) => setEmail(val)}
          />
          <AppTextInput 
            placeholder="Address"
            textAlign="left"
            value={address}
            onChangeText={(val) => setAddress(val)}
          />
          <AppTextInput 
            placeholder="Password"
            textAlign="left"
            value={password}
            onChangeText={(val) => setPassword(val)}
            secureTextEntry={true}
          />
          <AppTextInput 
            placeholder="Confirm Password"
            textAlign="left"
            value={confirmPassword}
            onChangeText={(val) => setConfirmPassword(val)}
            secureTextEntry={true}
          />
          <AppButton title="REGISTER" onPress={() => onRegister()}/>

          <Text 
            style={styles.loginText}
            onPress={() => {navigation.navigate('Login', userType)}}>
            Already Registered? Click here to login
          </Text>                          
        </View>
      </Screen>
      
    );
  
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});