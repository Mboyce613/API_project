'use strict';

/** @type {import('sequelize-cli').Migration} */
const {User, Group} = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const userGroups = [
  {
    username: 'Queen',
    group: [{
      name: 'Grave Yard Visiters',
      about: 'A bunch of awesome goth people getting together to hang out at the graves of the long since past.',
      type: 'In person',
      privite: false,
      city: 'Bellingham',
      state :'WA',
    }]
  },
  {
    username: 'Banshee',
    group:[{
      name: 'Vampire Ball Goers',
      about: 'Dressed to the nines vampire fassion dance partys! We go to have fun!!!',
      type: 'In person',
      privite: false,
      city: 'Bellingham',
      state :'WA',
    }]
    }
];

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Groups';


for (let userGroup of userGroups){
  const {userName, group} = userGroup
  const theUser = await User.findOne({where:{userName}})

  for( let groupInfo of group){
    console.log(groupInfo)
    await Group.create({ ...groupInfo, organizerId: theUser.id})
  }
}

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Groups';

    for (let userGroup of userGroups){
      const {userName, group} = userGroup
      const theUser = await User.findOne({where:{userName}})
    
      for( let groupInfo of group){
        await Group.destroy({where:{ ...groupInfo, organizerId: theUser.id}})
      }
    }
  }
};
