const mongoose = require('mongoose');

// Usamos el método connect para conectarnos a nuestra base de datos.
mongoose.connect(
  'mongodb://db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    dbName: 'peliculas', // IMPORTANT TO HAVE IT HERE AND NOT IN CONNECTION STRING.
  },
  err => { throw err; },
).then(() => {
    // Cuando se realiza la conexión, lanzamos este mensaje por consola.
    console.log("La conexión a la base de datos curso_mean_social se ha realizado correctamente")
})
// Si no se conecta correctamente escupimos el error.
.catch(err => console.log(err));