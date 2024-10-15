import * as SQLite from 'expo-sqlite';

export const connectToDatabase = SQLite.openDatabaseSync('notas');

export const createTables = async (db) => {
    const notas = `
      CREATE TABLE IF NOT EXISTS notas_guardadas (
          id INTEGER DEFAULT 1,
          titulo TEXT,
          contenido TEXT,
          PRIMARY KEY(id)
      )
    `

    try {
        await db.execAsync(notas)
        console.log('Exito creando la tabla')
    } catch (error) {
        console.error(error)
        console.log(db, typeof db)
        //throw Error(`Failed to create tables`)

    }
}

export const insertarFila = async (db, titulo, contenido) => {
    const statement = `
    INSERT INTO notas_guardadas (titulo, contenido) VALUES ('${titulo}','${contenido}');`

    try {
        await db.execAsync(statement)
        console.log('Exito insert')
        return true
    } catch (error) {
        console.log(error)
    }
}

export const eliminarNota = async (db, id) => {
    const statement = `DELETE FROM notas_guardadas WHERE id = ${id};`
    console.log('Vamos a eliminar la nota con id ', id)
    try {
        await db.runAsync(statement)
        console.log('Se ha eliminado la nota con id ', id)
    } catch (e) {
        console.log(e)
    }
}

export const actualizarNota = async (db, id, titulo, contenido) => {
    const statement = `
    UPDATE notas_guardadas
    SET titulo = '${titulo}',
        contenido = '${contenido}'
    WHERE
        id == ${id} ;`

    try {
        const result = await db.runAsync(statement)
        console.log('Exito select')
        //console.log(result)
    } catch (error) {
        console.log(error)
    }
}

export const leerNotas = async (db) => {
    const statement = `
    SELECT * FROM notas_guardadas;`

    try {
        const result = await db.getAllAsync(statement)
        console.log('Exito select')
        //console.log(result)
        return result
    } catch (error) {
        console.log(error)
    }
}
