'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const {Attendee} = require('../models')
module.exports = {
  async up (queryInterface, Sequelize) {

    await Attendee.bulkCreate([
      {
        userId: 1,
        eventId: 1,
        status: 'attending',
      },
      {
        userId: 1,
        eventId: 1,
        status: 'pending',
      },
      {
        userId: 2,
        eventId: 1,
        status: 'attending',
      },
      {
        userId: 2,
        eventId: 2,
        status: 'pending',
      },
      {
        userId: 3,
        eventId: 1,
        status: 'attending',
      },
      {
        userId: 3,
        eventId: 2,
        status: 'attending',
      },
      {
        userId: 4,
        eventId: 2,
        status: 'pending',
      },
      {
        userId: 4,
        eventId: 2,
        status: 'pending',
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Attendees';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2] }
    }, {});
  },
};
