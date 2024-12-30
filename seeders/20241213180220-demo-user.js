'use strict';
const bcrypt = require('bcryptjs');
const { Rol, Persona } = require('../models');


/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {

    /* encontrar rol */
    const rol = await Rol.findOne({ where: { nombre_rol: 'administrador' } });
    const rolId = rol.id;

    /* Encontrar Persona */
    const persona = await Persona.findOne({ where: { dni: '2055202' } });
    const personaId = persona.id;

    /* encripta password */
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync('12345678', salt);

    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@example.com',
        password: hashedPassword,
        slug: 'sofia-spaini',
        profile_photo_path: null,
        rol_id: rolId,
        persona_id: personaId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
