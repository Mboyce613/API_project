'use strict';

let options = {};
options.tableName = "Users";
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(options, 'firstName', { type: Sequelize.DataTypes.STRING, allowNull: false, },options);

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
