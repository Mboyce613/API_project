'use strict';

/** @type {import('sequelize-cli').Migration} */
const {User, Group} = require('../models')
module.exports = {
  async up (queryInterface, Sequelize) {

const userGroups = [
  {
    userName: 'Demo-lition',
    group: [{
      name: 'Grave Yard Visiters',
      about: 'A bunch of awesome goth people getting together to hang out at the graves of the long since past.',
      type: 'inperson',
      privite: false,
      city: 'Bellingham',
      state :'WA',
    }]
  },
  {
    userName: 'FakeUser1',
    group:[{
      name: 'Vampire Ball Goers',
      about: 'Dressed to the nines vampire fassion dance partys! We go to have fun!!!',
      type: 'inperson',
      privite: false,
      city: 'Bellingham',
      state :'WA',
    }]
    }
];

for (let userGroup of userGroups){
  const {userName, group} = userGroup
  const theUser = await User.findOne({where:{userName}})

  for( let groupInfo of group){
    await theUser.createGroup({ ...groupInfo, organizerId: theUser.id})
  }
}

  },

  async down (queryInterface, Sequelize) {

    for (let userGroup of userGroups){
      const {userName, group} = userGroup
      const theUser = await User.findOne({where:{userName}})
    
      for( let groupInfo of group){
        await theUser.destroyGroup({ ...groupInfo, organizerId: theUser.id})
      }
    }
  }
};
