import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
import moment from 'moment';
import Screen from '../components/Screen';
import { FAB } from 'react-native-paper';
import COLORS from '../consts/colors';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const AppointmentScreen = () => {
  const navigation = useNavigation();
  const today = moment().format("YYYY-MM-DD");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  // useEffect(() => {
  //   const getData = async () => {  
  //     await axios.get("https://us-central1-sched-me-doc.cloudfunctions.net/user/")  
  //     .then(res => {  
  //       console.log(res.data)  
  //     })  
  //     .catch(err => {  
  //       console.log(err)  
  //     });  
  //   }  
  //   getData()
  // }, []);

  const onDayPress = (day) => {
    setDate(day.dateString);
    console.log(day.dateString);
  }

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.description}</Text>
              <Avatar.Text label="P" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <Screen>
      <View style={{flex: 1}}>
        <Agenda
          items={{
            '2021-05-05': [{name: 'item 1 - any js object', description: 'sakit ipin ko doc'}, {name: 'item 1 - any js object', description: 'sakit ipin ko doc'}],
            '2021-05-06': [{name: 'item 1 - any js object', description: 'doc pabunot'}],
            '2021-05-07': [{name: 'item 2 - any js object', height: 80}],
            '2012-05-24': [],
            '2012-05-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
          }}
          selected={date}
          renderItem={renderItem}
          minDate={today}
          onDayPress={(day)=>{onDayPress(day)}}
        />
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('DoctorList', date)}
        color={COLORS.white}
      />
    </Screen>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.orange
  },
});