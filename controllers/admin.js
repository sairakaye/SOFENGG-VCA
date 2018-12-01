/**
 * This controller is for users with 
 * administrative rights to the system.
 * October 18, 2018
 * @ver 1.0
 * @author Candace Mercado
 */

/**
 * Module dependencies.
 */
const express = require("express")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const moment = require("moment")
const urlencoder = bodyparser.urlencoded({
    extended: true
})
const router = express.Router()
router.use(urlencoder)
const app = express()
const nodemailer = require('nodemailer')

const User = require("../models/user")
const Mailer = require("../models/mailer")
const fdOne = require("../models/fdOne")
const fdTwo = require("../models/fdTwo")
const fdThree = require("../models/fdThree")
const fdFour = require("../models/fdFour")
const fdFifteen = require("../models/fdFifteen")
const fdSixteen = require("../models/fdSixteen")
const Remark = require("../models/remark")
var forms

/**
 * Leads to the page for requesting grants 
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/view-grants", function (req, res) {
    console.log("GET /view-grants")

    var user = req.session.user
    if (user.userType != 'Administrator')
        res.redirect("/")
    
    if(user){
        forms = getAllForms(function(forms){
            if (forms == ""){
                res.render("view-grants.hbs", {
                    user
                })
            } else {
                res.render("view-grants.hbs", {
                    user, forms
                })
            }
        })
    } else {
        res.redirect("/")
    }
})

/**
 * Views details based on form id
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/view-details", urlencoder, function (req, res) {
    console.log("POST /view-details")

    var user = req.session.user
    if (user.userType != 'Administrator')
        res.redirect("/")

    var id = req.body.details

    if (user != null) {
        var forms = getFormById(id, function (forms) {
            if (forms.grantName == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal") {
                var fdOneData = forms

                Remark.getRemarksFromForm(fdOneData).then((foundRemarks) => {
                    res.render("preview-form1.hbs", {
                        user, fdOneData, adminAccess: "True", remarks: foundRemarks,
                        formID: fdOneData._id, grant: fdOneData.grantName
                    })
                }, (err) => {
                    res.send(err)
                })
            } else if (forms.grantName == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences") {
                var fdTwoData = forms

                Remark.getRemarksFromForm(fdTwoData).then((foundRemarks) => {
                    res.render("preview-form2.hbs", {
                        user, fdTwoData, adminAccess: "True", remarks: foundRemarks,
                        formID: fdTwoData._id, grant: fdTwoData.grantName
                    })
                }, (err) => {
                    res.send(err)
                })
            } else if (forms.grantName == "[FD3] Support for Paper Presentations in Conferences") {
                var fdThreeData = forms

                Remark.getRemarksFromForm(fdThreeData).then((foundRemarks) => {
                    res.render("preview-form3.hbs", {
                        user, fdThreeData, adminAccess: "True", remarks: foundRemarks,
                        formID: fdThreeData._id, grant: fdThreeData.grantName
                    })
                }, (err) => {
                    res.send(err)
                })
            } else if (forms.grantName == "[FD4] Support for Participation in Local Conferences") {
                var fdFourData = forms

                Remark.getRemarksFromForm(fdFourData).then((foundRemarks) => {
                    res.render("preview-form4.hbs", {
                        user, fdFourData, adminAccess: "True", remarks: foundRemarks,
                        formID: fdFourData._id, grant: fdFourData.grantName
                    })
                }, (err) => {
                    res.send(err)
                })
            } else if (forms.grantName == "[FD15] Support for Local Trainings, Seminars and Workshops") {
                var fdFifteenData = forms

                Remark.getRemarksFromForm(fdFifteenData).then((foundRemarks) => {
                    res.render("preview-form15.hbs", {
                        user, fdFifteenData, adminAccess: "True", remarks: foundRemarks,
                        formID: fdFifteenData._id, grant: fdFifteenData.grantName
                    })
                }, (err) => {
                    res.send(err)
                })
            } else if (forms.grantName == "[FD16] Support for Membership in Professional Organizations") {
                var fdSixteenData = forms

                Remark.getRemarksFromForm(fdSixteenData).then((foundRemarks) => {
                    res.render("preview-form16.hbs", {
                        user, fdSixteenData, adminAccess: "True", remarks: foundRemarks,
                        formID: fdSixteenData._id, grant: fdSixteenData.grantName
                    })
                }, (err) => {
                    res.send(err)
                })
            }
        })
    } else {
        res.redirect("/")
    }
})

/**
 * Change status of the form
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/change-status", urlencoder, function (req, res) {
    console.log("POST /change-status")

    var currentStatus = req.body.currentStatus
    var status = req.body.status
    var id = req.body.formID
    var grant = req.body.grant
    var remark = req.body.remark

    var statusMessage = ""

    if (status == "Approved" || status == "Rejected" || status == "Pending")
        statusMessage = "Changed to " + status
    else
        statusMessage = currentStatus

    var remarkObj = {
        formId: id, status: statusMessage, remark
    }

    if (status == "Approved" || status == "Rejected" || status == "Pending") {
        if (grant == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal") {
            fdOne.getFDOneByID(id).then((foundForm) => {
                if (foundForm.status !== status) {
                    fdOne.changeStatusFDOne(id, status).then((foundFDOne) => {
                        User.changeStatusFDOneInUser(foundFDOne).then((updatedUser) => {
                            Remark.create(remarkObj).then((newRemark) => {
                                fdOne.addRemarkInFDOne(newRemark).then(() => {
                                    Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {
                                        
                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: newMailer.emailAddress,
                                                pass: newMailer.password
                                            }
                                        })
                                        
                                        var mailOptions = {
                                            from: newMailer.emailAddress,
                                            to: updatedUser.emailAddress,
                                            subject: "[OVCA]",
                                            text: foundFDOne.formId +" of "+foundFDOne.grantName+ " has been " + status + "! " +
                                            newRemark.remark
                                        }
                                        
                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Email sent: ' + info.response);
                                            }
                                        })
                                        
                                        res.send(newRemark)
                                    }, (err) => {
                                        res.send(err)
                                    })
                                })
                            })
                        })
                    })
                } else {
                    res.send(foundForm)
                }
            })
        }
        else if (grant == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences") {
            fdTwo.getFDTwoByID(id).then((foundForm) => {
                if (foundForm.status !== status) {
                    fdTwo.changeStatusFDTwo(id, status).then((foundFDTwo) => {
                        User.changeStatusFDTwoInUser(foundFDTwo, status).then((updatedUser) => {
                            Remark.create(remarkObj).then((newRemark) => {
                                fdTwo.addRemarkInFDTwo(newRemark).then(() => {
                                    Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {
                                        
                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: newMailer.emailAddress,
                                                pass: newMailer.password
                                            }
                                        })
                                        
                                        var mailOptions = {
                                            from: newMailer.emailAddress,
                                            to: updatedUser.emailAddress,
                                            subject: "[OVCA]",
                                            text: foundFDTwo.formId +" of "+foundFDTwo.grantName+ " has been " + status + "! " +
                                            newRemark.remark
                                        }
                                        
                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Email sent: ' + info.response);
                                            }
                                        })
                                        
                                        res.send(newRemark)
                                    }, (err) => {
                                        res.send(err)
                                    })
                                })
                            })
                        })
                    })
                } else {
                    res.send(foundForm)
                }
            })
        }
        else if (grant == "[FD3] Support for Paper Presentations in Conferences") {
            fdThree.getFDThreeByID(id).then((foundForm) => {
                if (foundForm.status !== status) {
                    fdThree.changeStatusFDThree(id, status).then((foundFDThree) => {
                        User.changeStatusFDThreeInUser(foundFDThree, status).then((updatedUser) => {
                            Remark.create(remarkObj).then((newRemark) => {
                                fdThree.addRemarkInFDThree(newRemark).then(() => {
                                    Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {
                                        
                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: newMailer.emailAddress,
                                                pass: newMailer.password
                                            }
                                        })
                                        
                                        var mailOptions = {
                                            from: newMailer.emailAddress,
                                            to: updatedUser.emailAddress,
                                            subject: "[OVCA]",
                                            text: foundFDThree.formId +" of "+foundFDThree.grantName+ " has been " + status + "! " +
                                            newRemark.remark
                                        }
                                        
                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Email sent: ' + info.response);
                                            }
                                        })
                                        
                                        res.send(newRemark)
                                    }, (err) => {
                                        res.send(err)
                                    })
                                })
                            })
                        })
                    })
                } else {
                    res.send(foundForm)
                }
            })


        }
        else if (grant == "[FD4] Support for Participation in Local Conferences") {
            fdFour.getFDFourByID(id).then((foundForm) => {
                if (foundForm.status !== status) {
                    fdFour.changeStatusFDFour(id, status).then((foundFDFour) => {
                        User.changeStatusFDFourInUser(foundFDFour, status).then((updatedUser) => {
                            Remark.create(remarkObj).then((newRemark) => {
                                fdFour.addRemarkInFDFour(newRemark).then(() => {
                                    Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {
                                        
                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: newMailer.emailAddress,
                                                pass: newMailer.password
                                            }
                                        })
                                        
                                        var mailOptions = {
                                            from: newMailer.emailAddress,
                                            to: updatedUser.emailAddress,
                                            subject: "[OVCA]",
                                            text: foundFDFour.formId +" of "+foundFDFour.grantName+ " has been " + status + "! " +
                                            newRemark.remark
                                        }
                                        
                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Email sent: ' + info.response);
                                            }
                                        })
                                        
                                        res.send(newRemark)
                                    }, (err) => {
                                        res.send(err)
                                    })
                                })
                            })
                        })
                    })
                } else {
                    res.send(foundForm)
                }
            })
        }
        else if (grant == "[FD15] Incentive for Publication in Pre-Selected High Impact Journal") {
            fdFifteen.getFDFifteenByID(id).then((foundForm) => {
                if (foundForm.status !== status) {
                    fdFifteen.changeStatusFDFifteen(id, status).then((foundFDFifteen) => {
                        User.changeStatusFDFifteenInUser(foundFDFifteen, status).then((updatedUser) => {
                            Remark.create(remarkObj).then((newRemark) => {
                                fdFifteen.addRemarkInFDFifteen(newRemark).then(() => {
                                    Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {
                                        
                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: newMailer.emailAddress,
                                                pass: newMailer.password
                                            }
                                        })
                                        
                                        var mailOptions = {
                                            from: newMailer.emailAddress,
                                            to: updatedUser.emailAddress,
                                            subject: "[OVCA]",
                                            text: foundFDFifteen.formId +" of "+foundFDFifteen.grantName+ " has been " + status + "! " +
                                            newRemark.remark
                                        }
                                        
                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Email sent: ' + info.response);
                                            }
                                        })
                                        
                                        res.send(newRemark)
                                    }, (err) => {
                                        res.send(err)
                                    })
                                })
                            })
                        })
                    })
                } else {
                    res.send(foundForm)
                }
            })
        }
        else if (grant == "[FD16] Support for Membership in Professional Organizations") {
            fdSixteen.getFDSixteenByID(id).then((foundForm) => {
                if (foundForm.status !== status) {
                    fdSixteen.changeStatusFDSixteen(id, status).then((foundFDSixteen) => {
                        User.changeStatusFDSixteenInUser(foundFDSixteen).then((updatedUser) => {
                            Remark.create(remarkObj).then((newRemark) => {
                                fdSixteen.addRemarkInFDSixteen(newRemark).then(() => {
                                    Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {
                                        
                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: newMailer.emailAddress,
                                                pass: newMailer.password
                                            }
                                        })
                                        
                                        var mailOptions = {
                                            from: newMailer.emailAddress,
                                            to: updatedUser.emailAddress,
                                            subject: "[OVCA]",
                                            text: foundFDSixteen.formId +" of "+foundFDSixteen.grantName+ " has been " + status + "! " +
                                            newRemark.remark
                                        }
                                        
                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Email sent: ' + info.response);
                                            }
                                        })
                                        
                                        res.send(newRemark)
                                    }, (err) => {
                                        res.send(err)
                                    })
                                })
                            })
                        })
                    })
                } else {
                    res.send(foundForm)
                }
            })

        }
    } else if (remarkObj !== null) {
        if (grant == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal") {
            Remark.create(remarkObj).then((newRemark) => {
                fdOne.addRemarkInFDOne(newRemark).then(() => {
                    res.send(newRemark)
                })
            })
        }
        else if (grant == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences") {
            Remark.create(remarkObj).then((newRemark) => {
                fdTwo.addRemarkInFDTwo(newRemark).then(() => {
                    res.send(newRemark)
                })
            })
        }
        else if (grant == "[FD3] Support for Paper Presentations in Conferences") {
            Remark.create(remarkObj).then((newRemark) => {
                fdThree.addRemarkInFDThree(newRemark).then(() => {
                    res.send(newRemark)
                })
            })
        }
        else if (grant == "[FD4] Support for Participation in Local Conferences") {
            Remark.create(remarkObj).then((newRemark) => {
                fdFour.addRemarkInFDFour(newRemark).then(() => {
                    res.send(newRemark)
                })
            })
        }
        else if (grant == "[FD15] Incentive for Publication in Pre-Selected High Impact Journal") {
            Remark.create(remarkObj).then((newRemark) => {
                fdFifteen.addRemarkInFDFifteen(newRemark).then(() => {
                    res.send(newRemark)
                })
            })
        }
        else if (grant == "[FD16] Support for Membership in Professional Organizations") {
            Remark.create(remarkObj).then((newRemark) => {
                fdSixteen.addRemarkInFDSixteen(newRemark).then(() => {
                    res.send(newRemark)
                })
            })
        }
    }
})

/**
 * Deletes a grant request form
 *
 * @param {Request} req
 * @param {Response} res
 */
