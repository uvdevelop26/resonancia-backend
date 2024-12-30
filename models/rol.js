'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rol.hasMany(models.User, {
        foreignKey: 'rol_id',
        as: 'users'
      });
    }
  }
  Rol.init({
    nombre_rol: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }

  }, {
    sequelize,
    modelName: 'Rol',
  });
  return Rol;
};