import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { useEffect, useCallback, useState, createContext, useContext } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import { Nota } from '../components/Nota';
import { Link } from 'expo-router';
import { ListadoNotas } from '../components/ListadoNotas';
import MenuDesplegableNota from '../components/MenuDesplegableNota';
import { BarraBusqueda } from '../components/BarraBusqueda';

export const MenuNotaContexto = createContext()
export const MenuNotaProvider = ({ children }) => {
    const [visible, setVisible] = useState(false)
    const [position, setPosition] = useState({ posX: 0, posY: 0 })
    const [notaPulsada, setNotaPulsada] = useState()
    const [notas, setNotas] = useState()
    const [keyword, setKeyword] = useState('')
    return (
        < MenuNotaContexto.Provider
            value={
                {
                    visible, setVisible,
                    position, setPosition,
                    notaPulsada, setNotaPulsada,
                    notas, setNotas,
                    keyword, setKeyword
                }
            } >
            {children}
        </MenuNotaContexto.Provider >
    )
}

export default function Index() {

    async function peticionNotas() {
        console.log('Peticion a servidor')
        const url = "http://localhost:3000/notas";
        var contenido
        try {
            var response = fetch(url, {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "text/plain",
                    "Access-Control-Allow-Origin": "*"
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

            }).then(data => {
                console.log(data)
            })
        } catch (error) {
            console.error(error.message);
        }
    }


    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.apptitlecontainer}>
                <Text style={styles.apptitle}>NotKaS: Web</Text>
                <Link href={'/create'} asChild>
                    <Pressable style={styles.boton}>
                        <Text>+</Text>
                    </Pressable>
                </Link>
            </View>
            <Pressable onPress={() => {
                console.log('Clic en boton')
                peticionNotas()
            }}>
                <Text>Recuperar Info</Text>
            </Pressable>
            <MenuNotaProvider>
                <BarraBusqueda />
                <ListadoNotas />
                <MenuDesplegableNota />
            </MenuNotaProvider>
        </View >
    );
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
        backgroundColor: '#ffffff',
        borderColor: 'black',
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
