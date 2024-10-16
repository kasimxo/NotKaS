import { Link, router } from "expo-router";
import { useState, useContext } from 'react'
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { connectToDatabase, insertarFila } from "../db/db";

export default function CreateNota() {


    const [titulo, setTitulo] = useState('')
    const [contenido, setContenido] = useState('')

    const date = Date.now()


    function guardarNota() {
        //Crear una nueva fila en la base de datos
        //Insert
        if (titulo.length < 1 && contenido.length < 1) {
            return
        }
        var exito = insertarFila(connectToDatabase, titulo, contenido, date)
        //recuperarNotas()
        if (exito) {
            router.navigate('/')
        }
    }

    return (
        <View style={estilosCreacion.creacionContainer}>
            <TextInput
                autoFocus={true}
                placeholder={'Título'}
                onChangeText={(texto) => { setTitulo(texto) }}
                style={estilosCreacion.creacionTitulo}
            />
            <Text style={estilosCreacion.creacionFecha}>Fecha: {new Date(date).toLocaleString()}</Text>
            <TextInput
                placeholder={'Contenido'}
                multiline={true}
                onChangeText={(texto) => { setContenido(texto) }}
                style={estilosCreacion.creacionContenido}

            />

            <View style={estilosCreacion.contenedorBotones}>
                <Link href={'/'} asChild>
                    <Pressable style={estilosCreacion.botonCreacion}>
                        <Text>Volver</Text>
                    </Pressable>
                </Link>
                <Pressable
                    onPress={guardarNota}
                    style={estilosCreacion.botonCreacion}>
                    <Text>Guardar</Text>
                </Pressable>
            </View>
        </View>
    )
}

const estilosCreacion = StyleSheet.create({
    creacionTitulo: {
        fontSize: 25,
        width: '100%',
    },
    creacionContenido: {
        width: '100%',
    },
    creacionFecha: {
        width: '100%',
    },
    creacionContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        gap: 5,
    },
    botonCreacion: {
        backgroundColor: '#bfbdbd',
        borderRadius: 20,
        padding: 10,
    },
    contenedorBotones: {
        position: 'absolute',
        bottom: 10,
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
    },
})

