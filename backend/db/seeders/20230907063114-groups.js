'use strict';

/** @type {import('sequelize-cli').Migration} */
const {User, Group} = require('../models')

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

module.exports = {
  async up (queryInterface, Sequelize) {



for (let userGroup of userGroups){
  const {userName, group} = userGroup
  const theUser = await User.findOne({where:{userName}})

  for( let groupInfo of group){
    // console.log(theUser)
    await Group.create({ ...groupInfo, organizerId: theUser.id})
  }
}

  },

  async down (queryInterface, Sequelize) {

    for (let userGroup of userGroups){
      const {userName, group} = userGroup
      const theUser = await User.findOne({where:{userName}})
    
      for( let groupInfo of group){
        await Group.destroy({where:{ ...groupInfo, organizerId: theUser.id}})
      }
    }
  }
};