router.delete("/delete-remark", urlencoder, (req, res) => {
    console.log("POST /delete-remark " + req.body.id)

    var grant = req.body.grant
    var formID = req.body.formID
    var remarkID = req.body.id

    if (grant == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal") {
        Remark.getRemark(formID, remarkID).then((foundRemark)=> {
            fdOne.deleteRemarkInFDOne(foundRemark).then((deletedRemark)=> {
                Remark.delete(remarkID).then((deletedResult)=> {
                    res.send(deletedResult)
                })
            }, (err)=> {
                res.send(err)
            })
        })
    }
    else if (grant == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences") {
        Remark.getRemark(formID, remarkID).then((foundRemark)=> {
            fdTwo.deleteRemarkInFDTwo(foundRemark).then((deletedRemark)=> {
                Remark.delete(remarkID).then((deletedResult)=> {
                    res.send(deletedResult)
                })
            }, (err)=> {
                res.send(err)
            })
        })
    }
    else if (grant == "[FD3] Support for Paper Presentations in Conferences") {
        Remark.getRemark(formID, remarkID).then((foundRemark)=> {
            fdThree.deleteRemarkInFDThree(foundRemark).then((deletedRemark)=> {
                Remark.delete(remarkID).then((deletedResult)=> {
                    res.send(deletedResult)
                })
            }, (err)=> {
                res.send(err)
            })
        })
    }
    else if (grant == "[FD4] Support for Participation in Local Conferences") {
        Remark.getRemark(formID, remarkID).then((foundRemark)=> {
            fdFour.deleteRemarkInFDFour(foundRemark).then((deletedRemark)=> {
                Remark.delete(remarkID).then((deletedResult)=> {
                    res.send(deletedResult)
                })
            }, (err)=> {
                res.send(err)
            })
        })
    }
    else if (grant == "[FD15] Incentive for Publication in Pre-Selected High Impact Journal") {
        Remark.getRemark(formID, remarkID).then((foundRemark)=> {
            fdFifteen.deleteRemarkInFDFifteen(foundRemark).then((deletedRemark)=> {
                Remark.delete(remarkID).then((deletedResult)=> {
                    res.send(deletedResult)
                })
            }, (err)=> {
                res.send(err)
            })
        })
    }
    else if (grant == "[FD16] Support for Membership in Professional Organizations") {
        Remark.getRemark(formID, remarkID).then((foundRemark)=> {
            fdSixteen.deleteRemarkInFDSixteen(foundRemark).then((deletedRemark)=> {
                Remark.delete(remarkID).then((deletedResult)=> {
                    res.send(deletedResult)
                })
            }, (err)=> {
                res.send(err)
            })
        })
    }
})

