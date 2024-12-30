'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Imagen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Imagen.belongsToMany(models.Examen, {
        through: 'ExamenImagen', // Nombre de la tabla intermedia
        foreignKey: 'imagen_id', // Clave foránea de Imagen
        otherKey: 'examen_id',   // Clave foránea de Examen
        as: 'examenes',          // Alias de la relación
      });
    }
  }
  Imagen.init({
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Imagen',
  });
  return Imagen;
};