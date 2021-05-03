import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from "react-native";
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import firebase from '../auth/firebase';

import Screen from '../components/Screen';

const onDateSelected = (date) => {
  console.log(date.format('MM-DD-YYYY'));
}

const AppointmentScreen = () => {
    const [userID] = useState(firebase.auth().currentUser.uid);

    return (
      <Screen>
        <View style={styles.container}>
          <CalendarStrip
            scrollable
            style={{height:150, paddingTop: 20, paddingBottom: 10, backgroundColor: 'gray'}}
            calendarColor={'#3343CE'}
            calendarHeaderStyle={{color: 'white'}}
            daySelectionAnimation={{type: 'background', duration: 200, borderWidth: 1, highlightColor: 'rgba( 255, 255, 255, 0.3 )'}}
            dateNumberStyle={{color: 'white'}}
            dateNameStyle={{color: 'white'}}
            iconContainer={{flex: 0.1}}
            highlightDateNumberStyle={{color: 'black'}}
            highlightDateNameStyle={{color: 'black'}}
            onDateSelected={onDateSelected}
            selectedDate={moment()}
          />
          <Text>{userID}</Text>
        </View>
      </Screen>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export default AppointmentScreen;