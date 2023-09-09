'use strict';

/** @type {import('sequelize-cli').Migration} */
const {Membership} = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Membership.bulkCreate([
      {
        memberId: 1,
        groupId: 1,
        status: 'pending',
      },
      {
        memberId: 2,
        groupId: 2,
        status: 'member',
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await Membership.bulkDelete([
      {
        memberId: 1,
        groupId: 1,
        status: 'pending',
      },
      {
        memberId: 2,
        groupId: 2,
        status: 'member',
      },
    ], { validate: true });
  }
};
