'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Personas', [
      {
        nombre: 'Sofia',
        apellido: 'Spaini',
        dni: '2055202',
        telefono: '0214000',
        fecha_nacimiento: '01-02-1996',
        sexo: 'femenino',
        direccion: 'mi calle 136',
        edad: 28,
        ciudad_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Personas', null, {});
  }
};
