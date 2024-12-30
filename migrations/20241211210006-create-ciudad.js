'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ciudads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre_ciudad: {
        type: Sequelize.STRING
      },
      departamento_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Departamentos', // Nombre de la tabla relacionada
          key: 'id' // Columna en la tabla relacionada
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      /*  createdAt: {
         allowNull: false,
         type: Sequelize.DATE
       },
       updatedAt: {
         allowNull: false,
         type: Sequelize.DATE
       } */
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ciudads');
  }
};