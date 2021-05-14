import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
    StyleSheet, 
    Text, 
    View,
    Alert, 
    ActivityIndicator 
} from 'react-native';
import axios from 'axios';

import {setUser} from '../redux/actions';
import COLORS from '../consts/colors';
import faker from 'faker';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import Screen from '../components/Screen';


const LoginScreen = ({navigation, route}) => {
    const dispatch = useDispatch();
    const [userType] = useState(route.params);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    if(email !== '' || password !== '') {
      const params = JSON.stringify({
        "email": email,
        "password": password,
      });

      const url = (userType === 'patient') 
        ? "https://us-central1-sched-me-doc.cloudfunctions.net/user/login"
        : "https://us-central1-sched-me-doc.cloudfunctions.net/doctor/login"

      setIsLoading(true);
      await axios.post(url, params,{
            "headers": {
              "content-type": "application/json",
          },
      }).then((res) => {
        setIsLoading(false);
        if(Object.keys(res.data).length > 0) {
          res.data.type = userType;
          res.data.image = `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.datatype.number(10)}.jpg`;
          console.log(res.data);
          dispatch(setUser(res.data));
          navigation.navigate((userType === "patient") ? "PatientTabs" : "DoctorTabs");
        } else {
          Alert.alert("Invalid email or password!");
        }
      }).catch((err) => {
        console.log(err);
      });
    } else {
      Alert.alert("Invalid email or password!");
    }
  }

    if(isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color={COLORS.primary}/>
        </View>
      )
    }    
    return (
      <Screen>
        <View style={styles.container}>  
            <AppTextInput 
              placeholder="Email"
              textAlign="left"
              value={email}
              onChangeText={(val) => setEmail(val)}
            />
            <AppTextInput 
              placeholder="Password"
              textAlign="left"
              value={password}
              onChangeText={(val) => setPassword(val)}
              secureTextEntry={true}
            />
          
          <AppButton title="Log in" onPress={() => login()}/>

          <Text 
            style={styles.loginText}
            onPress={() => navigation.navigate('SignUp')}>
            Don't have account? Click here to signup
          </Text>                          
        </View>
      </Screen>
    );
  
}

export default LoginScreen;

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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});