/**
 * Deletes a grant request form
 *
 * @param {Request} req
 * @param {Response} res
 */
router.delete("/delete-form", urlencoder, (req, res) => {
    console.log("POST /delete-form " + req.body.id)

    var grant = req.body.grant
    var id = req.body.id

    if (grant == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal") {
        fdOne.getFDOneByID(id).then((foundFDOne) => {
            User.deleteFDOneInUser(foundFDOne).then((updatedUser) => {
                fdOne.delete(req.body.id).then((result) => {
                    res.send(result)
                })
            })
        })
    }
    else if (grant == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences") {
        fdTwo.getFDTwoByID(id).then((foundFDTwo) => {
            User.deleteFDTwoInUser(foundFDTwo).then((updatedUser) => {
                fdTwo.delete(req.body.id).then((result) => {
                    res.send(result)
                })
            })
        })
    }
    else if (grant == "[FD3] Support for Paper Presentations in Conferences") {
        fdThree.getFDThreeByID(id).then((foundFDThree) => {
            User.deleteFDThreeInUser(foundFDThree).then((updatedUser) => {
                fdThree.delete(req.body.id).then((result) => {
                    res.send(result)
                })
            })
        })
    }
    else if (grant == "[FD4] Support for Participation in Local Conferences") {
        fdFour.getFDFourByID(id).then((foundFDFour) => {
            User.deleteFDFourInUser(foundFDFour).then((updatedUser) => {
                fdFour.delete(req.body.id).then((result) => {
                    res.send(result)
                })
            })
        })
    }
    else if (grant == "[FD15] Support for Local Trainings, Seminars and Workshops") {
        fdFifteen.getFDFifteenByID(id).then((foundFDFifteen) => {
            User.deleteFDFifteenInUser(foundFDFifteen).then((updatedUser) => {
                fdFifteen.delete(req.body.id).then((result) => {
                    res.send(result)
                })
            })
        })
    }
    else if (grant == "[FD16] Support for Membership in Professional Organizations") {
        fdSixteen.getFDSixteenByID(id).then((foundFDSixteen) => {
            User.deleteFDSixteenInUser(foundFDSixteen).then((updatedUser) => {
                fdSixteen.delete(req.body.id).then((result) => {
                    res.send(result)
                })
            })
        })
    }

})

