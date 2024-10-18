import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native'
import { Link, router } from 'expo-router'
import { useState, useEffect } from 'react'
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";


export default function DetailNote() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { id, tituloOriginal, contenidoOriginal, fechaCreacion } = params;

    const [titulo, setTitulo] = useState('')
    const [contenido, setContenido] = useState('')
    const date = fechaCreacion

    useEffect(() => {
        setTitulo(tituloOriginal)
        setContenido(contenidoOriginal)
    }, [])

    function guardarCambiosNota() {
        //actualizarNota(connectToDatabase, id, titulo, contenido)
        router.navigate('/')
    }

    return (
        <View style={estilosCreacion.creacionContainer}>
            <TextInput
                autoFocus={true}
                placeholder={'Título'}
                onChangeText={(texto) => { setTitulo(texto) }}
                style={estilosCreacion.creacionTitulo}
                value={titulo}
            />
            <Text style={estilosCreacion.creacionFecha}>Fecha: {new Date(Number.parseInt(fechaCreacion)).toLocaleString()}</Text>
            <TextInput
                placeholder={'Contenido'}
                multiline={true}
                onChangeText={(texto) => { setContenido(texto) }}
                style={estilosCreacion.creacionContenido}
                value={contenido}
            />
            <View style={estilosCreacion.contenedorBotones}>
                <Link href={'/'} asChild>
                    <Pressable style={estilosCreacion.botonCreacion}>
                        <Text>Volver</Text>
                    </Pressable>
                </Link>
                <Pressable
                    onPress={guardarCambiosNota}
                    style={estilosCreacion.botonCreacion}>
                    <Text>Guardar</Text>
                </Pressable>
            </View>
        </View >
    )
}

const estilosCreacion = StyleSheet.create({
    creacionFecha: {
        width: '100%',
    },
    creacionTitulo: {
        fontSize: 25,
        width: '100%',
    },
    creacionContenido: {
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