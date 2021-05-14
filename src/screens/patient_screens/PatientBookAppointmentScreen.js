import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View, 
  StyleSheet, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';

import Screen from '../../components/Screen';
import AppTextInput from '../../components/AppTextInput';
import COLORS from '../../consts/colors';
import { useGenerateTimeSlots } from '../../hooks';

const PatientBookAppointmentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentUser = useSelector(state => state.currentUser.user);

  const [docData] = useState(route.params.docData);
  const [selectedDate] = useState(route.params.selectedDate);
  const WEEK_DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, SetSelectedTimeSlot] = useState(null);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [occupiedTimeSlots, setOccupiedTimeSlots] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    console.log(docData);
    const week_schedule = JSON.parse(docData.work_schedule);
    const week_day = week_schedule[WEEK_DAYS[new Date(selectedDate).getDay()]];

    setTimeSlots(useGenerateTimeSlots(
      Number(week_day.MinutePerSlot), 
      week_day.StartTime, 
      week_day.EndTime
    ));

    const loadDoctorOccupiedTime = async () => {
      setIsLoading(true);
      await axios.get(`https://us-central1-sched-me-doc.cloudfunctions.net/appointment/doctor/${docData.id}/${selectedDate}`) 
      .then(res => {  
          const data = res.data;
          setOccupiedTimeSlots(data.map(({ timeSlot }) => timeSlot));
          setIsLoading(false);
      })
      .catch(err => {  
        console.log(err)
      });
    }
    loadDoctorOccupiedTime();
  },[])
  

  const saveAppointment = async () => {
    if(selectedTimeSlot !== null && description !== ""){
      const params = JSON.stringify({
        "docId": docData.id,
        "userId": currentUser.id,
        "docName": docData.name,
        "userName": currentUser.name,            
        "date": selectedDate,
        "timeSlot": timeSlots[selectedTimeSlot],
        "description": description,
        "status": 0,
        "message": ""
      });
  
      const url = "https://us-central1-sched-me-doc.cloudfunctions.net/appointment/addAppointment";
      setIsLoading(true);
      await axios.post(url, params,{
            "headers": {
              "content-type": "application/json",
          },
      }).then((res) => {
        setIsLoading(false);
        setShowAlert(true);
      }).catch((err) => {
        console.log(err);
      });
    } else {
      if(description === "") {
        Alert.alert("Input some description of your appointment");
      } else if(selectedTimeSlot === null) {
        Alert.alert("Select Time Slot");
      }
    }
  }

  const TimeSlotItem = ({val, index}) => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => 
        {(!occupiedTimeSlots.includes(val)) ? SetSelectedTimeSlot(index) : ''}}>
        <View style={[styles.timeSlot, { 
          backgroundColor: (!occupiedTimeSlots.includes(val)) 
            ? ((selectedTimeSlot !== null && selectedTimeSlot === index)
            ? COLORS.orange 
            : COLORS.secondary)
            : "red" 
        }]}>
            <View style={{ flex: 1, justifyContent:'center', alignItems:'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{val}</Text>
            </View>   
        </View>
      </TouchableOpacity>
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
      <View style={styles.container}>
        <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: COLORS.black }}>
                Set Appointment for
            </Text>
            <Text style={{ fontSize: 25, fontWeight: "bold", color: COLORS.primary }}>
                {new Date(selectedDate).toDateString()} 
            </Text>
        </View>
        <View style={styles.flatListItem}>
            <Image
                source={{ uri: docData.image }}
                style={styles.image}
            />
            <View>
                <Text style={{ fontSize: 22, fontWeight: '700' }}>{docData.name}</Text>
                <Text style={{ fontSize: 18, opacity: .7 }}>{docData.address}</Text>
                <Text style={{ fontSize: 12, opacity: .8, color: '#0099cc' }}>{docData.email}</Text>
            </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          <AppTextInput 
            autoFocus
            multiline = {true}
            numberOfLines = {5}
            placeholder="Description"
            textAlign="left"
            onChangeText={(val) => setDescription(val)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            <View>
              <Text style={{ textAlign: 'center'}}>{"  "}SELECT TIME SLOT{"  "}</Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 3, backgroundColor: COLORS.white, padding: 20, borderRadius: 12 }}>
              <ScrollView>
                <View style={{flex: 1, justifyContent:'space-between', flexDirection: 'row', flexWrap: 'wrap'}}>
                    {
                      timeSlots.map((val, index) => <TimeSlotItem key={index} val={val} index={index}/>)
                    }
                </View>
              </ScrollView>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => saveAppointment()}
              >
                  <View style={styles.btn}>
                      <Text style={{color: COLORS.white, fontSize: 20, fontWeight: 'bold'}}>
                          SAVE
                      </Text>
                  </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Successfully booked appointment!"
        message=""
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor={COLORS.primary}
        onCancelPressed={() => {
          setShowAlert(false);
          navigation.navigate("PatientTabs");
        }}
        onConfirmPressed={() => {
          setShowAlert(false);
          navigation.navigate("PatientTabs");
        }}
      />
    </Screen>
  );
};

export default PatientBookAppointmentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    flatListItem: {
      flexDirection: 'row', 
      padding: 20,
      marginBottom: 10,
      backgroundColor: COLORS.white,
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
  image: {
    width: 70, 
    height: 70, 
    borderRadius: 70,
    marginRight: 10
  },
  separator: {
    borderBottomColor: COLORS.secondary,
    borderBottomWidth: 1,
  },
  timeSlot: {
    borderRadius: 10,
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