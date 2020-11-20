
var Pelicula = require('../models/peliculas');

exports.obtenerPeliculas =  async function getTodasPeliculas(){

    return Pelicula.find()
        .then( peliculas => {
            return peliculas;
        })
}

exports.insertarPelicula =  async function addPeliculas(oPelicula){
    return Pelicula.create(
        oPelicula)
        .then( pelicula => {
            return Pelicula.find( { _id: pelicula._id }, null, { limit: 1 })
            
        })
}

exports.modificarPelicula = async function updatePeliculas(oPelicula) {
    return Pelicula.findByIdAndUpdate( oPelicula._id, { ...oPelicula }, (error, data) => {
        if(error){
            throw error;
        } else {
            return data
        }
    })
}

exports.eliminarPelicula = async function deletePeliculas(id) {
    return Pelicula.findByIdAndDelete( id, (error, data) => {
        if(error){
            throw error;
        } else {
        return data
        }
    });
}

exports.obtenerPelicula =  async function getPelicula(id){
    return Pelicula.find( { _id: id }, null, { limit: 1 })
}


