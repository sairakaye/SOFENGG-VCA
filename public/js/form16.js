/**
 * This is the JS file of the FD16 page.
 * October 20, 2018
 * @ver 1.3
 * @author Sai Manalili
 */

/**
 * This is variable creates the date
 * today.
 */
var today = new Date();

/**
 * Prevents the enter key to be pressed in forms.
 * @param {Event} e
 */
function stopEnterKey(e) {
  var e = (e) ? e : ((event) ? event : null);
  var node = (e.target) ? e.target : ((e.srcElement) ? e.srcElement : null);
  if ((e.keyCode == 13) && ((node.type == "text")
    || node.type == "number")) {
    return false;
  }
}

$('.ui.dropdown').dropdown();
/**
 * This is initialize to the page where
 * when a key is pressed, it calls for
 * stopEnterKey function.
 */
document.onkeypress = stopEnterKey;
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
    $('.ui.modal.submit')
      .modal('show');
  }
})

/**
 * Checks if all input have values, if it does not
 * it scrolls and focuses to that field
 */
function check() {
  var count = 0;

  $('.check').each(function (i, e) {
    if (count == 0) {
      var name = ($(e).attr("name"))
      var val = $("#" + name).val();

      if (val == "" || val == null) {
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
    inline: true,
    on: 'blur',
    keyboardShortcuts: false,

    fields: {
      firstName: {
        identifier: 'firstName',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your first name.'
          }
        ]
      },
      lastName: {
        identifier: 'lastName',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your last name.'
          }
        ]
      },
      department: {
        identifier: 'department',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your department.'
          }
        ]
      },
      rank: {
        identifier: 'rank',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your rank.'
          }
        ]
      },
      nameOfOrganization: {
        identifier: 'nameOfOrganization',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the name of the organization.'
          }
        ]
      },
      membershipDate: {
        identifier: 'membershipDate',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the membership date.'
          }
        ]
      },
      coverage: {
        identifier: 'coverage',
        rules: [
          {
            type: 'empty',
            prompt: 'Please indicate the coverage.'
          }
        ]
      },
      membershipFee: {
        identifier: 'membershipFee',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the membership fee.'
          }
        ]
      },
      checkPayableTo: {
        identifier: 'checkPayableTo',
        rules: [
          {
            type: 'empty',
            prompt: 'Please indicate the check payable to.'
          }
        ]
      }
    }
  });

/**
 * This part checks if the incentive was not availed,
 * and the user submits the form for preview, it retains
 * the did not avail for incentive check.
 */
var isNoAvailChecked = $('#no-avail').prop('checked');
if (isNoAvailChecked) {
  $("#dateIncentiveLastAvailed").val("N/A");
  $("#dateIncentiveLastAvailed").attr("disabled", "disabled");
  $("#request-form").form('validate field', 'dateIncentiveLastAvailed');
}

/**
* This function checks for the change
* of the checkbox in "Date incentive was last availed of".
*/
$("#no-avail").change(function () {
  if (this.checked) {
    $("#dateIncentiveLastAvailed").val("N/A");
    $("#dateIncentiveLastAvailed").attr("disabled", "disabled");
    $("#request-form").form('validate field', 'dateIncentiveLastAvailed');

  } else {
    $("#dateIncentiveLastAvailed").val("");
    $("#dateIncentiveLastAvailed").removeAttr("disabled");
  }
});