import React, { useState } from 'react';
import { View, TextInput, Button, Alert  } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import {styles} from "../styles/signup";
import { DataRequestAction } from '../appRedux/actions/http';

const AppointmentForm = ({...props}) => {
    const { seller, slot } = props.navigation.state.params;
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth && state.auth.token);
    const initURL = useSelector(state => state.seller && state.seller.initURL);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');

    const registerUser = () => {
        if(name === '' && age === '' && phone === '') {
            Alert.alert('Enter details to book appointment!')
        } else {
            dispatch(DataRequestAction("POST", "bookAppointment", {name:name,age:age,phone:phone, seller:seller, slot: slot, date: moment().format('dddd')}, token));
        }
    }
    if(initURL && initURL!=='') {
        Alert.alert("Appointment created successfully");
        props.navigation.navigate("Dashboard")
    }

    return (
        <>
            <View style={styles.container}>  
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Name"
                    value={name}
                    onChangeText={(val) => setName(val)}
                />      
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Age"
                    value={age}
                    onChangeText={(val) => setAge(val)}
                    keyboardType={'numeric'}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Phone number"
                    value={phone}
                    onChangeText={(val) => setPhone(val)}
                    maxLength={15}
                    keyboardType={'numeric'}
                />   
                <Button color="#3740FE" title="Book Appointment" onPress={() => registerUser()} />                        
            </View>
        </>
    );
}

export default AppointmentForm;