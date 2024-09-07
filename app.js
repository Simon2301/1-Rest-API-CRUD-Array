const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});


//DATOS ARRAY
let productos = []

//Middleware
app.use(express.json())

//rutas
app.get('/productos', (req, res) => {
    //res.send('Listado de productos')
    res.json(productos)
})

//Añadir producto
app.post('/productos', (req, res) => {
    //res.send('Guardando nuevo producto')
    //req.body utliza los datos ingresados por body
    console.log(req.body)
    res.json({ mensaje: 'Producto Agregado', producto: req.body })
    console.log(productos.length + 1)
    nuevoProducto = { id: productos.length + 1, ...req.body }     //Genera un ID y agrega una copia de req.body
    //push añade elemento al final del array
    productos.push(nuevoProducto)
})

//Actualizar Producto por ID
app.put('/productos/:id', (req, res) => {
    //res.send('Actualizando un productos')
    //busca elemnto segun id
    //req.params. recibe por url valores
    //find devuelve el valor del primer elemento que conincide con el ingresado (en este caso con ID)
    const prodEncontrado = productos.find((p) => p.id == req.params.id)
    if (!prodEncontrado) {
        return res.status(404).json(`No se encuentra el producto`)
    }
    console.log(req.params.id)
    console.log(req.body)
    const nuevosDatos = req.body
    //.map genera un nuevo array con los valores asginados
    //if ternario const X =(condición)?(if) :(else)
    //if en una linea || ... copiar
    productos = productos.map(p => p.id == req.params.id ? { ...p, ...nuevosDatos } : p)
    res.json(`Producto Actualizado`)
})

//Eliminar Producto
app.delete('/productos/:id', (req, res) => {
    //res.send('Eliminando un producto')
    //busca elemnto segun id
    const prodEncontrado = productos.find((p) => p.id == req.params.id)
    if (!prodEncontrado) {
        return res.status(404).json(`No se encuentra el producto`)
    }
    //filtra elementos y elimina el que coincide con el ID
    productos = productos.filter((p) => p.id != req.params.id)
    console.log(productos)
    res.json(`Producto Eliminado`)

})

//Buscar Producto por ID
app.get('/productos/:id', (req, res) => {
    //res.send('Mostrando un producto')
    console.log(req.params)
    // FORMATO LARGO
    /* const prodEncontrado = productos.find((producto)=>{
         return producto.id == req.params.id 
     })
     */
    //FORMATO EN UNA LINEA se eliminan llaves y return
    const prodEncontrado = productos.find((p) => p.id == req.params.id)
    if (!prodEncontrado) {
        return res.status(404).json(`No se encuentra el producto`)
    }
    res.json({
        mensaje: "producto encontrado",
        producto: prodEncontrado
    })
})
