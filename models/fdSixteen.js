/**
 * This contains schema initialization and 
 * model functions for the fourth form
 * October 19, 2018
 * @ver 1.0
 * @author Christian Dequito
 */

/**
 * Module dependencies.
 */
const mongoose = require("mongoose");


/**
 * Setting up FD4 Form Schema
 */
var fdSixteenSchema = mongoose.Schema({
    grantName : String,
    ownerIdNumber : String,
    dateSubmitted : Date,
    term : String, 
    startAY : Number,
    endAY : Number,
    firstName : String, 
    lastName: String,
    department : String,
    rank : String,
    status : String, //True = Permanent, False = Probationary
    nameOfOrganization : String,
    typeOfMembershipPlace : String, //true = local, false = international
    typeofMembershipDuration : String, //true = annual, false = lifetime
    membershipDate : Date,
    coverage : String,
    membershipFee : Number,
    checkPayableTo : String,
    participantFee : float, //MONEY
    //CHECK BOX
    membershipFormForOrganizationForAnnual : Boolean,
    printoutsOfOrganizationForAnnual : Boolean,
    membershipFormForOrganizationForLifetime : Boolean,
    printoutsOfOrganizationForLifetime : Boolean,
    copyOfOrganizationAnnualCoferenceAndMeetingProgram : Boolean,
    certificationFromTheProfessionalOrganization : Boolean
})

var fdSixteen = mongoose.model("fdSixteen", fdSixteenSchema)