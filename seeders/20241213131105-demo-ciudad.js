'use strict';
const path = require('path');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    try {
      // Ruta al archivo JSON
      const ciudadesPath = path.resolve(__dirname, '../storage/json/Distritos_Paraguay_Codigos_DGEEC.json');

      // Importar datos del archivo JSON
      const ciudadesData = require(ciudadesPath);

      // Crear un array con los datos a insertar
      const ciudades = ciudadesData.map(ciudad => ({
        nombre_ciudad: ciudad['Descripción de Distrito'].toLowerCase(),
        departamento_id: ciudad['Código de Departamento'],
      }));

      // Insertar los datos en la tabla
      await queryInterface.bulkInsert('Ciudads', ciudades);

      console.log('Ciudades insertadas correctamente.');
    } catch (error) {
      console.error('Error al ejecutar el seeder:', error.message);
    }

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Ciudads', null, {});
  }
};
