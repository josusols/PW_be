const express = require('express');
const redis = require('redis');

var router = express.Router();
const client = redis.createClient(6379,'localhost');

var mongo_Pelicula = require('../controllers/Peliculas.controller');

/* GET users listing. */
router.get('/', async (req, res, next) => {
    
    try {
        /*const peliculas = await contactDao.getAll();*/

        // key to store results in Redis store
        const peliculasRedisKey = 'all:peliculas';

        // Try fetching the result from Redis first in case we have it cached
        return client.get(peliculasRedisKey, async (err, peliculas) => {

            // If that key exists in Redis store
            if (peliculas) {
                console.log("Encontro en REDIS");
                return res.status(200).json(JSON.parse(peliculas));
    
            }
            else {

                const actualPeliculas = await mongo_Pelicula.obtenerPeliculas();
    
            
                // Save the  API response in Redis store,  data expire time in 3600 seconds, it means one hour
                client.setex(peliculasRedisKey, 30, JSON.stringify(actualPeliculas));
                return res.status(200).json(actualPeliculas);

            } 

        });
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
    

   //const actualPeliculas = await mongo_Pelicula.obtenerPeliculas();

   //return res.status(200).json(actualPeliculas);

    
});

// POST method route
router.post('/add', async (req, res) => {
    try {
        const { pelicula } = req.body;

        if (!pelicula) {
           return res.status(500).json({error:"pelicula invalida"});
        }

        mongo_Pelicula.insertarPelicula(pelicula)
        .then(peliculaObj => {
            //console.log(peliculaObj, 'final');
            return res.status(201).json(peliculaObj);
        });
        
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
