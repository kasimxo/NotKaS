import { View, Pressable, Text, StyleSheet, Dimensions } from 'react-native'
import { router } from "expo-router";
import { useContext, useState } from 'react'
import { MenuNotaContexto } from './../app/index';

const { height, width } = Dimensions.get('window');

export function Nota({ id, titulo, contenido, fecha }) {

    const { visible, setVisible, setPosition, setNotaPulsada } = useContext(MenuNotaContexto)

    function mostrarMenu(e) {
        setVisible(true)
        setPosition({ posX: e.nativeEvent.pageX, posY: e.nativeEvent.pageY })
        setNotaPulsada({ id: id, titulo: titulo, contenido: contenido, fecha: fecha })
    }

    return (
        <Pressable style={estilos.carta}
            onPress={() => { router.navigate({ pathname: '/notedetail', params: { id: id, tituloOriginal: titulo, contenidoOriginal: contenido, fechaCreacion: fecha } }) }}
            onLongPress={(e) => { mostrarMenu(e) }}>
            <Text style={estilos.titulo}>{id} - {titulo}</Text>
            <Text style={estilos.fecha}>{new Date(fecha).toLocaleString()}</Text>
            <Text style={estilos.contenido}>{contenido}</Text>
        </Pressable>
    )
}

const estilos = StyleSheet.create({
    fecha: {},
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