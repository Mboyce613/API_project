'use strict';

const { where } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
const {Group, Venue, Event} = require('../models')

const venueEvents = [
  {
    address: '666 Graveyard way',
    event: [{
      name: 'Nearly headless Nicks death day party',
      type: 'inperson',
      startDate : '12/30/2023',
      endDate: '01/01/2024',
      capacity: 666,
      price: 0,
      description: 'Come celebrate the day Nick nearly lost his head'
    }]
  },
  {
    address: '999 Bloodsucker blvd',
    event:[{
      name: 'Blood drive',
      type: 'inperson',
      startDate : '12/30/2023',
      endDate: '01/01/2024',
      capacity: 999,
      price: 20,
      description: 'Come give blood, it will definitely be used for medical purposes...'
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
     *   address: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
       
    
    for (let venueEvent of venueEvents){
      const {address, event} = venueEvent
      const theVenue = await Venue.findOne({where:{address}})
    
      for( let eventInfo of event){
        // console.log('\n',theVenue,'\n')
        await Event.create({ ...eventInfo, groupId: theVenue.groupId, venueId: theVenue.id})
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
        for (let venueEvent of venueEvents){
      const {address, event} = venueEvent
      const theVenue = await Venue.findOne({where:{address}})
    
      for( let eventInfo of event){
        await Event.destroy({where:{ ...eventInfo, groupId: theVenue.groupId, venueId: theVenue.id}})
      }
    }
  }
};
