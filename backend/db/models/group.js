'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.belongsTo(
        models.User,
        {foreignKey: 'organizerId'}
      ),

      Group.hasMany(
        models.Venue,
        { foreignKey: 'groupId',
          onDelete: 'CASCADE'}
      ),
      Group.hasMany(
        models.Event,
        { foreignKey: 'groupId',
          onDelete: 'CASCADE'}
      ),
      Group.belongsToMany(
        models.User,
        { through: models.Membership,
          as:'numMembers',
          foreignKey: 'groupId',
          otherKey: 'memberId',
          onDelete: 'CASCADE'
        }
      ),
      Group.hasMany(
        models.Image,
        { as: 'previewImage',
          foreignKey: 'imageableId',
          constraints: false,
          onDelete: 'CASCADE',
          scope: {
            imageableType: 'Group'
          }
      }
      )
    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER,
    },
    name:{
      type: DataTypes.STRING,
      validate:{
        max: 60,
      }
    },
    about:{
      type: DataTypes.STRING,
      validate:{
        min: 50,
      }
    },
    type:{
      type: DataTypes.STRING,
      validate:{
        // only accept 'online' or 'inperson'
      isIn: [['Online', 'In person']]
      }
    },
    private: {
      type: DataTypes.BOOLEAN,
    },
    city:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
  //   defaultScope: { 
  //     attributes: { 
  //         exclude: [ "updatedAt","createdAt" ] 
  //     }
  // },
    sequelize,
    modelName: 'Group',
  },
);
  return Group;
};