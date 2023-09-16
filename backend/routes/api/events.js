const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, Membership, Image, Venue, Event, Attendee } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize');
const router = express.Router();


// GET URL: /api/events


//? --------------works -------------------
router.get('/', async (req,res)=>{
    const returnObj = {"Events":[]}
    let {page, size, name, type, startDate} = req.query
    let errorCount = 0
    const errorObj = {
        "message": "Bad Request",
        "errors": {}
    }

    if(page){
        page = Number(page)
        if(page < 1){
            errorObj.errors.page = 'Page must be greater than or equal to 1'
            errorCount ++
        } 
        if(page > 10) page = 10
    } else{
        page = 1
    }

    if(size){
        size = Number(size)
        if(size < 1){
            errorObj.errors.size = 'Size must be greater than or equal to 1'
            errorCount ++
        } 
        if(size > 20) size = 20
    }else{
        size = 20
    }

    if(name){
        if(typeof(name) !== 'string'){
            errorObj.errors.name = 'Name must be a string'
            errorCount ++
        }
    }

    if(type){
        if(type !== "Online" && type !== "In Person" ){
            errorObj.errors.type = "Type must be 'Online' or 'In Person"
            errorCount ++
        }
    }

    if(startDate){
        const isDate = new Date(startDate)
        console.log('\n', startDate, '\n')
        console.log('\n', isDate.toString(), '\n')
        if(isDate.toString() === 'Invalid Date' || startDate.length !== 10){
            errorObj.errors.startDate = "Start date must be a valid datetime"
            errorCount ++
        }
    }

    if(errorCount !== 0){
        res.statusCode = 400
        res.send(errorObj)
    }

    const limit = size
    const offset = ((page-1)*limit)
   

    const theEvents = await Event.findAll({limit,offset})

    for( let event of theEvents){
        const theGroup = await Group.findByPk(event.groupId)
        const theVenue = await Venue.findOne({where:{id:event.venueId}})
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
       
        if(theGroup){
            event.dataValues.Group = theGroup
        } else{
            event.dataValues.Group = null
        }

        if(theVenue){
            event.dataValues.Venue = theVenue
        } else{
            event.dataValues.Venue = null
        }


        returnObj.Events.push(event)
    }

    res.json(returnObj)
})

// GET URL: /api/events/:eventId
//! ------------------ EAGER LOAD DO THEM ALL LIKE THIS !!!-----------------
router.get('/:eventId', async (req,res)=>{
    const {eventId} = req.params
    const theEvent = await Event.findOne(
        {
            where:{id:eventId},
            include:[
                {model:Group,attributes:['id','name','private','city','state']},
                {model:Venue, attributes:['id','address','city','state','lat', 'lng']},
                {model:Image, as: 'EventImages',attributes:['id','url','preview']}
            ]
        })

       if(!theEvent){
        throw new Error("Event couldn't be found")
       } 
    
    const numAttending = await Attendee.findAll({where:{eventId:eventId, status:"attending"}})
   
    if(numAttending.length){
        theEvent.dataValues.numAttending = numAttending.length
    } else{
        theEvent.dataValues.numAttending = 0
    }
   
    res.json(theEvent)
})

//POST URL: /api/events/:eventId/images

router.post('/:eventId/images', async (req,res)=>{
    const {eventId} = req.params
    const {url, preview} = req.body
    const theEvent = await Event.findOne({where:{id:eventId}})
  
    if(theEvent){
     await Image.create({url, preview, imageableId:eventId, imageableType:'Event'})
     const sendImage = await Image.findOne({
        where:{url},
        attributes:['id','url','preview'],
    })
     res.json(sendImage)
    } else{
      res.statusCode = 404
      throw new Error("Event couldn't be found")
    }
  })

//PUT URL: /api/events/:eventId
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
      // check('endDate')
      // .exists({ checkFalsy: true })
      // .isAfter('startDate')
      // .withMessage('End date is less than start date'),
    handleValidationErrors
  ];

  //!---------END DATE NEEDS TO ERROR CORRECTLY

router.put('/:eventId',validateEvent, async (req,res)=>{
    const {name, venueId, type, capacity, price, description, startDate, endDate} = req.body
    const {eventId} = req.params
    const theEvent = await Event.findOne({where:{id:eventId}})
    const theVenue = await Venue.findByPk(venueId)

    if(!theEvent){
        throw new Error("Event couldn't be found")
    }

    if(!theVenue){
        throw new Error("Venue couldn't be found")
    }
    
    await theEvent.set({name, venueId, type, capacity, price, description, startDate, endDate})
    
    res.json(theEvent)
    
    })

    //DELETE URL: /api/events/:eventId
    router.delete('/:eventId', async (req,res)=>{
        const {eventId} = req.params
            const theEvent = await Event.findByPk(eventId)
            if(!theEvent){
                res.statusCode = 404
                throw new Error("Event couldn't be found")
            }else{
                // console.log('\n',theEvent,'\n')
                const theImages = await Image.findAll({where:{imageableId:eventId, imageableType: 'Event'}})
                for (let image of theImages){
                   await image.destroy()
                }
                const theAttendees = await Attendee.findAll({where:{eventId}})
                for (let attendee of theAttendees){
                   await attendee.destroy()
                }
               await theEvent.destroy()
               return res.json({ "message": "Successfully deleted"})
            }
        })

module.exports = router;