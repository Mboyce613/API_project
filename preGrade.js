//?------------------------------------------
//? General Fixes:
// numMembers should default to 1 as I would consider the organizer as a member
// When displaying any group details

// Add additional validation to check that Group.name exists (should be required)
// When creating / editing Groups

// Clean up response objects as some have additional information than is required. Check the API docs again to match
// I.e. Get all Events route, Get all Events by Group Id, Get Details by Event Id
// Include more seed data to test if you are NOT the organizer, return only members without status of “pending”
//?-----------------------------------------------

//?----------------------------------------------
//? Route Fixes:

//// Sign Up a User
//// On an error response
//// Getting error message “Validation error” instead of “User already exists”
//// When inputting empty values for firstName, lastName, email, only getting 1 error message for email rather than 3

//// Create a Group
//// On a successful response
//// Change status code from 200 → 201 when creating new entities

//// On an error response
//// Not getting appropriate error response (check API docs)

//// Input data:
//// {
////   "name": "hey",
////   "about": "E",
////   "type": "test",
////   "private": 123,
////   "city": "",
////   "state": ""
//// }

//// Response:
//// {
////     "message": "Validation error: Validation isIn on type failed",
////     "errors": {
////         "type": "Validation isIn on type failed"
////     }
//// }


// Get Details of Group by Id:
// On a successful response
// Match response to API docs (included extra info that is not needed)
// I.e. including hashedPassword under Organizer

// Edit a Group that doesn’t exist:
// On an error response
// Getting “Cannot read property ‘organizerId’ of null” instead of “Group couldn’t be found”

// Create a New Venue for a Group by Id:
// On an error response
// Include validation error messaging for lat / lng when giving non numeric values

// Edit a Venue by Id:
// On a successful response
// It returns the unedited venue as the response (no changes made)

// Create an Event by Group Id:
// On an error response
// No validation message for when endDate starts before startDate

// Edit an Event:
// On an error response
// No validation message for when venue does not exist and if endDate is less than startDate

// Change status of Membership by Group Id:
// On an error response
// Getting “Cannot read property ‘organizerId’ of null” vs “User couldn’t be found” when group id / member id / membership is not found

// Get All Members by Group Id:
// Getting error “Assignment to constant variable’

// Request to Attend an Event by Id:
// Getting a Forbidden error when requesting to attend an event

// Delete routes:
// Seem to be broken and getting “... could not be found” errors. Could be associated with retrieving all members error above 
//?----------------------------------------------------

