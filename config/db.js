const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config(); // Cargar variables de entorno

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT // Asegúrate de incluir esta línea
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const Entidades = sequelize.define('entidades', {
  tipo: {
    type: DataTypes.ENUM('receta', 'blog', 'cursos', 'ebooks', 'pagina'),
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(35),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: false
});

const Comentarios = sequelize.define('comentarios', {
  nombre: {
    type: DataTypes.STRING(35),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(35),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(15)
  },
  tipo: {
    type: DataTypes.ENUM('sugerencias', 'opiniones', 'observaciones', 'preguntas'),
    allowNull: false
  },
  calificacion: {
    type: DataTypes.ENUM('1', '2', '3', '4', '5'),
    allowNull: false
  },
  entidad_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Entidades,
      key: 'id'
    }
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = {
  sequelize,
  connectDB,
  Entidades,
  Comentarios
};


/* Exportando la funcion y la variable */
