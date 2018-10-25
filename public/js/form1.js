/**
 * This is the JS file of the FD1 page.
 * October 17, 2018
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
  if ((e.keyCode == 13) && ((node.type=="text") 
      || node.type=="number")) {
    return false;
  }
}

/**
 * This is initialize to the page where
 * when a key is pressed, it calls for
 * stopEnterKey function.
 */
document.onkeypress = stopEnterKey;

/**
 * Initializes the Date Hired field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#date-hired').calendar({
  type: 'date',
  maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
})

/**
 * Initializes the Date of Paper Submitted field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#submit-date').calendar({
  type: 'date',
  maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  onChange: function (date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();

    $('#accept-date').calendar({
      type: 'date',
      minDate: new Date(year, month, day),
      maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    });
  }
});

/**
 * Initializes the Date of Acceptance field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#accept-date').calendar({
  type: 'date',
  maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())

});

/**
 * Initializes the Date of Conference field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#conference-date').calendar({
  type: 'date',
  minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()), 
  onChange: function (date) {
    var yearCon = date.getFullYear();
    var monthCon = date.getMonth();
    var dayCon = date.getDate();

    $('#departure-date').calendar({
      type: 'date',
      maxDate: new Date(yearCon, monthCon, dayCon),
      minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      onChange: function (date) {
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();

        $('#return-date').calendar({
          type: 'date',
          minDate: new Date(yearCon, monthCon, dayCon),
          onChange: function (date) {
            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();
    
            $('#expected-date').calendar({
              type: 'date',
              minDate: new Date(year, month, day)
            });
          }
        });
      }
    });
  }
});

/**
 * Initializes the Date of Departure field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#departure-date').calendar({
  type: 'date',
  minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
});

/**
 * Initializes the Date of Return field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#return-date').calendar({
  type: 'date',
  minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
});

/**
 * Initializes the Date of Expected to Return
 * to Work field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#expected-date').calendar({
  type: 'date',
  minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
});

/**
 * Initializes the Date of last incentive availed field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#incentive-date').calendar({
  type: 'date',
  maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
});

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
      dateHired: {
        identifier: 'dateHired',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter when you were hired.'
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
      aveTeachingPerformance: {
        identifier: 'aveTeachingPerformance',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your average teaching performance.'
          }
        ]
      },
      titleOfPaperOrPublication: {
        identifier: 'titleOfPaperOrPublication',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your title of publication.'
          }
        ]
      },
      titleOfJournal: {
        identifier: 'titleOfJournal',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your title of journal.'
          }
        ]
      },
      datePaperSubmitted: {
        identifier: 'datePaperSubmitted',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter when the paper is submitted.'
          }
        ]
      },
      datePaperAccepted: {
        identifier: 'datePaperSubmitted',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter when the paper is accepted.'
          }
        ]
      },
      nameOfConference: {
        identifier: 'nameOfConference',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the name of the conference.'
          }
        ]
      },
      titleOfPaperToBePresented: {
        identifier: 'titleOfPaperToBePresented',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the name of the conference.'
          }
        ]
      },

      dateOfConference: {
        identifier: 'dateOfConference',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the date of the conference.'
          }
        ]
      },

      placeAndVenue: {
        identifier: 'placeAndVenue',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the place and venue.'
          }
        ]
      },
      dateOfDeparture: {
        identifier: 'dateOfDeparture',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the date of departure.'
          }
        ]
      },
      dateOfReturn: {
        identifier: 'dateOfReturn',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the date of return.'
          }
        ]
      },
      dateOfReturnToWork: {
        identifier: 'dateOfReturnToWork',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the date of return to work.'
          }
        ]
      },
      datePaperAccepted: {
        identifier: 'datePaperAccepted',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter when the paper is accepted.'
          }
        ]
      },
      dateIncentiveLastAvailed: {
        identifier: 'dateIncentiveLastAvailed',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the date of last availed incentive.'
          }
        ]
      }
    }
  });

