'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Persona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Persona.belongsTo(models.Ciudad, {
        foreignKey: 'ciudad_id',
        as: 'ciudad'
      });

      Persona.hasMany(models.User, {
        foreignKey: 'persona_id',
        as: 'users'
      });

    }
  }
  Persona.init({
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    dni: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sexo: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ciudad_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Persona',
  });
  return Persona;
};