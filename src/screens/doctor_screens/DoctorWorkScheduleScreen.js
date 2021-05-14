import React, {useState, useCallback, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { ListItem } from 'react-native-elements';
import axios from 'axios';
import Screen from '../../components/Screen';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DoctorWorkScheduleScreen = () => { 
  const currentUser = useSelector(state => state.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [workSchedule, setWorkSchedule] = useState({});
  const navigation = useNavigation();

  const WEEK_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  useFocusEffect(useCallback(() => {
    const getDoctor = async () => {
      setIsLoading(true);
      await axios.get(`https://us-central1-sched-me-doc.cloudfunctions.net/doctor/${currentUser.user.id}`)  
      .then(res => {  
        setWorkSchedule(JSON.parse(res.data.work_schedule));
        setIsLoading(false);
      })  
      .catch(err => {
        console.log(err)  
      });
    }
    getDoctor();
  },[]));

  onPressSetSchedule = () => {
    navigation.navigate("DocWorkSched");
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
      <View style={{ padding: 20 }}>
        {
          WEEK_DAYS.map((item, i) => (
          <TouchableOpacity 
            key={i} 
            activeOpacity={0.5} 
            onPress={() => navigation.navigate("DocSetWorkSched", item)}
          >
            <ListItem
              key={i}
              containerStyle={styles.listItemContainer}
            >
              <ListItem.Content>
                <ListItem.Title><Icon name="calendar-alt" size={20} color={COLORS.orange} /> {item}</ListItem.Title>
                <ListItem.Subtitle>
                  <Icon name="calendar-alt" size={20} color="rgba(0,0,0,0)" />
                  <Icon name="clock" size={15} color={COLORS.orange} /> 
                  {" "}{(workSchedule[item] === undefined) ? "N/A" : workSchedule[item].StartTime + " - " + workSchedule[item].EndTime}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
          ))
        }
      </View>
    </Screen>
  );
}



export default DoctorWorkScheduleScreen;

const styles = StyleSheet.create({
  listItemContainer: {
    marginBottom: 20, 
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: .5,
    shadowRadius: 20,
    elevation: 3,
    shadowOffset: {
        width: 10,
        height: 10
    },
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