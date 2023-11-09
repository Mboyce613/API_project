const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, Membership, Image, Venue, Event, Attendee } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {isOrganizer, isCoHost, isMember} = require('../../utils/authorization')

const router = express.Router();

//!------------------------------------------------------------!//
//! ------------------- VALIDATOR-Start -----------------------!//
//!------------------------------------------------------------!//
const validateEvent = [
  check('venueId')
    .exists({ checkFalsy: true })
    .withMessage('Venue does not exist'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage('Name must be at least 5 characters'),
  check('type')
    .exists({ checkFalsy: true })
    .isIn(['In person', 'Online'])
    .withMessage("Type must be Online or In person"),
  check('capacity')
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage('Capacity must be an integer'),
  check('price')
    .exists({ checkFalsy: true })
    .isFloat()
    .withMessage('Price is invalid'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('startDate')
    .exists({ checkFalsy: true })
    .isAfter(Date())
    .withMessage('Start date must be in the future'),
  check('endDate')
    .exists({ checkFalsy: true })
    // .isAfter('startDate')
    .withMessage('End date is less than start date'),
  handleValidationErrors
];

const validateVenue = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .withMessage('Latitude is not valid'),
  check('lat')
    .isNumeric()
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check('lng')
    .isNumeric()
    .withMessage("Longitude is not valid"),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  handleValidationErrors
];

const validateSignup = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Name must be 60 characters or less'),
  check('name')
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
    .isIn(['In person', 'Online'])
    .withMessage("Type must be 'Online' or 'In person"),
  check('private')
    // .exists({ checkFalsy: true })
    // .isIn(['true', 'false'])
    .isBoolean()
    .withMessage('Private must be a boolean'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  handleValidationErrors
];

//!------------------------------------------------------------!//
//! -------------------- VALIDATOR-End ------------------------!//
//!------------------------------------------------------------!//

//!------------------------------------------------------------!//
//! ---------------------- GET-Start --------------------------!//
//!------------------------------------------------------------!//
//? Get all Events of a Group specified by its id ?//
//GET URL: /api/groups/:groupId/events
router.get('/:groupId/events', async (req,res)=>{
  const {groupId} = req.params
  const returnObj = {"Events":[]}

  const theGroup = await Group.findOne({
    where:{id:groupId},
    attributes:["id", "name", "city", "state"]
  })
if(!theGroup){
  res.statusCode = 404
  return res.json({"message": "Group couldn't be found"})
  // throw new Error("Group couldn't be found")
}

  const theEvents = await Event.findAll({
    where:{groupId},
    attributes:["id", "groupId", "venueId", "name", "type", "startDate", "endDate"],
  })

  for( let event of theEvents){
    
    const theVenue = await Venue.findOne({
      where:{id:event.venueId},
      attributes: ["id", "city", "state"]
    })
      const numAttending = await Attendee.findAll({where:{eventId:event.id, status:"attending"}})
      let image = await Image.findOne({where:{imageableType: 'Event', preview: true, imageableId: event.id}})
      // console.log('\n',theGroup,'\n')
      // console.log('\n',event,'\n')
      if(numAttending.length){
          event.dataValues.numAttending = numAttending.length
      } else{
          event.dataValues.numAttending = 0
      }

      if(!image){
          event.dataValues.previewImage = null
      } else{
          event.dataValues.previewImage = image.url
      }
     
      event.dataValues.Group = theGroup

      if(theVenue){
          event.dataValues.Venue = theVenue
      } else{
          event.dataValues.Venue = null
      }
      returnObj.Events.push(event)
  }
  return res.json(returnObj)
})
//? --------------------------------------------------------- ?//

//? Get all Members of a Group specified by its id ?//
//GET URL: /api/groups/:groupId/members
router.get('/:groupId/members', async (req,res)=>{
  const {groupId} = req.params
  const curr = req.user.id
  let owner = false

const theGroup = await Group.findByPk(groupId)
if(!theGroup){
  res.statusCode = 404
  return res.json({"message": "Group couldn't be found"})
  // throw new Error("Group couldn't be found")
}
// if(theGroup.organizerId === req.user.id) owner = true
if(await isOrganizer(groupId,curr)) owner = true


  const returnObj = {"Members":[]}
 let theMembers = await Membership.findAll({where:{groupId}})
 for(let member of theMembers){
   const {memberId} = member
   const theMember = await User.findOne({where:{id:memberId}})
if(owner){
  const obj = {
    'id':memberId,
    "firstName":theMember.firstName,
    "lastName":theMember.lastName,
    "Membership":{"status":member.status}
  }
  returnObj.Members.push(obj)
} else{
  if(member.status !== 'pending'){
    const obj = {
      'id':memberId,
      "firstName":theMember.firstName,
      "lastName":theMember.lastName,
      "Membership":{"status":member.status}
    }
    returnObj.Members.push(obj)
  }
}
 }
  return res.json(returnObj)
})
//? --------------------------------------------------------- ?//

//? Get All Venues for a Group specified by its id ?//
// GET URL: /api/groups/:groupId/venues
router.get('/:groupId/venues', requireAuth, async (req,res)=>{
  const {groupId} = req.params
  const curr = req.user.id

  const theGroup = await Group.findOne({where:{id:groupId}})
  if(!theGroup){
    res.statusCode = 404
    return res.json({"message": "Group couldn't be found"})
  }

const isCoHost = await Membership.findOne({where:{groupId:theGroup.id, memberId:curr, status:"co-host"}})
if(theGroup.organizerId === curr || isCoHost){

  const theVenues = await Venue.findAll({where:{groupId}})
  const returnObj = {"Venues": []}
    for (let venue of theVenues){
        returnObj.Venues.push(venue)
    }
    if(theVenues[0]){
     return res.json(returnObj)
    } 
}
res.statusCode = 403
return res.json({"message": "Forbidden"})
})
//? --------------------------------------------------------- ?//

//? Get all Groups joined or organized by the Current User ?//
// GET URL: /api/groups/current
router.get('/current', requireAuth, async (req,res) =>{

  const userId = req.user.id
  
  const returnObj = {"Groups":[]}
  
  const ownsGroup = await Group.findAll({where:{organizerId:userId}})
  for(let group of ownsGroup){
    const memberships = await Membership.findAll({where:{groupId: group.organizerId}})
    let image = await Image.findOne({where:{imageableType: 'Group', preview: true, imageableId: group.organizerId}})
    group.dataValues.numMembers = memberships.length
    if(!image){
        group.dataValues.previewImage = null
    } else{
        group.dataValues.previewImage = image.url
    }
    returnObj.Groups.push(group)
  }
  //get groups user has joined
  const belongsToGroups = await Membership.findAll({where:{memberId:userId}})
  // console.log(ownsGroup)
  for(let group of belongsToGroups){
    const memGroup = await Group.findByPk(group.groupId)
    const memberships = await Membership.findAll({where:{groupId: memGroup.organizerId}})
    let image = await Image.findOne({where:{imageableType: 'Group', preview: true, imageableId: group.groupId}})
    memGroup.dataValues.numMembers = memberships.length
    if(!image){
      memGroup.dataValues.previewImage = null
    } else{
      memGroup.dataValues.previewImage = image.url
    }
    returnObj.Groups.push(memGroup)
  }
  
     return res.json(returnObj)
  })
//? --------------------------------------------------------- ?//

//? Get details of a Group from an id ?//
  // GET URL: /api/groups/:groupId
router.get('/:groupId', async (req,res) =>{
  // console.log('\n\n',req.params,'\n\n')
  const {groupId} = req.params
  const group = await Group.findOne({where:{id:groupId}})
  if(!group){
    res.statusCode = 404
    res.json({"message": "Group couldn't be found"})
  }
  const numMembers = await Membership.findAll({where:{groupId: groupId}})
  const numEvents = await Event.findAll({where:{groupId: groupId}})
  const images = await Image.findAll({
    where:{imageableType: 'Group', imageableId: groupId},
    attributes:["id", "url", "preview"]
  })
  const {organizerId} = group
  const organizer = await User.findOne({
    where:{id: organizerId},
    attributes:["id", "firstName", "lastName"]
  })
  // console.log('\n',organizer,'\n')
  const venues = await Venue.findOne({
    where:{groupId: groupId},
    attributes:["id", "groupId", "address", "city", "state", "lat", "lng"]
  })
  group.dataValues.numMembers = numMembers.length
  group.dataValues.numEvents = numEvents.length
  group.dataValues.Events = numEvents
  group.dataValues.GroupImages = images
  group.dataValues.Organizer = organizer
  group.dataValues.Venues = venues

  return res.json(group)
})
//? --------------------------------------------------------- ?//

//? Get all Groups ?//
// GET URL: /api/groups
router.get('/', async (req,res) =>{
    const Groups = await Group.findAll() 

    // ------ works but wrong shape ---------
    // const theGroups = await Group.findAll(
    //   {
    //       include:[
    //           {model:User,
    //           as: 'numMembers',
    //             where:{id},
    //             attributes:["membershipId", "status"]
    //           },
    //           {model:Image,
    //              as: 'previewImage',
    //             where:{imageableType: 'Group', preview: true},
    //             attributes:['url']
    //           }
    //       ]
    //   })

    for( let group of Groups){
        const {id} = group
 
        const memberships = await Membership.findAll({where:{groupId: id}})
        const numEvents = await Event.findAll({where:{groupId: id}})
        let image = await Image.findOne({where:{imageableType: 'Group', preview: true, imageableId: id}})
        
        group.dataValues.numMembers = memberships.length
        group.dataValues.numEvents = numEvents.length
        if(!image){
            group.dataValues.previewImage = null
        } else{
            group.dataValues.previewImage = image.url
        }
    }
    res.statusCode = 200
   return res.json({Groups})
})
//? --------------------------------------------------------- ?//
//!-------------------------------------------------------------!//
//!-------------------------GET-End-----------------------------!//
//!-------------------------------------------------------------!//

//!-------------------------------------------------------------!//
//!--------------------- POST-Start ----------------------------!//
//!-------------------------------------------------------------!//

//? Create an Event for a Group specified by its id ?//
//POST URL: /api/groups/:groupId/events
router.post('/:groupId/events', requireAuth, validateEvent, async (req,res)=>{
  const curr = req.user.id

  if(validateEvent.startDate >= validateEvent.endDate){
    throw new Error('End date is less than start date')
  }

  const {groupId} = req.params
  let { venueId, name, type, capacity, price, description, startDate, endDate} = req.body
 const isGroup = await Group.findByPk(groupId)

  if(!isGroup){
      res.statusCode = 404
      return res.json({"message": "Group couldn't be found"})
      // throw new Error("Group couldn't be found")
  }

  if(!await isOrganizer(groupId,curr) && !await isCoHost(groupId,curr)){
    res.statusCode = 403
    return res.json({"message": "Forbidden"})
  }

 await Event.create({venueId, name, type, capacity, price, description, startDate, endDate, groupId:groupId})
  const returnEvent = await Event.findOne({where:{name}})
  return res.json(returnEvent)
})
//? --------------------------------------------------------- ?//

//? Add an Image to a Group based on the Group's id ?//
// POST URL: /api/groups/:groupId/images
router.post('/:groupId/images', requireAuth, async (req,res)=>{
  const {groupId} = req.params
  const {url, preview} = req.body
  const curr = req.user.id
  const theGroup = await Group.findOne({where:{id:groupId}})
  if(theGroup){
    if(!await isOrganizer(groupId, curr)){
      res.statusCode = 403
      return res.json({"message": "Forbidden"})
    }
      const newImage = await Image.create({url, preview, imageableId:groupId, imageableType:'Group'})
      const theId = newImage.id
      const sendImage = await Image.findOne({
        where:{id:theId},
        attributes:["id", "url", "preview"]
      })
      return res.json(sendImage)
    
  } else{
    res.statusCode = 404
    return res.json({"message": "Group couldn't be found"})
    // throw new Error("Group couldn't be found")
  }
})
//? --------------------------------------------------------- ?//

//? Request a Membership for a Group based on the Group's id ?//
//POST URL: /api/groups/:groupId/membership
router.post('/:groupId/membership', requireAuth, async (req,res)=>{
  const {groupId} = req.params
  const curr = req.user.id

  const theGroup = await Group.findByPk(groupId)
if(!theGroup){
  res.statusCode = 404
  return res.json({"message": "Group couldn't be found"})
  // throw new Error("Group couldn't be found")
}

const isMember = await Membership.findOne({where:{'memberId':curr,groupId}})
// console.log(isMember)
if(!isMember){
  const newMembership = await Membership.create({'memberId':curr, 'status':'pending',groupId})
  const returnMember = await Membership.findOne({
    where:{'memberId':curr, groupId},
    attributes:['memberId','status']
  })
  return res.json(returnMember)
}else if(isMember.status === 'member' || isMember.status === 'co-host'){
  res.statusCode = 400
  // throw new Error("User is already a member of the group")
  return res.json({"message": "User is already a member of the group"})
}else if(isMember.status === 'pending'){
  res.statusCode = 400
  return res.json({"message": "Membership has already been requested"})
  // throw new Error("Membership has already been requested")
}
})
//? --------------------------------------------------------- ?//

//? Create a new Venue for a Group specified by its id ?//
//POST URL: /api/groups/:groupId/venues
router.post('/:groupId/venues', requireAuth, validateVenue,  async (req,res)=>{
  const {groupId} = req.params
  const curr = req.user.id
  let { address, lat, lng, city, state} = req.body

 const isGroup = await Group.findByPk(groupId)
  if(!isGroup){
      res.statusCode = 404
      res.json({"message": "Group couldn't be found"})
      // throw new Error("Group couldn't be found")
  }

  const isMember = await Membership.findOne({where:{groupId, memberId:curr}})
  // console.log("\n", groupId)
  // console.log("\n",isMember)
  if(isGroup.organizerId === curr || (isMember && isMember.status === 'co-host')){
    const returnVenue = await Venue.create({address, lat, lng, city, state, groupId:groupId})
     // const returnVenue = await Venue.findOne({where:{address}})
     const returnObj = {
       id:returnVenue.id,
       groupId,
       address,
       city,
       state,
       lat,
       lng,
   
     }
     return res.json(returnObj)
  }
  res.statusCode = 403
  return res.json({"message": "Forbidden"})
})
//? --------------------------------------------------------- ?//

//? Create a Group ?//
// POST URL: /api/groups
router.post('/', requireAuth, validateSignup, async (req,res)=>{
    const userId = req.user.id
    let { name, about, type, private, city, state} = req.body

    const isGroup = await Group.findOne({where:{name:name}})

    if(isGroup){
      res.statusCode = 400
      return res.json({"message":"Group already exists"})
    }

  const newGroup = await Group.create({name, about, type, private, city, state, organizerId: userId})
    res.statusCode = 201
    return res.json(newGroup)
})
//? --------------------------------------------------------- ?//

//!-------------------------------------------------------------!//
//!--------------------- POST-End ------------------------------!//
//!-------------------------------------------------------------!//

//!-------------------------------------------------------------!//
//!--------------------- PUT-Start -----------------------------!//
//!-------------------------------------------------------------!//

//? Change the status of a membership for a group specified by id ?//
//PUT URL: /api/groups/:groupId/membership
router.put('/:groupId/membership',requireAuth, async (req,res)=>{
  const {groupId} = req.params
  const {memberId, status} = req.body
  const curr = req.user.id

    const theGroup = await Group.findByPk(groupId) //host

    if(!theGroup){
      res.statusCode = 404
      return res.json({"message": "Group couldn't be found"})
    }

    const theMember = await User.findOne({where:{id:memberId}})
    if(!theMember){
      res.statusCode = 400
      return res.json({
        "message": 'Validations Error',
        "errors": {
          "status": "User couldn't be found"
        }
      })
    }

    if(status === 'pending'){
      res.statusCode = 400
      return res.json({
        "message": 'Validations Error',
        "errors": {
          "status": "Cannot change a membership status to pending"
        }
      })
    }

  if(status === 'co-host'){
    if(!await isOrganizer(groupId,curr)){
      res.statusCode = 403
      return res.json({"message": "Forbidden"})
    }
  }

  if(status === 'member'){
     if(!await isOrganizer(groupId,curr) && !await isCoHost(groupId, curr)){
      res.statusCode = 403
      return res.json({"message": "Forbidden"})
    }
  }

  // const theGroup = await Group.findByPk(theEvent.groupId) //host
  // const isCoHost = await Membership.findOne({where:{groupId:theGroup.organizerId, memberId:req.user.id, status:"co-host"}})
  // if(theGroup.organizerId !== req.user.id && !isCoHost){
  //   res.statusCode = 403
  //   res.json({"message": "Forbidden"})
  // }



  // const theGroup = await Group.findByPk(groupId)
  // console.log('\n',theGroup,'\n')



  const theMembership = await Membership.findOne({where:{memberId, groupId}})
  if(!theMembership){
    res.statusCode = 404
    return res.json({
      "message": 'Validations Error',
      "errors": {
        "status": "Membership between the user and the group does not exist"
      }
    })
  }

await theMembership.set({status}).save()

const returnMember = await Membership.findOne({
  where:{groupId,memberId},
  attributes:['id','groupId', 'memberId', 'status']
})
return res.json(returnMember)
})
//? --------------------------------------------------------- ?//

//? Edit a Group ?//
//PUT URL: /api/groups/:groupId
router.put('/:groupId', requireAuth, validateGroup,  async (req,res)=>{
const {name, about, type, private, city, state} = req.body
const {groupId} = req.params
const curr = req.user.id
const theGroup = await Group.findOne({where:{id:groupId}})


if(!theGroup){
  res.statusCode = 404
  return res.json({"message":"Group couldn't be found"})
}

if(!await isOrganizer(groupId,curr)){
  res.statusCode = 403
  return res.json({"message": "Forbidden"})
}

await theGroup.set({name, about, type, private, city, state}).save()

return res.json(theGroup)
})
//? --------------------------------------------------------- ?//

//!-------------------------------------------------------------!//
//!--------------------- PUT-End -------------------------------!//
//!-------------------------------------------------------------!//

//!-------------------------------------------------------------!//
//!--------------------- DELETE-Start --------------------------!//
//!-------------------------------------------------------------!//

//? Delete membership to a group specified by id ?//
//DELETE URL: /api/groups/:groupId/membership
router.delete('/:groupId/membership', requireAuth, async (req,res)=>{
  const {groupId} = req.params
  const {memberId} = req.body
  const curr = req.user.id

  const theUser = await User.findOne({where:{id:memberId}})
  if(!theUser){
    res.statusCode = 400
    return res.json({
      "message": 'Validations Error',
      "errors": {
        "memberId": "User couldn't be found"
      }
    })
  }

  const theGroup = await Group.findByPk(groupId)
  // console.log('\n',theGroup,'\n')
  if(!theGroup){
    res.statusCode = 404
    return res.json({"message": "Group couldn't be found"})
    }
  
  const theMembership = await Membership.findOne({where:{memberId, groupId}})
  if(!theMembership){
    res.statusCode = 404
    return res.json({
      "message": "Membership does not exist for this User"
      })
  }

  if(!await isOrganizer(groupId,curr) && theMembership.memberId !== curr){
    res.statusCode = 403
    return res.json({"message": "Forbidden"})
  }
  
  theMembership.destroy()
  return res.json({"message": "Successfully deleted membership from group"})
})
//? --------------------------------------------------------- ?//

//? Delete a Group ?//
// DELETE URL: /api/groups/:groupId
router.delete('/:groupId', requireAuth, async (req,res)=>{
  const {groupId} = req.params
  const curr = req.user.id
      const theGroup = await Group.findByPk(groupId)
      if(!theGroup){
          res.statusCode = 404
          return res.json({"message": "Group couldn't be found"})
          // throw new Error("Group couldn't be found")
      }else{
        if(!await isOrganizer(groupId,curr)){
          res.statusCode = 403
          return res.json({"message": "Forbidden"})
        }
        const theImages = await Image.findAll({where:{imageableId:groupId, imageableType: 'Group'}})
        for (let image of theImages){
           await image.destroy()
        }
          // console.log('\n',theGroup,'\n')
        //! Find events by the group
        const theEvents = await Event.findAll({where:{groupId}})
        for(let event of theEvents){
          const theAttendees = await Attendee.findAll({where:{eventId:event.id}})
          for(let attendee of theAttendees){
            attendee.destroy()
          }
          event.destroy()
        }
        const theVenues = await Venue.findAll({where:{groupId}})
        for(let venue of theVenues){
          venue.destroy()
        }
        const theMembers = await Membership.findAll({where:{groupId}})
        for(let member of theMembers){
          member.destroy()
        }

         await theGroup.destroy()
         return res.json({ "message": "Successfully deleted"})
      }
  })
  //? --------------------------------------------------------- ?//
//!-------------------------------------------------------------!//
//!--------------------- DELETE-End ----------------------------!//
//!-------------------------------------------------------------!//
module.exports = router;

