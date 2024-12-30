'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.belongsTo(models.Rol, {
        foreignKey: 'rol_id',
        as: 'rol'
      });

      User.belongsTo(models.Persona, {
        foreignKey: 'persona_id',
        as: 'persona'
      });

      User.hasMany(models.Examen, {
        foreignKey: 'user_id',
        as: 'examenes'
      });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    profile_photo_path: {
      type: DataTypes.TEXT,
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    persona_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};