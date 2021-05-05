import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import COLORS from '../consts/colors';

function AppButton({title, onPress, color = "primary"}) {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: color !== "primary" ? COLORS.secondary : COLORS.primary}]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '100%',
        marginVertical: 10,
    },
    text:{
        color: COLORS.white,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})

export default AppButton;