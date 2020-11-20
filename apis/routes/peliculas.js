var express = require('express');

var router = express.Router();

var mongo_Pelicula = require('../controllers/Peliculas.controller');

/* GET users listing. */
router.get('/', async (req, res, next) => {
    const actualPeliculas = await mongo_Pelicula.obtenerPeliculas();
    return res.status(200).json(actualPeliculas);
});

// POST method route
router.post('/add', async (req, res) => {
    try {
        const { pelicula } = req.body;

        if (!pelicula) {
           return res.status(500).json({error:"pelicula invalida"});
        }

        const actualPeliculas = mongo_Pelicula.insertarPelicula(pelicula);
        

        return res.status(201).json(actualPeliculas);
    } catch (error) {
        console.log('Error :' + error);
    }
});

router.put('/update', async (req, res) => {
    try {
        const { pelicula } = req.body;
        if (!pelicula) {
           return res.status(500).json({error:"pelicula invalida"});
        }
        const actualPeliculas = mongo_Pelicula.modificarPelicula(pelicula);
        return res.status(201).json(actualPeliculas);
    } catch (error) {
        console.log('Error :' + error);
    }
});

router.delete('/del/:identificador', async (req, res) => {
    try {
        const { identificador } = req.params;
        const actualPeliculas = mongo_Pelicula.eliminarPelicula(identificador);
        return res.status(201).json(actualPeliculas);
    } catch (error) {
        console.log('Error :' + error);
    }
});

router.get('/:identificador', async (req, res, next) => {
    const { identificador } = req.params;
    const actualPeliculas = await mongo_Pelicula.obtenerPelicula(identificador);
    return res.status(200).json(actualPeliculas);
});

module.exports = router;
