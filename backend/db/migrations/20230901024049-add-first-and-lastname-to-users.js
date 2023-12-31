'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Users";

    await queryInterface.addColumn(options, 'firstName', { type: Sequelize.DataTypes.STRING, allowNull: false, });

    await queryInterface.addColumn(options, 'lastName', { type: Sequelize.DataTypes.STRING, allowNull: false, });

  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Users";
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn(options, 'firstName', { type: Sequelize.DataTypes.STRING, allowNull: false, });

    await queryInterface.removeColumn(options, 'lastName', { type: Sequelize.DataTypes.STRING, allowNull: false, });

  }
};
