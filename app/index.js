import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { useEffect, useCallback, useState, createContext, useContext } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { connectToDatabase, createTables, insertarFila, leerNotas } from '../db/db';
import { Nota } from '../components/Nota';
import { Link } from 'expo-router';
import MenuDesplegableNota from '../components/MenuDesplegableNota';


export const MenuNotaContexto = createContext()
export const MenuNotaProvider = ({ children }) => {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ posX: 0, posY: 0 })
  return (
    < MenuNotaContexto.Provider
      value={
        {
          visible, setVisible,
          position, setPosition
        }
      } >
      {children}
    </MenuNotaContexto.Provider >
  )
}

export default function Index() {

  const [notas, setNotas] = useState()

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
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.apptitlecontainer}>
        <Text style={styles.apptitle}>NotKaS</Text>
        <Link href={'/create'} asChild>
          <Pressable style={styles.boton}>
            <Text>+</Text>
          </Pressable>
        </Link>
      </View>
      <MenuNotaProvider>
        <FlatList
          data={notas}
          style={styles.listado}
          numColumns={2}
          renderItem={({ item }) =>
            <Nota id={item.id} titulo={item.titulo} contenido={item.contenido} />
          }
          keyExtractor={item => item.id}
        />
        <MenuDesplegableNota />
      </MenuNotaProvider>
    </View >
  );
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
