import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    Button, 
    Alert, 
    ActivityIndicator 
} from 'react-native';
import axios from 'axios';
import {setUser} from '../redux/actions';


const LoginScreen = ({navigation, route}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);
    const [userType] = useState(route.params);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(userType);
    console.log(currentUser);
  },[]);

  const login = async () => {
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
        res.data.type = userType;
        console.log(res.data);
        dispatch(setUser(res.data));
        if(Object.keys(res.data).length > 0) {
          navigation.navigate((userType === "patient") ? "PatientTabs" : "DoctorTabs", res.data);
        } else {
          Alert.alert("Invalid email and password!");
        }
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
      <View style={styles.container}>  
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          maxLength={15}
          secureTextEntry={true}
        />   
        <Button
          color="#3740FE"
          title="Signin"
          onPress={() => login()}
        />   

        <Text 
          style={styles.loginText}
          onPress={() => navigation.navigate('SignUp')}>
          Don't have account? Click here to signup
        </Text>                          
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
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

export default LoginScreen;
