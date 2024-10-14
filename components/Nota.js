import { View, Pressable, Text, StyleSheet, Dimensions } from 'react-native'
import { router } from "expo-router";
import { useContext, useState } from 'react'
import { MenuNotaContexto } from './../app/index';

const { height, width } = Dimensions.get('window');

export function Nota({ id, titulo, contenido }) {

    const { visible, setVisible, setPosition } = useContext(MenuNotaContexto)

    function mostrarMenu(e) {
        setVisible(true)
        setPosition({ posX: e.nativeEvent.pageX, posY: e.nativeEvent.pageY })
        console.log(e)
    }

    return (
        <Pressable style={estilos.carta}
            onPress={() => { router.navigate({ pathname: '/notedetail', params: { id: id, tituloOriginal: titulo, contenidoOriginal: contenido } }) }}
            onLongPress={(e) => { mostrarMenu(e) }}>
            <Text style={estilos.titulo}>{id} - {titulo}</Text>
            <Text style={estilos.contenido}>{contenido}</Text>
        </Pressable>
    )
}

const estilos = StyleSheet.create({
    visible: {
        display: 'inline',
    },
    oculto: {
        display: 'none',
    },
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