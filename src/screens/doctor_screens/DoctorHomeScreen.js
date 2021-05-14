import React, {useEffect, useState} from 'react';
import { 
    StyleSheet,
    StatusBar,
    Image, 
    Animated, 
    Text, 
    View,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import faker from 'faker'
import axios from 'axios';
import moment from 'moment';

import Screen from '../../components/Screen';
import COLORS from '../../consts/colors';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const DoctorHomeScreen = () => {
    const currentUser = useSelector(state => state.currentUser.user);
    const navigation = useNavigation();
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const [docData, setDocData] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        getDoctors();
        console.log(docData);
    },[])

    const getDoctors = async () => {
        setIsLoading(true);  
        await axios.get(`https://us-central1-sched-me-doc.cloudfunctions.net/appointment/doctor/${currentUser.id}`)  
        .then(res => {  
            const data = res.data.map(obj => ({
                ...obj, 
                image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.datatype.number(60)}.jpg`
            }));
            setDocData(data.filter(appointment => 
                appointment.status == 1 && moment(appointment.date).isSameOrAfter(moment(), 'day'))); 
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
            <TouchableOpacity onPress={() => {}}>
                <Animated.View style={{...styles.flatListItem, transform:[{scale}]}}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                    />
                    <View>
                        <Text style={{ fontSize: 22, fontWeight: '700' }}>{item.userName}</Text>
                        <Text style={{ fontSize: 18, opacity: .7 }}>{item.description}</Text>
                        {/* <Text style={{ fontSize: 12, opacity: .8, color: COLORS.primary }}>{item.email}</Text> */}
                    </View>
                    <View style={{ flex:1, alignItems:"flex-end" }}>
                        <Icon name="calendar-alt" size={25} color={COLORS.primary} />
                        <Text style={{ fontSize: 14, opacity: .7 }}>{item.date}</Text>
                        <Text style={{ fontSize: 18 }}>{moment(item.timeSlot, ["HH:mm"]).format("hh:mm A")}</Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        )
    }

    const EmptyItem = () => {
        return (
            <View style={[styles.flatListItem, {justifyContent: "center"}]}>
                <Text style={{ fontSize: 22, fontWeight: '700', color: COLORS.grey }}>No Upcoming Appointment Yet!</Text>
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
            <Text style={{ fontSize: 20, fontWeight: "bold", color: COLORS.primary }}>Upcoming Appointments</Text>
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
      </Screen>
    )
}

export default DoctorHomeScreen;

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