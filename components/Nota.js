import { View, Pressable, Text, StyleSheet, Dimensions } from 'react-native'
import { router } from "expo-router";


const { height, width } = Dimensions.get('window');

export function Nota({ id, titulo, contenido }) {
    return (
        <Pressable style={estilos.carta} onPress={() => { router.navigate({ pathname: '/notedetail', params: { id: id, tituloOriginal: titulo, contenidoOriginal: contenido } }) }}>
            <Text style={estilos.titulo}>{id} - {titulo}</Text>
            <Text style={estilos.contenido}>{contenido}</Text>
        </Pressable>
    )
}

const estilos = StyleSheet.create({
    carta: {
        backgroundColor: '#e3c06f',
        padding: 15,
        borderRadius: 10,
        margin: 10,
        width: width / 2 - 20,
        height: height / 4,
    },
    titulo: {
        fontSize: 20,
    },
    contenido: {
        marginTop: 5,
        marginBottom: 20,
        overflow: 'hidden',

    },

})