'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Examen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Examen.belongsToMany(models.Imagen, {
        through: 'ExamenImagen', // Nombre de la tabla intermedia
        foreignKey: 'examen_id', // Clave foránea de Examen
        otherKey: 'imagen_id',   // Clave foránea de Imagen
        as: 'imagenes',          // Alias de la relación
      });

      Examen.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        as: 'user'
      });
    }
  }
  Examen.init({
    fecha: DataTypes.DATE,
    resultado: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Examen',
  });
  return Examen;
};