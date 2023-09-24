const express = require('express')
const bcrypt = require('bcryptjs');
const { User, Group, Membership, Image, Venue, Event, Attendee } = require('../db/models');

const isOrganizer = async (group, user) =>{
const theGroup = await Group.findByPk(group)
if(theGroup.organizerId === user) return true
return false
}

const isCoHost = async (group, user) =>{
const check = await Membership.findOne({where:{'groupId':group, 'memberId':user}})
if(check && check.status === "co-host"){
    return true
}
return false
}

const isMember = async (group, user) =>{
const check = await Membership.findOne({where:{'groupId':group, 'memberId':user}})
if(check && check.status === "member"){
    return true
}
return false
}

// console.log( isOrganizer(1,1)) //true 
// console.log( isOrganizer(1,2)) //false 
// console.log( isOrganizer(2,1)) //false 
// console.log( isOrganizer(2,2)) //true 

module.exports = { isOrganizer, isCoHost, isMember };