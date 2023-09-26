const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, Membership, Image, Venue, Event, Attendee } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize');
const router = express.Router();

//Delete URL: /api/event-images/:imageId
router.delete('/:imageId',requireAuth, async (req,res)=>{
    const {imageId} = req.params
    const theImage = await Image.findByPk(imageId)

    if(!theImage){
        res.statusCode = 404
        return res.json({"message": "Event Image couldn't be found"})
    }

    const theEvent = await Event.findByPk(theImage.imageableId)

    if(!theEvent){
        res.statusCode = 404
       return  res.json({"message": "Image could not be found"})
    }

    const theGroup = await Group.findByPk(theEvent.groupId)

    if(!theGroup){
        res.statusCode = 404
        return res.json({"message": "Image could not be found"})
    }

    const theMembership = await Membership.findOne({where:{memberId:req.user.id, groupId: theGroup.id}})
    if(theMembership){
        if(theGroup.organizerId !== req.user.id &&  theMembership.status !== 'co-host'){
            res.statusCode = 403
           return  res.json({"message": "Forbidden"})
        }
        
        await theImage.destroy()
       return  res.json({"message": "Successfully deleted"})

    }


    // const isCoHost = await Membership.findOne({where:{groupId:theGroup.id, memberId:req.user.id, status:"co-host"}})
    if(theGroup.organizerId !== req.user.id ){
      res.statusCode = 403
      return res.json({"message": "Forbidden"})
    }

    await theImage.destroy()
    return res.json({"message": "Successfully deleted"})

})

module.exports = router;