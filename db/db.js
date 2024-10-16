import * as SQLite from 'expo-sqlite';

export const connectToDatabase = SQLite.openDatabaseSync('notas');

export const createTables = async (db) => {
    const notas = `
      CREATE TABLE IF NOT EXISTS tabla_notas (
          id INTEGER DEFAULT 1,
          titulo TEXT,
          contenido TEXT,
          fecha INTEGER,
          PRIMARY KEY(id)
      )
    `
    //Guardamos la fecha con formato UNIX time; Aka: the number of seconds since 1970-01-01 00:00:00 UTC.  
    try {
        await db.execAsync(notas)
        console.log('Exito creando la tabla')
    } catch (error) {
        console.error(error)
        console.log(db, typeof db)
        //throw Error(`Failed to create tables`)

    }
}

export const insertarFila = async (db, titulo, contenido, date) => {
    const statement = `
    INSERT INTO tabla_notas (titulo, contenido, fecha) VALUES ('${titulo}','${contenido}', ${date});`

    try {
        await db.execAsync(statement)
        console.log('Exito insert')
        return true
    } catch (error) {
        console.log(error)
    }
}

export const eliminarNota = async (db, id) => {
    const statement = `DELETE FROM tabla_notas WHERE id = ${id};`
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
    UPDATE tabla_notas
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
    SELECT * FROM tabla_notas;`

    try {
        const result = await db.getAllAsync(statement)
        console.log('Exito select')
        //console.log(result)
        return result
    } catch (error) {
        console.log(error)
    }
}
