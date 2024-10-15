import { View, Pressable, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
import { router } from "expo-router";
import Constants from 'expo-constants';
import { useEffect, useCallback, useState, createContext, useContext } from 'react'
import { MenuNotaContexto } from './../app/index';
import { connectToDatabase, createTables, insertarFila, leerNotas } from '../db/db';
import { Nota } from './Nota';

export function ListadoNotas() {

    const { notas, setNotas } = useContext(MenuNotaContexto)

    const loadData = useCallback(async () => {
        try {
            await createTables(connectToDatabase)
            recuperarNotas(connectToDatabase)
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        loadData()
    }, [loadData])

    async function recuperarNotas() {
        var resultado = await leerNotas(connectToDatabase)
        setNotas(resultado)
    }

    return (
        <FlatList
            data={notas}
            style={styles.listado}
            numColumns={2}
            renderItem={({ item }) =>
                <Nota id={item.id} titulo={item.titulo} contenido={item.contenido} />
            }
            keyExtractor={item => item.id}
        />
    )
}

const styles = StyleSheet.create({
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