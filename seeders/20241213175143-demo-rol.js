'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    const roles = ['administrador', 'paciente'];

    // Crear un array de objetos para la inserción
    const rolesData = roles.map(rol => ({
      nombre_rol: rol,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Insertar los datos en la tabla Rols
    await queryInterface.bulkInsert('Rols', rolesData);

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Rols', null, {});
  }
};
