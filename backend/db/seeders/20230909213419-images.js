'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const {Image} = require('../models')
module.exports = {
  async up (queryInterface, Sequelize) {
    await Image.bulkCreate([
      {
        imageableId: 1,
        imageableType: 'Group',
        url: 'https://foo.com',
        preview: false,
      },
      {
        imageableId: 1,
        imageableType: 'Event',
        url: 'https://foo.com',
        preview: true,
      },
      {
        imageableId: 2,
        imageableType: 'Group',
        url: 'https://bar.com',
        preview: true,
      },
      {
        imageableId: 2,
        imageableType: 'Event',
        url: 'https://bar.com',
        preview: false,
      },
    ], { validate: true },
    );
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Images';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      imageableType: { [Op.in]: ['Group', 'Event'] }
    }, {});
  }
};
