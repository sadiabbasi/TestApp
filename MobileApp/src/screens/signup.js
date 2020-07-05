import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert, ActivityIndicator, TouchableHighlight  } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { DataRequestAction } from '../appRedux/actions/http';
import {styles} from "../styles/signup";

const Signup = (props) => {
  const initURL = useSelector(state => state.auth && state.auth.initURL);
  const authData = useSelector(state => state.auth && state.auth);

  const dispatch = useDispatch();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email === '' && password === '' && username === '') {
      Alert.alert('Enter details to signup!')
    } 
    else if (reg.test(email) === false) {
      Alert.alert('Incorrect email format')
    }
    else {
      dispatch(DataRequestAction("POST", "signUp", {username:username,email:email,password:password, role:'buyer' }));
    }
  }
  if(initURL && initURL!=='') props.navigation.navigate("Dashboard")

  return (
        <View style={styles.container}>  
          <TextInput
            style={styles.inputStyle}
            placeholder="Name"
            value={username}
            onChangeText={(val) => setUserName(val)}
          />      
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
          <Button color="#3740FE" title="Signup" onPress={() => registerUser()} />  
          {
              authData && authData.error &&
              <Text style={{marginTop:10, color:'#FF0000'}}> {authData.message}</Text> 
            }

          <Text 
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate('Login')}>
            Already Registered? Click here to login
        </Text>                          
      </View>
    );
}

export default Signup;