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
        url: 'https://www.telegraph.co.uk/content/dam/news/2016/05/16/Whitby_Goth_Weeken_3093992k_trans_NvBQzQNjv4BqytFz5FCbPbqrOtsvFO4XOxuLPtL1t_4Ku7JyceSxvt4.jpg?imwidth=960',
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
        url: 'https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/307463561_419240617016471_3371332814708565547_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=c5jIh13I6z0AX-4RuQ0&_nc_ht=scontent-sea1-1.xx&oh=00_AfAtozQ53eK4VPv_Apw6kdc06Cr-ORERQhhef_di_V0qog&oe=6567A26D',
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
