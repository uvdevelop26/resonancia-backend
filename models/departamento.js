'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Departamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Departamento.hasMany(models.Ciudad, {
        foreignKey: 'departamento_id', // Nombre de la columna FK en la tabla ciudades
        as: 'ciudades' // Alias para referenciar esta relación
      });
    }
  }
  Departamento.init({
    nombre_departamento: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Departamento',
    timestamps: false,
  });
  return Departamento;
};