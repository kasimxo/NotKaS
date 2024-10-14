import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native'
import { useContext } from 'react'
import { MenuNotaContexto } from '../app/index'

const { height, width } = Dimensions.get('window');

export default function MenuDesplegableNota() {

    const { visible, setVisible, position } = useContext(MenuNotaContexto)

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


    return (
        <Pressable
            style={visible ? estilosMenu.visible : estilosMenu.oculto}
            onPress={() => { setVisible(false) }}>
            <View style={estilosMenu.menu}>
                <Text>Editar</Text>
                <Text>Eliminar</Text>
            </View>
        </Pressable>
    )
}


