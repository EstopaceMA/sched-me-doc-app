import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ListItem, Avatar } from 'react-native-elements';
import Screen from '../../components/Screen';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DoctorWorkScheduleScreen = () => { 
  const currentUser = useSelector(state => state.currentUser);
  const navigation = useNavigation();

  const working_days = [
    {
      day: 'Monday',
      start_time: '',
      end_time: '',
      minute_per_slot: '',
    },
    {
      day: 'Tuesday',
      start_time: '',
      end_time: '',
      minute_per_slot: '',
    },
    {
      day: 'Wednesday',
      start_time: '',
      end_time: '',
      minute_per_slot: '',
    },
    {
      day: 'Thursday',
      start_time: '',
      end_time: '',
      minute_per_slot: '',
    },
    {
      day: 'Friday',
      start_time: '',
      end_time: '',
      minute_per_slot: '',
    },
    {
      day: 'Saturday',
      start_time: '',
      end_time: '',
      minute_per_slot: '',
    },
    {
      day: 'Sunday',
      start_time: '',
      end_time: '',
      minute_per_slot: '',
    }
  ];

  useEffect(() => {
    console.log(currentUser);
  },[])

  onPressSetSchedule = () => {
    navigation.navigate("DocWorkSched");
  }

  return (
    <Screen>
      <View style={{ padding: 20 }}>
        {
          working_days.map((item, i) => (
          <TouchableOpacity 
            key={i} 
            activeOpacity={0.5} 
            onPress={() => navigation.navigate("DocSetWorkSched")}
          >
            <ListItem
              key={i}
              containerStyle={styles.listItemContainer}
            >
              <ListItem.Content>
                <ListItem.Title><Icon name="calendar-alt" size={20} color={COLORS.primary} /> {item.day}</ListItem.Title>
                <ListItem.Subtitle>
                  <Icon name="calendar-alt" size={20} color="rgba(0,0,0,0)" />
                  <Icon name="clock" size={15} color={COLORS.orange} /> N/A
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
    borderRadius: 12
  }
});