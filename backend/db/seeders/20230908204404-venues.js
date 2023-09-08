'use strict';

/** @type {import('sequelize-cli').Migration} */
const {Group, Venue} = require('../models')
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
    const groupVenues = [
      {
        name: 'Grave Yard Visiters',
        venue: [{
          address: '666 Graveyard way',
          city: 'Bellingham',
          state :'WA',
          lat: 666,
          lng: 666,
        }]
      },
      {
        name: 'Vampire Ball Goers',
        venue:[{
          address: '999 Bloodsucker blvd',
          city: 'Bellingham',
          state :'WA',
          lat: 999,
          lng: 999,
        }]
        }
    ];
    
    for (let groupVenue of groupVenues){
      const {name, venue} = groupVenue
      const theGroup = await Group.findOne({where:{name}})
    
      for( let venueInfo of venue){
        console.log('\n',theGroup,'\n')
        await theGroup.createVenue({ ...venueInfo, groupId: theGroup.id})
      }
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (let groupVenue of groupVenues){
      const {name, venue} = groupVenue
      const theGroup = await Group.findOne({where:{name}})
    
      for( let venueInfo of venue){
        await theGroup.destroyVenue({ ...venueInfo, groupId: theGroup.id})
      }
    }
  }
};
