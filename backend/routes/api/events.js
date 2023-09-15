const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, Membership, Image, Venue, Event, Attendee } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


// GET URL: /api/events
//? --------------works -------------------
router.get('/', async (req,res)=>{
    const returnObj = {"Events":[]}
    const theEvents = await Event.findAll()

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

module.exports = router;