const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, Membership, Image, Venue } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// PUT URL: /api/venues/:venueId
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
  
  //? ---------------- Works ----------------
  router.put('/:venueId',validateVenue, requireAuth, async (req,res)=>{
    const {venueId} = req.params
    let { address, lat, lng, city, state} = req.body
   const isVenue = await Venue.findByPk(venueId)

    if(!isVenue){
        res.statusCode = 404
        throw new Error("Venue couldn't be found")
    }

   await isVenue.set({address, lat, lng, city, state,})
    const returnVenue = await Venue.findByPk(venueId)
    res.json(returnVenue)
  
  })

  module.exports = router;