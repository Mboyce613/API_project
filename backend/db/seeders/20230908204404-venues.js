'use strict';

const { where } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
const {Group, Venue} = require('../models')

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
   
    
    for (let groupVenue of groupVenues){
      const {name, venue} = groupVenue
      const theGroup = await Group.findOne({where:{name}})
    
      for( let venueInfo of venue){
        // console.log('\n',theGroup,'\n')
        await Venue.create({ ...venueInfo, groupId: theGroup.id})
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
        await Venue.destroy({where:{ ...venueInfo, groupId: theGroup.id}})
      }
    }
  }
};