/**
 * Approves a grant request form
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/approveform", urlencoder, (req, res) => {
    console.log("POST /approveform " + req.body.id)
    
    var grant = req.body.grant
    var id = req.body.id
    
    if (grant == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal") {
        fdOne.approveFDOne(id).then((foundFDOne) => {
            User.changeStatusFDOneInUser(foundFDOne, "Approve").then((updatedUser) => {
                Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {
                    
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: newMailer.emailAddress,
                            pass: newMailer.password
                        }
                    })
                    
                    var mailOptions = {
                        from: newMailer.emailAddress,
                        to: updatedUser.emailAddress,
                        subject: "[OVCA]",
                        text: foundFDOne.formId +" of "+foundFDOne.grantName+ " has been approved!"
                    }
                    
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    })
                    
                    res.send(updatedUser)
                }, (err) => {
                    res.send(err)
                })
            })
        })
    }
    else if (grant == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences") {
        fdTwo.approveFDTwo(id).then((foundFDTwo) => {
            User.approveFDTwoInUser(foundFDTwo).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }
    else if (grant == "[FD3] Support for Paper Presentations in Conferences") {
        fdThree.approveFDThree(id).then((foundFDThree) => {
            User.approveFDThreeInUser(foundFDThree).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }
    else if (grant == "[FD4] Support for Participation in Local Conferences") {
        fdFour.approveFDFour(id).then((foundFDFour) => {
            User.approveFDFourInUser(foundFDFour).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }
    else if (grant == "[FD15] Incentive for Publication in Pre-Selected High Impact Journal") {
        fdFifteen.approveFDFifteen(id).then((foundFDFifteen) => {
            User.approveFDFifteenInUser(foundFDFifteen).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }
    else if (grant == "[FD16] Support for Membership in Professional Organizations") {
        fdSixteen.approveFDSixteen(id).then((foundFDSixteen) => {
            User.approveFDSixteenInUser(foundFDSixteen).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }

})

/**
 * Rejects a grant request form
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/rejectform", urlencoder, (req, res) => {
    console.log("POST /rejectform " + req.body.id)

    var grant = req.body.grant
    var id = req.body.id

    if (grant == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal") {
        fdOne.rejectFDOne(id).then((foundFDOne) => {
            User.rejectFDOneInUser(foundFDOne).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }
    else if (grant == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences") {
        fdTwo.rejectFDTwo(id).then((foundFDTwo) => {
            User.rejectFDTwoInUser(foundFDTwo).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }
    else if (grant == "[FD3] Support for Paper Presentations in Conferences") {
        fdThree.rejectFDThree(id).then((foundFDThree) => {
            User.rejectFDThreeInUser(foundFDThree).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }
    else if (grant == "[FD4] Support for Participation in Local Conferences") {
        fdFour.rejectFDFour(id).then((foundFDFour) => {
            User.rejectFDFourInUser(foundFDFour).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }
    else if (grant == "[FD15] Incentive for Publication in Pre-Selected High Impact Journal") {
        fdFifteen.rejectFDFifteen(id).then((foundFDFifteen) => {
            User.rejectFDFifteenInUser(foundFDFifteen).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }
    else if (grant == "[FD16] Support for Membership in Professional Organizations") {
        fdSixteen.rejectFDSixteen(id).then((foundFDSixteen) => {
            User.rejectFDSixteenInUser(foundFDSixteen).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }

})



module.exports = router

/**
 * Gets all forms
 *
 * @param {Callback function} callback
 */
