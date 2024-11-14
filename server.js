const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { sequelize, connectDB, Entidades, Comentarios } = require('./config/db'); // Asegúrate de importar `Entidades` y `Comentarios`
const bodyParser = require('body-parser');
const rutas = require('./routes');

dotenv.config();  // Cargar variables de entorno

const app = express();
const port = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware para analizar las solicitudes JSON
app.use(bodyParser.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para manejar las rutas de comentarios
app.use('/api', rutas);

// Ruta para servir 'index.html' en la ruta raíz
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'INICIO', 'index.html');
  console.log(`Sirviendo archivo index desde: ${indexPath}`);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error al servir el archivo index:', err);
      res.status(err.status).end();
    }
  });
});

// Sincronizar la base de datos y poblar datos iniciales
sequelize.sync({ force: true }).then(async () => {
  try {
    // Poblar la tabla `entidades` con datos de ejemplo
    await Entidades.bulkCreate([
      { tipo: 'receta', nombre: 'Receta: ', descripcion: '' },
      { tipo: 'blog', nombre: 'Blog: ', descripcion: '' },
      { tipo: 'cursos', nombre: 'Curso: ', descripcion: '' },
      { tipo: 'ebooks', nombre: 'Ebook: ', descripcion: '' },
      { tipo: 'pagina', nombre: 'Página: ', descripcion: '' }
    ]);

    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error al poblar datos iniciales:', error);
  }
});



/*cd "C:\Users\Alejandro Martinez\Documents\Programacion\vsc1\BOOTCAMP DW FST\Curso de desarrollador web fullstack\CODIGO\PROYECTO\proyecto_cocteleria"

 */