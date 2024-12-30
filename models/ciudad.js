'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ciudad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ciudad.belongsTo(models.Departamento, {
        foreignKey: 'departamento_id', // Nombre de la columna FK en la tabla ciudades
        as: 'departamento' // Alias para referenciar esta relación
      });

      Ciudad.hasMany(models.Persona, {
        foreignKey: 'ciudad_id', // Nombre de la columna FK en la tabla ciudades
        as: 'personas' // Alias para referenciar esta relación
      });
    }
  }
  Ciudad.init({
    nombre_ciudad: DataTypes.STRING,
    departamento_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ciudad',
    timestamps: false,
  });
  return Ciudad;
};