/**
 * This is the JS file of the FD16 page.
 * October 20, 2018
 * @ver 1.0
 * @author Sai Manalili
 */
var today = new Date();
 /**
 * Initializes the Membership Date field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#membership-date').calendar({
  type: 'date'
})

/**
 * Initializes the checkbox buttons including
 * radio buttons.
 */
$('.ui.checkbox').checkbox();

/**
 * Initializes the button with #confirm and checks whether
 * it will show the confirmation modal or not.
 */
$("#confirm").click(function () {
    check();

    var isValid = $('.form').form('validate form');

    if (isValid) {
      $('.ui.modal')
        .modal('show');
    }
})
  
/**
 * Checks if all input have values, if it does not
 * it scrolls and focuses to that field
 */
function check(){

  var items = [];
  var count = 0;

  $('.check').each(function (i, e) {
    if (count == 0){
      var name = ($(e).attr("name")) 
      var val = $("#" + name).val(); 
      
      if (val == "" || val == null){
        count = 1
        $("#" + name).focus();

        $('body').animate({
          scrollTop: $("#" + name).offset()
        }, 2000);
      }
    }
  });
}

/**
 * Initializes the form in order for the form to do
 * form validation.
 * @param {Object} settings - customizing the settings of
 * the form
 */
$('#request-form')
    .form({
      inline: 'true',
      on: 'blur',
      fields: {
        firstName: {
          identifier: 'firstName',
          inline: true,
          on: 'blur',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your first name.'
            }
          ]
        },
        lastName: {
          identifier: 'lastName',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your last name.'
            }
          ]
        },
        department: {
          identifier: 'department',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your department.'
            }
          ]
        },
        rank: {
          identifier: 'rank',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your rank.'
            }
          ]
        },
        nameOfOrganization: {
          identifier: 'nameOfOrganization',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter the name of the organization.'
            }
          ]
        },
        membershipDate: {
          identifier: 'membershipDate',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter the membership date.'
            }
          ]
        },
        coverage: {
          identifier: 'coverage',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please indicate the coverage.'
            }
          ]
        },
        membershipFee: {
          identifier: 'membershipFee',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter the membership fee.'
            }
          ]
        },
        checkPayableTo: {
          identifier: 'checkPayableTo',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please indicate the check payable to.'
            }
          ]
        }
      }
    });