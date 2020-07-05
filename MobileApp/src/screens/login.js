import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import {styles} from "../styles/login";
import { useDispatch, useSelector } from "react-redux";
import { DataRequestAction } from '../appRedux/actions/http';

const Login = (props) => {
  const initURL = useSelector(state => state.auth && state.auth.initURL);
  const authData = useSelector(state => state.auth && state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = () => {
    if(email === '' && password === '') {
      Alert.alert('Enter details to signin!')
    } else {
        dispatch(DataRequestAction("POST", "signIn", {email: email, password: password}));
      }
  }
  if(initURL && initURL!=='') props.navigation.navigate("Dashboard")

  return(
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
              onPress={() => userLogin()}
            />   
            {
              authData && authData.error &&
              <Text style={{marginTop:10, color:'#FF0000'}}> {authData.message}</Text> 
            }
            <Text 
              style={styles.loginText}
              onPress={() => props.navigation.navigate('Signup')}>
              Don't have account? Click here to signup
            </Text>                          
          </View>
  )
}

export default Login;