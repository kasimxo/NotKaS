import { View, Text, StyleSheet } from 'react-native'
import Constants from 'expo-constants';
import { Slot } from 'expo-router'

export default function Index() {
    return (
        <View style={estiloBasico.container}>
            <Slot />
        </View>
    )
}

const estiloBasico = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})