import React, {useEffect, useState} from 'react';
import { 
    StyleSheet,
    Animated, 
    Text, 
    View,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import faker from 'faker'
import axios from 'axios';
import moment from 'moment';

import Screen from '../../components/Screen';
import COLORS from '../../consts/colors';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const DoctorPendingAppointmentScreen = () => {
    const currentUser = useSelector(state => state.currentUser.user);
    const navigation = useNavigation();
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const [docData, setDocData] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [selectectedAppointmentId, setSelectedAppointmentId] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(true);

    useEffect(() => {
        getDoctors();
        console.log(docData);
    },[]);

    const getDoctors = async () => {
        setIsLoading(true);  
        await axios.get(`https://us-central1-sched-me-doc.cloudfunctions.net/appointment/doctor/${currentUser.id}`)  
        .then(res => {  
            const data = res.data.map(obj => ({
                ...obj, 
                image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.datatype.number(60)}.jpg`
            }));
            setDocData(data.filter(appointment => 
                appointment.status == 0 && moment(appointment.date).isSameOrAfter(moment(), 'day'))); 
            setIsLoading(false);
        })
        .catch(err => {  
          console.log(err)  
        });
    }

    const onRefresh = () => {
        setIsFetching(true);
        getDoctors();
        setIsFetching(false);
    }

    const onShowConfirmModal = (confirm, appointmentId) => {
        setSelectedAppointmentId(appointmentId);
        setIsConfirmed(confirm);
        setShowAlert(true);
    }

    const onConfirmPressed = () => {
        console.log(selectectedAppointmentId);
        setShowAlert(false);
        updatePatientAppointment();
    }

    const updatePatientAppointment = async () => {
        const url = `https://us-central1-sched-me-doc.cloudfunctions.net/appointment/${selectectedAppointmentId}`;
    
        const params = JSON.stringify({
          "status": (isConfirmed) ? 1 : 2
        });

        await axios.put(url, params,{
              "headers": {
                "content-type": "application/json",
            },
        }).then((res) => {
            getDoctors();
        }).catch((err) => {
          console.log(err);
        });
    }

    const Item = ({index, item}) => {
        const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2)
        ]
    
        const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0]
        })
    
        return (
            <Animated.View style={{...styles.flatListItem, transform:[{scale}]}}>
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
                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-evenly" }}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => onShowConfirmModal(true, item.id)}>
                        <MatIcon name="check-circle-outline" size={40} color={COLORS.approve} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => onShowConfirmModal(false, item.id)}>
                        <MatIcon name="cancel" size={40} color={COLORS.reject} />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }

    const EmptyItem = () => {
        return (
            <View style={[styles.flatListItem, {justifyContent: "center"}]}>
                <Text style={{ fontSize: 22, fontWeight: '700', color: COLORS.grey }}>No Pending Request!</Text>
            </View>
        )
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
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: COLORS.orange }}>Pending Appointments</Text>
          </View>
          <Animated.FlatList
              contentContainerStyle={{
                  paddingLeft: SPACING,
                  paddingRight: SPACING
              }}
              data={docData}
              keyExtractor={item => item.id}
              onScroll={Animated.event([{ nativeEvent: {contentOffset: {y: scrollY}}}],
                  {useNativeDriver: true}
              )}
              renderItem={({index,item}) => <Item index={index} item={item}/>}
              ListEmptyComponent={<EmptyItem/>}
              refreshing={isFetching}
              onRefresh={() => onRefresh()}
          >

          </Animated.FlatList>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title={(isConfirmed) ? "Do you want to confirm this appointment?" : "Do you want to reject this appointment?"} 
                message=""
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                confirmText={(isConfirmed) ? "Confirm" : "Reject"}
                confirmButtonColor={(isConfirmed) ? COLORS.approve : COLORS.reject}
                onCancelPressed={() => {
                    setShowAlert(false);
                }}
                onConfirmPressed={() => {
                    onConfirmPressed();
                }}
            />
      </Screen>
    )
}

export default DoctorPendingAppointmentScreen;

const styles = StyleSheet.create({
    flatListItem: {
        flexDirection: 'row', 
        padding: SPACING,
        marginBottom: SPACING,
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
        justifyContent: "space-between"
    },
    image: {
        width: AVATAR_SIZE, 
        height: AVATAR_SIZE, 
        borderRadius: AVATAR_SIZE,
        marginRight: SPACING / 2
    },
    preloader: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
});