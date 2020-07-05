import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'react-native-elements'
import {styles} from "../styles/seller";
import { useSelector } from "react-redux";
import moment from "moment";

const SellerDetail = ({...props}) => {
    const { slots, seller } = props.navigation.state.params;
    const selectedSlots = useSelector(state => state.seller && state.seller.slots);

    const alreadyBooked = (seller, value) => {
        if(selectedSlots && selectedSlots.length>0 && selectedSlots.find(x=>x.slot ===value && x.date === moment().format('dddd') )) {
            Alert.alert("Already Booked")
        }
        else props.navigation.navigate('BookAppointment', {seller:seller, slot: value })
    }

    return (
        <View>
            <Text style={styles.heading}>Available Slots</Text>
            {
                slots && slots.map((slot, index) => {
                    if(slots[index] && slots[index+1])
                    {
                        return (
                            <TouchableOpacity key={`slots${index}`} 
                            onPress={() => alreadyBooked(seller, slots[index]) }>
                                <Card>
                                    <Text style={{marginBottom: 10, textAlign:'center'}}>
                                        {slots[index]} - {slots[index+1]}
                                        {selectedSlots && selectedSlots.length>0 && 
                                        selectedSlots.find(x=>x.slot ===slots[index] && x.date === moment().format('dddd'))? ' (Booked)': ''}
                                    </Text>
                                </Card>
                            </TouchableOpacity>
                            
                        )
                    }
                    return true;
                })
            }
        </View>
        
    );

}

export default SellerDetail;