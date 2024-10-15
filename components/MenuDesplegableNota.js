import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native'
import { useContext } from 'react'
import { router } from 'expo-router';
import { MenuNotaContexto } from '../app/index'
import { connectToDatabase, eliminarNota, leerNotas } from '../db/db';

const { height, width } = Dimensions.get('window');

export default function MenuDesplegableNota() {

    const { visible, setVisible, position, notaPulsada, setNotas } = useContext(MenuNotaContexto)

    const estilosMenu = StyleSheet.create({
        menu: {
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 20,
            position: 'absolute',
            left: position.posX - 20,
            top: position.posY - 50,
        },
        visible: {
            display: 'flex',
            position: 'absolute',
            width: width,
            height: height,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000020'
        },
        oculto: {
            display: 'none',
        },
    })

    async function eliminarNotaPeticion() {
        eliminarNota(connectToDatabase, notaPulsada.id)
        setVisible(false)
        var resultado = await leerNotas(connectToDatabase)
        setNotas(resultado)
    }


    return (
        <Pressable
            style={visible ? estilosMenu.visible : estilosMenu.oculto}
            onPress={() => { setVisible(false) }}>
            <View style={estilosMenu.menu}>
                <Pressable
                    onPress={() => { router.navigate({ pathname: '/notedetail', params: { id: notaPulsada.id, tituloOriginal: notaPulsada.titulo, contenidoOriginal: notaPulsada.contenido } }) }}
                >
                    <Text >Editar</Text>
                </Pressable>
                <Pressable
                    onPress={eliminarNotaPeticion}
                >
                    <Text >Eliminar</Text>
                </Pressable>
            </View>
        </Pressable>
    )
}


