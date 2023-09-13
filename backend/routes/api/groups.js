const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, Membership, Image, Venue } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


// GET /api/groups
//? ---------------- works --------------------
router.get('/', async (req,res) =>{
    const Groups = await Group.findAll() 

    for( let group of Groups){
        const {id} = group

        const memberships = await Membership.findAll({where:{groupId: id}})
        const image = await Image.findAll({where:{imageableType: 'Group', preview: true, imageableId: id}})

        // console.log('\n\n',image,'\n\n')

        group.dataValues.numMembers = memberships.length
        group.dataValues.previewImage = image[0].dataValues.url
        // console.log(group)
    }

   return res.json({Groups})
})

// GET /api/groups/current
//! ------- Requires Auth --------------
router.get('/current', async (req,res) =>{

// how do I get info about the current user?
const userId = req.user.id

const ownsGroup = await Group.findAll({where:{organizerId:userId}})


   return res.json(ownsGroup)
})

// GET /api/groups/:groupId
//? --------- WORKS ---------------
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


// POST /api/groups

const validateSignup = [
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 60 })
      .withMessage('Name must be 60 characters or less'),
    check('about')
      .exists({ checkFalsy: true })
      .isLength({ min: 50 })
      .withMessage('About must be 50 characters or more'),
    check('type')
      .not()
      .isEmail()
      .isIn(['In person', 'Online'])
      .withMessage("Type must be 'Online' or 'In person"),
    check('private')
      .exists({ checkFalsy: true })
      .isIn(['true', 'false'])
      .withMessage('Private must be a boolean'),
      check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
      check('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required'),
    handleValidationErrors
  ];

//? ---------------- Works ----------------
router.post('/',validateSignup, async (req,res)=>{
    const userId = req.user.id
    let { name, about, type, private, city, state} = req.body


  const newGroup = await Group.create({name, about, type, private, city, state, organizerId: userId})
    
    res.json(newGroup)

})

// POST URL: /api/groups/:groupId/images
//? ----------------- works ------------------
router.post('/:groupId/images', async (req,res)=>{
  const {groupId} = req.params
  const {url, preview} = req.body
  const theGroup = await Group.findOne({where:{id:groupId}})

  if(theGroup){
   const newImage = await Image.create({url, preview, imageableId:groupId, imageableType:'Group'})
   const sendImage = await Image.findOne({where:{url}})
   res.json(sendImage)
  } else{
    res.statusCode = 404
    throw new Error("Group couldn't be found")
  }
})

//PUT URL: /api/groups/:groupId
const validateGroup = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 60 })
    .withMessage('Name must be 60 characters or less'),
  check('about')
    .exists({ checkFalsy: true })
    .isLength({ min: 50 })
    .withMessage('About must be 50 characters or more'),
  check('type')
    .not()
    .isEmail()
    .isIn(['In person', 'Online'])
    .withMessage("Type must be 'Online' or 'In person"),
  check('private')
    .exists({ checkFalsy: true })
    .isIn(['true', 'false'])
    .withMessage('Private must be a boolean'),
    check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
    check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  handleValidationErrors
];

//? ---------------- Works ----------------
router.put('/:groupId',validateGroup, async (req,res)=>{
const {name, about, type, private, city, state} = req.body


})

module.exports = router;