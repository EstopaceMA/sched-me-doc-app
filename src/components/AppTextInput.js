import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../consts/styles';

function AppTextInput({ icon, width = '100%', ...otherProps }) {
    return (
        <View style={[styles.container, { width }]}>
            {/* {icon && <MaterialCommunityIcons name={icon} size={20} color={defaultStyles.colors.medium} style={styles.icon}/>} */}
            <TextInput 
                placeholderTextColor={defaultStyles.colors.medium}
                style={defaultStyles.text} 
                {...otherProps}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.light,
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