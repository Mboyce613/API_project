'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { where } = require('sequelize');
const {Group, Venue, Event} = require('../models')

const venueEvents = [
  {
    address: '666 Graveyard way',
    event: [{
      name: 'Nearly headless Nicks death day party',
      type: 'In person',
      startDate : '12/30/2023',
      endDate: '01/01/2024',
      capacity: 666,
      price: 0,
      description: 'Come celebrate the day Nick nearly lost his head',
      hostFirstName:'Morticia',
      hostLastName: 'Addams'
    }]
  },
  {
    address: '999 Bloodsucker blvd',
    event:[{
      name: 'Blood drive',
      type: 'In person',
      startDate : '12/30/2023',
      endDate: '01/01/2024',
      capacity: 999,
      price: 20,
      description: 'Come give blood, it will definitely be used for medical purposes...',
      hostFirstName:'Siouxsie',
      hostLastName: 'Sioux'
    }]
    }
];

module.exports = {

  async up (queryInterface, Sequelize) {
    options.tableName = 'Events';

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
    options.tableName = 'Events';
        for (let venueEvent of venueEvents){
      const {address, event} = venueEvent
      const theVenue = await Venue.findOne({where:{address}})
    
      for( let eventInfo of event){
        await Event.destroy({where:{ ...eventInfo, groupId: theVenue.groupId, venueId: theVenue.id}})
      }
    }
  }
};
