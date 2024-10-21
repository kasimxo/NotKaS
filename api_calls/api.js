export async function recuperarNotasGET() {
    console.log('Peticion de recuperar notas GET a servidor')
    const url = "http://localhost:3000/notas";
    var contenido
    try {
        var data = await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*"
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        })

        var respuesta = await data.json()
        var coleccion = []
        respuesta.forEach(nota => {
            coleccion.push(nota)
        })
        console.log(coleccion)
        return coleccion

    } catch (error) {
        console.error(error.message);
    }
}

export async function crearNotaPOST(titulo, contenido, fecha) {
    var nota = { titulo: titulo, contenido: contenido, fecha: fecha }
    console.log('Solicitud de crear nota: ', nota)
    const url = `http://localhost:3000/notas`;
    try {
        var data = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*"
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(nota),
        })

        console.log(data)
        return

    } catch (error) {
        console.error(error.message);
    }
}

export async function borrarNotaDELETE(id) {
    console.log('Solicitud de elimar nota: ', id)
    const url = `http://localhost:3000/notas/${id}`;
    var contenido
    try {
        var data = await fetch(url, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*"
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        })

        console.log(data)
        return

    } catch (error) {
        console.error(error.message);
    }
}

export async function editarNotaUPDATE() { }