function getAllForms(callback) {

    fdOne.getAllFDOne().then((fdOneData) => {
        forms = fdOneData
        fdTwo.getAllFDTwo().then((fdTwoData) => {
            forms = forms.concat(fdTwoData)
            fdThree.getAllFDThree().then((fdThreeData) => {
                forms = forms.concat(fdThreeData)
                fdFour.getAllFDFour().then((fdFourData) => {
                    forms = forms.concat(fdFourData)
                    fdFifteen.getAllFDFifteen().then((fdFifteenData) => {
                        forms = forms.concat(fdFifteenData)
                        fdSixteen.getAllFDSixteen().then((fdSixteenData) => {
                            forms = forms.concat(fdSixteenData)
                            callback(forms)
                        })
                    })
                })
            })
        })
    })
}

/**
 * Compares two values from the .hbs files for ease of
 *  display and acts like an if-else condition function
 *
 * @param {options} options.fn
 * @param {options} options.inverse
 */
hbs.registerHelper('checkstatus', function (p1, p2, options) {
    if (p1 == p2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
})

/**
 * For formating of date with the time.
 * 
 * @param {Date} date  
 */
hbs.registerHelper('formatDateTime', function (date) {
    var momentDate = moment(date);
    return momentDate.format("MMMM D, YYYY h:mm A");
})

/**
 * For formating of date.
 * 
 * @param {Date} date  
 */
hbs.registerHelper('formatDate', function (date) {
    var momentDate = moment(date);
    return momentDate.format("MMMM D, YYYY");
})

/**
 * Gets a form (By ID)
 *
 * @param {Filter} id
 * @param {Callback function} callback
 */
function getFormById(id, callback) {

    fdOne.getFDOneByID(id).then((fdOneData) => {
        forms = fdOneData
        if (forms != null)
            callback(forms)
        fdTwo.getFDTwoByID(id).then((fdTwoData) => {
            forms = fdTwoData
            if (forms != null)
                callback(forms)
            fdThree.getFDThreeByID(id).then((fdThreeData) => {
                forms = fdThreeData
                if (forms != null)
                    callback(forms)
                fdFour.getFDFourByID(id).then((fdFourData) => {
                    forms = fdFourData
                    if (forms != null)
                        callback(forms)
                    fdFifteen.getFDFifteenByID(id).then((fdFifteenData) => {
                        forms = fdFifteenData
                        if (forms != null)
                            callback(forms)
                        fdSixteen.getFDSixteenByID(id).then((fdSixteenData) => {
                            forms = fdSixteenData
                            if (forms != null)
                                callback(forms)
                        })
                    })
                })
            })
        })
    })
} 

/**
 * Gets the form with the id being requested, this is 
 * used in exporting the form as pdf file.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/saveform", urlencoder, (req, res) => {
    console.log("GET /saveform ")
  
    var id = req.query.id
  
    var forms = getFormById(id, function (forms) {
      res.send(forms)
    })
  })