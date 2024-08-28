const express = require('express');
const app = express ();
const port = 3000;

app.listen(port, () => {console.log(`Servidor corriendo en puerto ${port}`)
                        });


//DATOS ARRAY
let productos = []

//Middleware
app.use(express.json())

//rutas
app.get('/productos', (req,res)=>{
    //res.send('Listado de productos')
    res.json(productos)
})

app.post('/productos', (req,res)=>{
    //res.send('Guardando nuevo producto')
    console.log(req.body)
    res.json({mensaje: 'Producto Agregado', producto: req.body})
    console.log(productos.length + 1)
    nuevoProducto={id:productos.length+1,...req.body}     //Genera un ID y agrega una copia de req.body
    productos.push(nuevoProducto)
})

app.put('/productos', (req,res)=>{
    res.send('Actualizando un productos')
})

app.delete('/productos', (req,res)=>{
    res.send('Eliminando un producto')
})

app.get('/productos/:id', (req,res)=>{
    res.send('Mostrando un producto')
})

