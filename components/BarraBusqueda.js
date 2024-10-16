import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native'
import { useContext } from 'react'
import Constants from 'expo-constants'
import { MenuNotaContexto } from '../app/index'


export function BarraBusqueda() {

    const { keyword, setKeyword } = useContext(MenuNotaContexto)

    return (
        <View style={styles.buscarContainer}>
            <TextInput
                value={keyword}
                onChangeText={(texto) => {
                    console.log('Hemos cambiado el texto ', texto)
                    setKeyword(texto)
                }}
                style={styles.barraBusqueda}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    buscarContainer: {

        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    barraBusqueda: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 50,
        color: 'black',
    },
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    apptitle: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    apptitlecontainer: {
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listado: {
    },
    boton: {
        backgroundColor: 'cyan',
        borderRadius: 50,
        padding: 20,

    },

});
