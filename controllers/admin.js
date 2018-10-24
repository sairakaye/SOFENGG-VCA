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
const urlencoder = bodyparser.urlencoded({
  extended : true
})
const router = express.Router()
router.use(urlencoder)
const app = express()
   
const User = require("../models/user")
const fdOne = require("../models/fdOne")
const fdTwo = require("../models/fdTwo")
const fdThree = require("../models/fdThree")
const fdFour = require("../models/fdFour")
const fdFifteen = require("../models/fdFifteen")
const fdSixteen = require("../models/fdSixteen")
const controllerUser = require("./index")

var forms

/**
 * Leads to the page for requesting grants 
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/view-grants", function(req, res, callback){
    console.log("GET /view-grants")
    
    var user = controllerUser.getCurrentUser() 
    forms = getAllForms(function(forms){
        res.render("view-grants.hbs", {
            user, forms
        })
    })

})

router.get("/filterApproved", function(req, res){
    console.log("GET /filterApproved")

    var user = controllerUser.getCurrentUser() 
    var statusFilter = 'Approved'
    var forms = filterAllFormsByStatus(statusFilter, function(forms){
        res.render("view-grants.hbs", {
            user, forms, statusFilter
        })
    })
})


router.get("/filterPending", function(req, res){
  console.log("GET /filterPending")

  var user = controllerUser.getCurrentUser() 
  var statusFilter = 'Pending'
  var forms = filterAllFormsByStatus(statusFilter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, statusFilter
      })
  })
})

router.get("/filterRejected", function(req, res){
  console.log("GET /filterRejected")

  var user = controllerUser.getCurrentUser() 
  var statusFilter = 'Rejected'
  var forms = filterAllFormsByStatus(statusFilter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, statusFilter
      })
  })
})

router.get("/filterCED", function(req, res){
  console.log("GET /filterCED")

  var user = controllerUser.getCurrentUser() 
  var departmentFilter = 'College of Education'
  var forms = filterAllFormsByDepartment(departmentFilter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, departmentFilter
      })
  })
})

router.get("/filterCCS", function(req, res){
  console.log("GET /filterCCS")

  var user = controllerUser.getCurrentUser() 
  var departmentFilter = 'College of Computer Studies'
  var forms = filterAllFormsByDepartment(departmentFilter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, departmentFilter
      })
  })
})

router.get("/filterCOL", function(req, res){
  console.log("GET /filterCOL")

  var user = controllerUser.getCurrentUser() 
  var departmentFilter = 'College of Law'
  var forms = filterAllFormsByDepartment(departmentFilter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, departmentFilter
      })
  })
})

router.get("/filterCLA", function(req, res){
  console.log("GET /filterCLA")

  var user = controllerUser.getCurrentUser() 
  var departmentFilter = 'College of Liberal Arts'
  var forms = filterAllFormsByDepartment(departmentFilter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, departmentFilter
      })
  })
})

router.get("/filterCOS", function(req, res){
  console.log("GET /filterCOS")

  var user = controllerUser.getCurrentUser() 
  var departmentFilter = 'College of Science'
  var forms = filterAllFormsByDepartment(departmentFilter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, departmentFilter
      })
  })
})

router.get("/filterCOE", function(req, res){
  console.log("GET /filterCOE")

  var user = controllerUser.getCurrentUser() 
  var departmentFilter = 'College of Engineering'
  var forms = filterAllFormsByDepartment(departmentFilter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, departmentFilter
      })
  })
})

router.get("/filterCOB", function(req, res){
  console.log("GET /filterCOB")

  var user = controllerUser.getCurrentUser() 
  var departmentFilter = 'College of Business'
  var forms = filterAllFormsByDepartment(departmentFilter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, departmentFilter
      })
  })
})

router.get("/filterSOE", function(req, res){
  console.log("GET /filterSOE")

  var user = controllerUser.getCurrentUser() 
  var departmentFilter = 'School of Economics'
  var forms = filterAllFormsByDepartment(departmentFilter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, departmentFilter
      })
  })
})

router.get("/filterFD1", function(req, res){
  console.log("GET /filterFD1")

  var user = controllerUser.getCurrentUser() 
  var formFilter = 'FD1'
  
  fdOne.getAllFDOne().then((forms)=>{
      res.render("view-grants.hbs", {
          user, forms, formFilter
      })
  })
})

router.get("/filterFD2", function(req, res){
  console.log("GET /filterFD2")

  var user = controllerUser.getCurrentUser() 
  var formFilter = 'FD2'
  
  fdTwo.getAllFDTwo().then((forms)=>{
      res.render("view-grants.hbs", {
          user, forms, formFilter
      })
  })
})

router.get("/filterFD3", function(req, res){
  console.log("GET /filterFD3")

  var user = controllerUser.getCurrentUser() 
  var formFilter = 'FD3'
  
  fdThree.getAllFDThree().then((forms)=>{
      res.render("view-grants.hbs", {
          user, forms, formFilter
      })
  })
})

router.get("/filterFD4", function(req, res){
  console.log("GET /filterFD4")

  var user = controllerUser.getCurrentUser() 
  var formFilter = 'FD4'
  
  fdFour.getAllFDFour().then((forms)=>{
      res.render("view-grants.hbs", {
          user, forms, formFilter
      })
  })
})

router.get("/filterFD15", function(req, res){
  console.log("GET /filterFD15")

  var user = controllerUser.getCurrentUser() 
  var formFilter = 'FD15'
  
  fdFifteen.getAllFDFifteen().then((forms)=>{
      res.render("view-grants.hbs", {
          user, forms, formFilter
      })
  })
})

router.get("/filterFD16", function(req, res){
  console.log("GET /filterFD16")

  var user = controllerUser.getCurrentUser() 
  var formFilter = 'FD16'
  
  fdSixteen.getAllFDSixteen().then((forms)=>{
      res.render("view-grants.hbs", {
          user, forms, formFilter
      })
  })
})

router.post("/searchName", function(req, res){
    console.log("POST /searchName")
    
    var firstName =req.body.firstNameSearch
    var lastName = req.body.lastNameSearch
    
    firstName = firstName.toLowerCase().split(' ');
    for (var i = 0; i < firstName.length; i++) {
        firstName[i] = firstName[i].charAt(0).toUpperCase() + firstName[i].slice(1); 
    }
    firstName =  firstName.join(' ');
    
    lastName = lastName.toLowerCase().split(' ');
    for (var i = 0; i < lastName.length; i++) {
        lastName[i] = lastName[i].charAt(0).toUpperCase() + lastName[i].slice(1); 
    }
    lastName =  lastName.join(' ');

    console.log(firstName)
    console.log(lastName)
    var user = controllerUser.getCurrentUser() 
    
    if(firstName != "" && lastName != ""){ 
        var forms = filterAllFormsByLastName(firstName, lastName, function(forms){
            if(forms != null){
                res.render("view-grants.hbs", {
                    user, forms
                })
            }else{
                fdOne.getAllFDOne().then((fdOneData)=>{
                    forms = fdOneData
                    res.render("view-grants.hbs", {
                        user, forms,
                        error : "Name not found"
                    })
                })
            }
        })
        
    } else if(firstName != ""){ 
        var forms = filterAllFormsByFirstName(firstName, function(forms){
            if(forms != null){
                res.render("view-grants.hbs", {
                    user, forms
                })
            }else{
                fdOne.getAllFDOne().then((fdOneData)=>{
                    forms = fdOneData
                    res.render("view-grants.hbs", {
                        user, forms,
                        error : "Name not found"
                    })
                })
            }
        })
        
    } else if(lastName != ""){
        var forms = filterAllFormsByLastName(lastName, function(forms){
            if(forms != null){
                res.render("view-grants.hbs", {
                    user, forms
                })
            }else{
                fdOne.getAllFDOne().then((fdOneData)=>{
                    forms = fdOneData
                    res.render("view-grants.hbs", {
                        user, forms,
                        error : "Name not found"
                    })
                })
            }
        })
    }
})

/**
 * Deletes a grant request form
 *
 * @param {Request} req
 * @param {Response} res
 */
