import React, {useState, useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Chip} from 'react-native-paper';
import { FAB } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

import Screen from '../../components/Screen';
import COLORS from '../../consts/colors';
import { APPOINTMENT_STATUS } from '../../consts/app_constant';

const PatientAppointmentScreen = () => {
  const navigation = useNavigation();
  const currentUser = useSelector(state => state.currentUser.user);

  const [today] = useState(moment().format("YYYY-MM-DD"));
  
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [appointments, setAppointments] = useState([]);
  const [selectedDateAppointments, setSelectedDateAppointment] = useState({});
  const [markedDates, setMarkedDates] = useState({});
  const [fabVisible, setFabVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);


  useFocusEffect(useCallback(() => {
    getMarkedDates();
  },[]));

  const getMarkedDates = async () => {
    setIsLoading(true);
    await axios.get(`https://us-central1-sched-me-doc.cloudfunctions.net/appointment/user/${currentUser.id}`) 
    .then(res => {
        setAppointments(res.data);
        // onDayPress(today);
        const forMarkedDates = {};
        [...new Set(res.data.map(({ date }) => date))].forEach((val) => {
          forMarkedDates[val] = {
            marked: true
          }
        });
        return forMarkedDates;
    }).then((datesMarked) => {
      setMarkedDates(datesMarked);
    }).catch(err => {  
      console.log(err)
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const onDayPress = (day) => {
    setDate(day);
    setFabVisible(moment(day).isBefore(today));
    const appointmentsData = appointments.filter(appointment => appointment.date == day);
    setSelectedDateAppointment({[day]:appointmentsData});
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
              <View>
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <MatIcon name="face" size={17} color={COLORS.orange} /> 
                    <Text>{" "}{item.docName}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <MatIcon name="access-time" size={17} color={COLORS.orange} /> 
                    <Text>{" "}{moment(item.timeSlot, ["HH:mm"]).format("hh:mm A")}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <MatIcon name="description" size={17} color={COLORS.orange} /> 
                    <Text>{" "}{item.description}</Text>
                  </View>
                </View>
              </View>
              <Chip style={{ backgroundColor: COLORS[APPOINTMENT_STATUS[item.status].toLowerCase()] }}>{APPOINTMENT_STATUS[item.status]}</Chip>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={{marginRight: 10, marginTop: 35}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>No Appointment for this date!</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
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
      <View style={{flex: 1}}>
        <Agenda
          items={selectedDateAppointments}
          selected={date}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyDate}
          onDayPress={(day)=>{onDayPress(day.dateString)}}
          markedDates={markedDates}
          theme={{
            agendaDayTextColor: COLORS.primary,
            agendaDayNumColor: COLORS.primary,
            agendaTodayColor: COLORS.orange,
            agendaKnobColor: COLORS.orange,
            selectedDayBackgroundColor: COLORS.orange,
            todayTextColor: COLORS.primary,
            'stylesheet.calendar.header': { week: { marginTop: 2, flexDirection: 'row', justifyContent: 'space-between' } }
          }}
        />
      </View>
      {
        (!fabVisible) &&
        <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('DoctorList', date)}
        color={COLORS.white}
      />
      }
      
    </Screen>
  );
};

export default PatientAppointmentScreen;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.orange, 
  },
  preloader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});