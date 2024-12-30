'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExamenImagen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExamenImagen.init({
    examen_id: DataTypes.INTEGER,
    imagen_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ExamenImagen',
  });
  return ExamenImagen;
};