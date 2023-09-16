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
    const theImage = await Image.findOne({where:{imageableId:imageId, imageableType:'Event'}})

    if(!theImage){
        res.statusCode = 404
        res.json({"message": "Event Image couldn't be found"})
    }

    const theEvent = await Event.findByPk(imageId)
    const theGroup = await Group.findByPk(theEvent.groupId)
    const theMembership = await Membership.findOne({where:{memberId:req.user.id}})

    if(theGroup.organizerId !== req.user.id &&  theMembership.status !== 'co-host'){
        res.statusCode = 404
        res.send({"message": "Event Image couldn't be found"})
    }

    const isCoHost = await Membership.findOne({where:{groupId:theGroup.organizerId, memberId:req.user.id, status:"co-host"}})
    if(theGroup.organizerId !== req.user.id && !isCoHost){
      res.statusCode = 403
      res.json({"message": "Forbidden"})
    }

    theImage.destroy()
    res.json({"message": "Successfully deleted"})

})

module.exports = router;