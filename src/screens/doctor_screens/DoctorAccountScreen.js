import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from "react-native";
import { ListItem, Avatar } from 'react-native-elements';
import Screen from '../../components/Screen';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const InfoText = ({ text }) => (

    <View style={styles.containerInfoText}>
      <Text style={styles.infoText}>{text}</Text>
    </View>

);
      

const DoctorAccountScreen = () => { 
  const currentUser = useSelector(state => state.currentUser);
  const navigation = useNavigation();

  useEffect(() => {
    console.log(currentUser);
  },[])

  onPressSetSchedule = () => {
    navigation.navigate("DocWorkSched");
  }

  return (
    <Screen>
        <View style={styles.userRow}>
          <View style={styles.userImage}>
            <Avatar
              rounded
              size="large"
              source={{uri: currentUser.user.image}}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>{"Mark Anthony Estopace"}</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
              }}
            >
              {"estopace.ma@gmail.com"}
            </Text>
          </View>
        </View>
        <InfoText text="Account" />
        <View>
          <ListItem
            bottomDivider 
            activeOpacity={0.6} 
            underlayColor="#DDDDDD"
            onPress={() => onPressSetSchedule()}
          >
            <Icon name="calendar-alt" size={28} color={COLORS.gray} />
            <ListItem.Content>
              <ListItem.Title>Work Schedule</ListItem.Title>
              <ListItem.Subtitle>Setup schedule of work</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </View>
    </Screen>
  );
}

export default DoctorAccountScreen;

const styles = StyleSheet.create({
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  scroll: {
    backgroundColor: 'white',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    backgroundColor: COLORS.white
  },
  userImage: {
    marginRight: 12,
  },
  containerInfoText: {
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: '#F4F5F4',
  },
  infoText: {
    fontSize: 16,
    marginLeft: 20,
    color: 'gray',
    fontWeight: '500',
  },
});




