const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, Membership, Image, Venue } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

//! may need some kind of validation, stole this from users.js
// const validateSignup = [
//   check('email')
//     .exists({ checkFalsy: true })
//     .isEmail()
//     .withMessage('Please provide a valid email.'),
//   check('username')
//     .exists({ checkFalsy: true })
//     .isLength({ min: 4 })
//     .withMessage('Please provide a username with at least 4 characters.'),
//   check('username')
//     .not()
//     .isEmail()
//     .withMessage('Username cannot be an email.'),
//   check('password')
//     .exists({ checkFalsy: true })
//     .isLength({ min: 6 })
//     .withMessage('Password must be 6 characters or more.'),
//   handleValidationErrors
// ];


router.get('/', async (req,res) =>{
    const Groups = await Group.findAll() 

    for( let group of Groups){
        const {id} = group

        const memberships = await Membership.findAll({where:{groupId: id}})
        const image = await Image.findAll({where:{imageableType: 'Group', preview: true}})

        // console.log('\n\n',image,'\n\n')

        group.dataValues.numMembers = memberships.length
        group.dataValues.previewImage = image[0].dataValues.url
        // console.log(group)
    }

   return res.json({Groups})
})

//! ------- Requires Auth --------------
router.get('/current', async (req,res) =>{

// how do I get info about the current user?

   return res.json()
})

//! ------------------ NEEDS ----------------
//? GroupImages: remove imageableId, imageableType, createdAt, updatedAt
//? Organizer: remove username
//? Venues: remove createdAt, updatedAt
router.get('/:groupId', async (req,res) =>{
    // console.log('\n\n',req.params,'\n\n')
    const {groupId} = req.params
    const group = await Group.findOne({where:{id:groupId}})
    const numMembers = await Membership.findAll({where:{groupId: groupId}})
    const images = await Image.findAll({where:{imageableType: 'Group'}})
    const {organizerId} = group
    const organizer = await User.findOne({where:{id: organizerId}})
    // console.log('\n',organizer,'\n')
    const venues = await Venue.findOne({where:{groupId: groupId}})
    group.dataValues.numMembers = numMembers.length
    group.dataValues.GroupImages = images
    group.dataValues.Organizer = organizer
    group.dataValues.Venues = venues

    res.json(group)
})


module.exports = router;