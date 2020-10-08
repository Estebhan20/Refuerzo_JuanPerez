const express = require('express');
const path = require('path');
const morgan = require('morgan');
const router = require('./routes/movies');
const app = express();


//Middlewares
app.use(morgan('dev')); //Monitorear las peticiones
app.use(express.json()); //Peticiones en formato json


//Routes
app.use('/api/', require('./routes/movies'));
//Establecer más rutas

app.set("port",  4001);
app.listen(app.get("port"), ()=>{
    console.log("Servidor corriendo en puerto " + app.get("port"));
});

