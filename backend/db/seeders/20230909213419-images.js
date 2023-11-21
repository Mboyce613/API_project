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
        url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fichef.bbci.co.uk%2Fnews%2F976%2Fcpsprodpb%2F4E3E%2Fproduction%2F_89603002_getty_whitby1.jpg&tbnid=fciAsEqy185hBM&vet=12ahUKEwjF8Mfnk9SCAxWuIjQIHRkKDu0QMygRegUIARCLAQ..i&imgrefurl=https%3A%2F%2Fwww.bbc.co.uk%2Fnews%2Fnewsbeat-36211097&docid=52IP08OCKnIAQM&w=976&h=549&q=graveyard%20goths&ved=2ahUKEwjF8Mfnk9SCAxWuIjQIHRkKDu0QMygRegUIARCLAQ',
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
        url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2F736x%2F05%2Ff5%2F0f%2F05f50f3cd8a49e6bd395aa3fb012cbd5.jpg&tbnid=1jgBgCEEyjY9iM&vet=12ahUKEwjtqs2hlNSCAxXHCDQIHVPBC-wQMygMegQIARB0..i&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F113997434305608104%2F&docid=nzTv_0P3YmpQVM&w=736&h=537&q=vampire%20masquerade%20ball&ved=2ahUKEwjtqs2hlNSCAxXHCDQIHVPBC-wQMygMegQIARB0',
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
