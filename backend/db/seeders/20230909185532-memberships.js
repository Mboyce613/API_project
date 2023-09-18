'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const {Membership} = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {

    await Membership.bulkCreate([
      {
        memberId: 1,
        groupId: 1,
        status: 'co-host',
      },
      {
        memberId: 2,
        groupId: 2,
        status: 'co-host',
      },
      {
        memberId: 3,
        groupId: 2,
        status: 'member',
      },
      {
        memberId: 4,
        groupId: 2,
        status: 'member',
      },
      {
        memberId: 5,
        groupId: 1,
        status: 'pending',
      },
      {
        memberId: 5,
        groupId: 2,
        status: 'pending',
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Memberships';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      memberId: { [Op.in]: [1, 2] }
    }, {});
  }
};
