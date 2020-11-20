    // Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var PeliculaSchema = Schema({
    titulo: String,
    description: String,
    director: String,
    produccion: String,
    duracion: String,
    imagen: String, 
    done: Boolean
});
// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Pelicula', PeliculaSchema);