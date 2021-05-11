import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, StyleSheet, Text, Modal} from 'react-native';
import Screen from '../components/Screen';

// import DropDownPicker from 'react-native-dropdown-picker';
import AppTextInput from '../components/AppTextInput';

const BookAppointmentScreen = ({navigation, route}) => {
  const currentUser = useSelector(state => state.currentUser);
  const [docData] = useState(route.params);
  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   {label: 'Apple', value: 'apple'},
  //   {label: 'Banana', value: 'banana'}
  // ]);

  useEffect(() => {
    console.log(currentUser);
    console.log(docData);

  },[])

  return (
    <Screen>
      <View style={styles.container}>
        {/* <DropDownPicker
          open={open}
          value={value}
          items={items}
          setValue={setValue}
          setItems={setItems}
          setOpen={setOpen}
          style={{ borderRadius: 25, height: 60, borderColor: 'transparent'}}
          placeholder="Select a doctor"
        /> */}
        <AppTextInput 
          placeholder="Description"
        />
      </View>
    </Screen>
  );
};

export default BookAppointmentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    }
});