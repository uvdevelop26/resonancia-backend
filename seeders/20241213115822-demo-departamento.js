'use strict';
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    try {
      // Ruta al archivo JSON
      const departamentosPath = path.resolve(__dirname, '../storage/json/Departamentos_Paraguay_Codigos_DGEEC.json');

      // Importar datos del archivo JSON
      const departamentosData = require(departamentosPath);

      // Crear un array con los datos a insertar
      const departamentos = departamentosData.map(departamento => ({
        nombre_departamento: departamento.descripcion_dpto.toLowerCase(),
      }));

      // Insertar todos los registros de una sola vez
      await queryInterface.bulkInsert('Departamentos', departamentos);

      console.log('Departamentos insertados correctamente.');
    } catch (error) {
      console.error('Error al ejecutar el seeder:', error.message);
    }

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Departamentos', null, {});
  }
};