router.delete("/deleteform", urlencoder, (req, res) => {
    console.log("POST /deleteform " + req.body.id)
    
    
    var grant = req.body.grant
    var id = req.body.id
    
    if(grant == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal"){
        fdOne.getFDOneByID(id).then((foundFDOne)=>{
            User.deleteFDOneInUser(foundFDOne).then((updatedUser)=>{
                fdOne.delete(req.body.id).then((result) => {	
                    res.send(result)
                })
            })
        })
    }
    else if(grant == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences"){
        fdTwo.getFDTwoByID(id).then((foundFDTwo)=>{
            User.deleteFDTwoInUser(foundFDTwo).then((updatedUser)=>{
                fdTwo.delete(req.body.id).then((result) => {	
                    res.send(result)
                })
            })
        })  
    }
    else if(grant == "[FD3] Support for Paper Presentations in Conferences"){
        fdThree.getFDThreeByID(id).then((foundFDThree)=>{
            User.deleteFDThreeInUser(foundFDThree).then((updatedUser)=>{
                fdThree.delete(req.body.id).then((result) => {	
                    res.send(result)
                })
            })
        }) 
    }
    else if(grant == "[FD4] Support for Participation in Local Conferences"){
        fdFour.getFDFourByID(id).then((foundFDFour)=>{
            User.deleteFDFourInUser(foundFDFour).then((updatedUser)=>{
                fdFour.delete(req.body.id).then((result) => {	
                    res.send(result)
                })
            })
        }) 
    }
    else if(grant == "[FD15] Incentive for Publication in Pre-Selected High Impact Journal"){
        fdFifteen.getFDFifteenByID(id).then((foundFDFifteen)=>{
            User.deleteFDFifteenInUser(foundFDFifteen).then((updatedUser)=>{
                fdFifteen.delete(req.body.id).then((result) => {	
                    res.send(result)
                })
            })
        }) 
    }
    else if(grant == "[FD16] Support for Membership in Professional Organizations"){
        fdSixteen.getFDSixteenByID(id).then((foundFDSixteen)=>{
            User.deleteFDSixteenInUser(foundFDSixteen).then((updatedUser)=>{
                fdSixteen.delete(req.body.id).then((result) => {	
                    res.send(result)
                })
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
function getAllForms(callback){
    
    fdOne.getAllFDOne().then((fdOneData)=>{
        forms = fdOneData
        fdTwo.getAllFDTwo().then((fdTwoData)=>{
            forms = forms.concat(fdTwoData)
            fdThree.getAllFDThree().then((fdThreeData)=>{
                forms = forms.concat(fdThreeData)
                fdFour.getAllFDFour().then((fdFourData)=>{
                    forms = forms.concat(fdFourData)
                    fdFifteen.getAllFDFifteen().then((fdFifteenData)=>{
                        forms = forms.concat(fdFifteenData)
                        fdSixteen.getAllFDSixteen().then((fdSixteenData)=>{
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
 * Gets all forms by Status
 *
 * @param {Filter} status
 * @param {Callback function} callback
 */
function filterAllFormsByStatus(status, callback){
    
    fdOne.getFDOneByStatus(status).then((fdOneData)=>{
        forms = fdOneData
        fdTwo.getFDTwoByStatus(status).then((fdTwoData)=>{
            forms = forms.concat(fdTwoData)
            fdThree.getFDThreeByStatus(status).then((fdThreeData)=>{
                forms = forms.concat(fdThreeData)
                fdFour.getFDFourByStatus(status).then((fdFourData)=>{
                    forms = forms.concat(fdFourData)
                    fdFifteen.getFDFifteenByStatus(status).then((fdFifteenData)=>{
                        forms = forms.concat(fdFifteenData)
                        fdSixteen.getFDSixteenByStatus(status).then((fdSixteenData)=>{
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
 * Gets all forms by Department
 *
 * @param {Filter} department
 * @param {Callback function} callback
 */
function filterAllFormsByDepartment(department, callback){
    
    fdOne.getFDOneByDepartment(department).then((fdOneData)=>{
        forms = fdOneData
        fdTwo.getFDTwoByDepartment(department).then((fdTwoData)=>{
            forms = forms.concat(fdTwoData)
            fdThree.getFDThreeByDepartment(department).then((fdThreeData)=>{
                forms = forms.concat(fdThreeData)
                fdFour.getFDFourByDepartment(department).then((fdFourData)=>{
                    forms = forms.concat(fdFourData)
                    fdFifteen.getFDFifteenByDepartment(department).then((fdFifteenData)=>{
                        forms = forms.concat(fdFifteenData)
                        fdSixteen.getFDSixteenByDepartment(department).then((fdSixteenData)=>{
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
 * Gets all forms by First Name
 *
 * @param {Filter} firstName
 * @param {Callback function} callback
 */
function filterAllFormsByFirstName(firstName, callback){
    
    User.getFDOneFormsByFirstName(firstName).then((fdOneData)=>{
        forms = fdOneData
        User.getFDTwoFormsByFirstName(firstName).then((fdTwoData)=>{
            forms = forms.concat(fdTwoData)
            User.getFDThreeFormsByFirstName(firstName).then((fdThreeData)=>{
                forms = forms.concat(fdThreeData)
                User.getFDFourFormsByFirstName(firstName).then((fdFourData)=>{
                    forms = forms.concat(fdFourData)
                    User.getFDFifteenFormsByFirstName(firstName).then((fdFifteenData)=>{
                        forms = forms.concat(fdFifteenData)
                        User.getFDSixteenFormsByFirstName(firstName).then((fdSixteenData)=>{
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
 * Gets all forms by Last Name
 *
 * @param {Filter} lastName
 * @param {Callback function} callback
 */
function filterAllFormsByLastName(lastName, callback){
    
    User.getFDOneFormsByLastName(lastName).then((fdOneData)=>{
        forms = fdOneData
        User.getFDTwoFormsByLastName(lastName).then((fdTwoData)=>{
            forms = forms.concat(fdTwoData)
            User.getFDThreeFormsByLastName(lastName).then((fdThreeData)=>{
                forms = forms.concat(fdThreeData)
                User.getFDFourFormsByLastName(lastName).then((fdFourData)=>{
                    forms = forms.concat(fdFourData)
                    User.getFDFifteenFormsByLastName(lastName).then((fdFifteenData)=>{
                        forms = forms.concat(fdFifteenData)
                        User.getFDSixteenFormsByLastName(lastName).then((fdSixteenData)=>{
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
 * Gets all forms by Full Name
 *
 * @param {Filter} fullName
 * @param {Callback function} callback
 */
function filterAllFormsByLastName(firstName, lastName, callback){
    
    User.getFDOneFormsByFullName(firstName, lastName).then((fdOneData)=>{
        forms = fdOneData
        User.getFDTwoFormsByFullName(firstName, lastName).then((fdTwoData)=>{
            forms = forms.concat(fdTwoData)
            User.getFDThreeFormsByFullName(firstName, lastName).then((fdThreeData)=>{
                forms = forms.concat(fdThreeData)
                User.getFDFourFormsByFullName(firstName, lastName).then((fdFourData)=>{
                    forms = forms.concat(fdFourData)
                    User.getFDFifteenFormsByFullName(firstName, lastName).then((fdFifteenData)=>{
                        forms = forms.concat(fdFifteenData)
                        User.getFDSixteenFormsByFullName(firstName, lastName).then((fdSixteenData)=>{
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
hbs.registerHelper('checkstatus', function(p1, p2, options) { 
    if(p1 == p2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })
  