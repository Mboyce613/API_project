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
        url: 'https://foo1.com',
        preview: false,
      },
      {
        imageableId: 1,
        imageableType: 'Group',
        url: 'https://www.alamy.com/stock-photo-young-fashionable-goths-dressed-in-black-in-a-church-graveyard-portsmouth-72780708.html',
        preview: true,
      },
      {
        imageableId: 1,
        imageableType: 'Event',
        url: 'https://foo3.com',
        preview: false,
      },
      {
        imageableId: 1,
        imageableType: 'Event',
        url: 'https://cdn.staticneo.com/w/harrypotter/thumb/NearlyHeadlessNick.jpg/300px-NearlyHeadlessNick.jpg',
        preview: true,
      },
      {
        imageableId: 2,
        imageableType: 'Group',
        url: 'https://bar1.com',
        preview: false,
      },
      {
        imageableId: 2,
        imageableType: 'Group',
        url: 'https://i0.wp.com/www.vampires.com/wordpress/wp-content/uploads/2011/03/DSCF0070.jpg?w=1500&ssl=1',
        preview: true,
      },
      {
        imageableId: 2,
        imageableType: 'Event',
        url: 'https://bar3.com',
        preview: false,
      },
      {
        imageableId: 2,
        imageableType: 'Event',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCib9FCHlVJGSSM8ANZWOFprZ5UEdCIYPL1kuj7F3f0g30W-sAWOb_ueuvmcFq8vmjpUY&usqp=CAU',
        preview: true,
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
