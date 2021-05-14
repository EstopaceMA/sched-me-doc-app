import React from 'react';
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, View, StatusBar, ImageBackground } from 'react-native';

function Screen({children, style}) {
    return (
        <SafeAreaView style={[styles.screen, style]}>
            <StatusBar hidden/>
                <ImageBackground 
                    resizeMode='cover' 
                    blurRadius={9} 
                    source={require('../assets/app_background.jpg')} 
                    style={{ flex: 1 }}
                >
                    <View style={[styles.view, style]}>{children}</View>
                </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        // paddingTop: Constants.statusBarHeight,
        flex: 1,
    },
    view: {
        flex: 1
    }
})

export default Screen;