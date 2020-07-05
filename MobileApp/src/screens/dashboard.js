import React, {useEffect} from 'react';
import { ScrollView, Text, Button } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from "react-redux";
import { DataGetAction,DataRequestAction } from '../appRedux/actions/http';
import moment from "moment";
import _ from "lodash";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth && state.auth.token);
  const sellers = useSelector(state => state.seller && state.seller.listing);
  const fetchData = () => {
    dispatch(DataGetAction('sellerListing',"", token));
  }
  useEffect(fetchData, []);
  const getTimeFromDay = (seller) => {
    let currentDate = _.keys(seller.availability).find(x=>x === moment().format('dddd'));
    let availObj = seller.availability[currentDate] || {};
    let data = availObj.status === true? seller.availability[currentDate] : {};
    return data;
  }
  const redirectUrl = (seller,slots) => {
    dispatch(DataRequestAction('POST','selectedSlots',{seller: seller._id}, token)); 
    props.navigation.navigate('SellerDetail', {slots: slots, seller:seller._id})
  }
  return (
    <ScrollView>
      {
        sellers && sellers.map((seller, index) => {
          return (
          <Card title={seller.username} key={`seller${index}`}>
            <Text style={{marginBottom: 10, textAlign:'center'}}>
              Start Time: {getTimeFromDay(seller).startTime || '---'}
            </Text>
            <Text style={{marginBottom: 10 , textAlign:'center'}}>
              End Time: {getTimeFromDay(seller).endTime || '---'}
            </Text>
            <Text style={{marginBottom: 10 , textAlign:'center'}}>
              Duration: {`${getTimeFromDay(seller).duration} mints` || '---'}
            </Text>
            <Button icon={<Icon name='code' color='#ffffff' />}
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='Book Appointment' 
              disabled = {!getTimeFromDay(seller).startTime? true: false}
              onPress={() => redirectUrl(seller,getTimeFromDay(seller).slots)}
            />
          </Card>
          )
        })
      }
    </ScrollView>
    ); 
}

export default Dashboard;