import { Platform } from 'react-native';

import COLORS from './colors';

export default {
    COLORS,
    text: {
        color: COLORS.dark,
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir"
    }
}