const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, Membership, Image, Venue } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

//!------------------------------------------------------------!//
//! ------------------- VALIDATOR-Start -----------------------!//
//!------------------------------------------------------------!//

const validateVenue = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .withMessage('Latitude is not valid'),
  check('lng')
      .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
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

//!-------------------------------------------------------------!//
//!--------------------- PUT-Start -----------------------------!//
//!-------------------------------------------------------------!//

//? Edit a Venue specified by its id ?//
// PUT URL: /api/venues/:venueId
  router.put('/:venueId', requireAuth, validateVenue, async (req,res)=>{
    const curr = req.user.id
    const {venueId} = req.params
    let { address, lat, lng, city, state} = req.body
   const isVenue = await Venue.findByPk(venueId)

    if(!isVenue){
        res.statusCode = 404
        res.send({"message": "Venue couldn't be found"})
        // throw new Error("Venue couldn't be found")
    }

    const theGroup = await Group.findByPk(isVenue.groupId)
    const isCoHost = await Membership.findOne({where:{groupId:theGroup.id, memberId:curr, status: "co-host"}})

    if(theGroup.organizerId === curr || isCoHost){
      await isVenue.set({address, lat, lng, city, state,})
      await isVenue.save()
       const returnVenue = await Venue.findByPk(venueId)
       return res.json(returnVenue)
    }
    
    res.statusCode = 403
    return res.json({"message": "Forbidden"})

  })
  //? --------------------------------------------------------- ?//

//!-------------------------------------------------------------!//
//!--------------------- PUT-End -------------------------------!//
//!-------------------------------------------------------------!//

  module.exports = router;