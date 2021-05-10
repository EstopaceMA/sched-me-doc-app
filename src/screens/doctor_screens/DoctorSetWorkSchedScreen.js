import React, {useState, useEffect} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Screen from '../../components/Screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import COLORS from '../../consts/colors';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import { useGenerateTimeSlots } from '../../hooks';

const DoctorSetWorkSchedScreen = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '15 minutes', value: '15'},
    {label: '30 minutes', value: '30'},
    {label: '45 minutes', value: '45'},
    {label: '60 minutes', value: '60'}
  ]);

  const [startTime, setStartTime] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [showStartTime, setShowStartTime] = useState(false);
  const [startTimeData, setStartTimeData] = useState("");

  const [endTime, setEndTime] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [showEndTime, setShowEndTime] = useState(false);
  const [endTimeData, setEndTimeData] = useState("");

  useEffect(() => {

    console.log(timeSlots);

  },[timeSlots])

  const onChangeStartTime = (event, selectedDate) => {
    console.log(moment(selectedDate).format("HH:mm"));
    const currentDate = selectedDate || startTime;
    setShowStartTime(false);
    setStartTime(currentDate);
  };

  const onChangeEndTime = (event, selectedDate) => {
    console.log(moment(selectedDate).format("HH:mm"));
    const currentDate = selectedDate || endTime;
    setShowEndTime(false);
    setEndTime(currentDate);
  };

  const showStartTimePicker = () => {
    setShowStartTime(true);
  };

  const showEndTimePicker = () => {
    setShowEndTime(true);
  };

  const onChangeDropdown = (val) => {
    const interval = Number(val);
    const formattedStartTime = moment(startTime).format("HH:mm").toString();
    const formattedEndTime = moment(endTime).format("HH:mm").toString();
    const slots = useGenerateTimeSlots(interval, formattedStartTime, formattedEndTime);
    setTimeSlots(slots);
    console.log(timeSlots.length);
  }

  return (
    <Screen>
      <View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems:'flex-start', padding: 20 }}>
            <TouchableWithoutFeedback onPress={showStartTimePicker}>
                <View style={{ flex: 1, 
                    flexDirection: 'row', 
                    height: 50, 
                    backgroundColor: COLORS.white, 
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10
                }}>
                    <Text style={{ position: 'absolute', top: 0, left: 0 }}>Start Time</Text>
                    <View style={{ flex: 4, justifyContent:'center', alignItems:'center' }}>
                        <TextInput
                            style={{fontSize: 20}}
                            placeholder="--:--"
                            onChangeText={(val) => {setStartTimeData(val)}}
                            underlineColorAndroid="transparent"
                            caretHidden={true}
                            editable={false}
                            value={(startTime === "") ? "" :moment(startTime).format("HH:mm").toString()}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent:'flex-end'}}>
                        <Icon name="clock" size={30} color={COLORS.orange} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={showEndTimePicker}>
                <View style={{ flex: 1, 
                    flexDirection: 'row', 
                    height: 50, 
                    backgroundColor: COLORS.white, 
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10
                }}>
                    <Text style={{ position: 'absolute', top: 0, left: 0 }}>End Time</Text>
                    <View style={{ flex: 4, justifyContent:'center', alignItems:'center' }}>
                        <TextInput
                            style={{fontSize: 20}}
                            placeholder="--:--"
                            onChangeText={(val) => {setEndTimeData(val)}}
                            underlineColorAndroid="transparent"
                            caretHidden={true}
                            editable={false}
                            value={(endTime === "") ? "" : moment(endTime).format("HH:mm").toString()}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent:'flex-end'}}>
                        <Icon name="clock" size={30} color={COLORS.orange} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: 1, padding: 20, marginTop: 20 }}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setValue={setValue}
                setItems={setItems}
                setOpen={setOpen}
                searchable={false}
                style={{ borderRadius: 1, height: 60, borderColor: 'transparent'}}
                placeholder="Select interval"
                onChangeValue={(val) => onChangeDropdown(val)}
            />
        </View>
        <ScrollView style={{ marginTop: 10 }}>
            <View style={{ flex: 1, padding: 20, marginTop: 30 }}>
                <View style={{flex: 1, justifyContent:'space-between', flexDirection: 'row', flexWrap: 'wrap'}}>
                    {
                        timeSlots.map((val, index) => (
                            <View 
                                key={index} 
                                style={styles.timeSlot}
                            >
                                <View style={{ flex: 1, justifyContent:'center', alignItems:'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{val}</Text>
                                </View>   
                            </View>
                        ))
                    }
                </View>
            </View>
        </ScrollView>
        <View style={{ flex: 1, padding: 20, marginTop: 20, justifyContent:'flex-end' }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {}}
            >
                <View style={styles.btn}>
                    <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>
                        Save
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
      </View>
      
      

      {showStartTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={startTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeStartTime}
        />
      )}
      {showEndTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={endTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeEndTime}
        />
      )}
    </Screen>
  );
};

export default DoctorSetWorkSchedScreen;

const styles = StyleSheet.create({
    timeSlot: {
        textAlign: 'center',
        width: 120, 
        height: 50, 
        backgroundColor: 'powderblue', 
        marginBottom: 10
    },
    btn: {
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      backgroundColor: COLORS.primary,
      marginHorizontal: 20,
      borderRadius: 10,
    }
});