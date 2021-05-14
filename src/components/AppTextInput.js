import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import defaultStyles from '../consts/styles';

function AppTextInput({ icon, width = '100%', ...otherProps }) {
    return (
        <View style={[styles.container, { width }]}>
            <TextInput 
                placeholderTextColor={"#CDBCAC"}
                style={defaultStyles.text} 
                {...otherProps}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.COLORS.white,
        borderRadius: 12,
        flexDirection: "column",
        padding: 15,
        marginVertical: 10,
        justifyContent:'center',
        alignContent: 'center'
    },
    icon: {
        margin: 10,
    }
})

export default AppTextInput;