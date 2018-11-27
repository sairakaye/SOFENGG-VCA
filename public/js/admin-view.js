/**
 * This is the JS file of the View Details
 * pages.
 * November 25, 2018
 * @ver 1.0
 * @author Sai Manalili
 */

/**
 * This is for the initialization of
 * the dropdown.
 */
$('.ui.dropdown').dropdown();

var formID = $("#submit-button").attr("data-id")
var grant = $("#submit-button").attr("data-grant")

$("button#delete-button").on("click", function () {
  var $tr = $(this).closest('tr')
  var id = $(this).attr("data-id")

  $('.ui.modal.deletion')
    .modal('show');

  $(".negative.delete.final").on("click", function () {
    $.ajax({
      method: "delete",
      url: "delete-remark",
      data: {
        id,
        formID,
        grant
      },
      success: function (result) {
        /**
         * This callback calls a lot of times. Will fix this later.
         */
        $tr.remove();
      }
    })
  })
})


$("#remarks-form").submit(function (e) {
  e.preventDefault();

  var status = $("#status").val()
  var remark = $("#remark").val()


  $.ajax({
    method: "post",
    url: "change-status",
    data: {
      status,
      formID,
      grant,
      remark
    },
    success: function (result) {
      var promptDiv = document.getElementById("prompt")
      $(promptDiv).empty()

      var messageDiv = document.createElement("div")

      $(messageDiv).addClass("ui positive message transition")

      var icon = document.createElement("i")
      $(icon).addClass("close icon")

      var headerDiv = document.createElement("div")
      $(headerDiv).addClass("header")
      $(headerDiv).append("Successfully change the status!")

      var paragraph = document.createElement("p")
      $(paragraph).append("You successfully changed the status! :D")


      $(messageDiv).append(icon)
      $(messageDiv).append(headerDiv)
      $(messageDiv).append(paragraph)
      $(promptDiv).append(messageDiv)

      $('.message .close').on('click', function () {
        $(this).closest('.message')
          .transition('fade')
      })

      if (result._id != "undefined") {
        var tbodyElement = document.getElementById("remarks-body")
        var trElement = document.createElement("tr")
        var tdDate = document.createElement("td")
        var tdStatus = document.createElement("td")
        var tdRemark = document.createElement("td")
        var tdButton = document.createElement("td")
        var deleteButton = document.createElement("button")

        $(deleteButton).addClass("ui button red")
        $(deleteButton).attr("data-id", result._id)
        $(deleteButton).attr("id", "new-delete-button")
        $(deleteButton).append("Delete Remark")

        $(document).on('click', "#new-delete-button", function () {
          var $tr = $(this).closest('tr')
          var id = $(this).attr("data-id")

          $('.ui.modal.deletion')
            .modal('show');

          $(".negative.delete.final").on("click", function () {
            $.ajax({
              method: "delete",
              url: "delete-remark",
              data: {
                id,
                formID,
                grant
              },
              success: function (result) {
                /**
                  * This callback calls a lot of times. Will fix this later.
                  */
                $tr.remove();
              }
            })
          })
        })

        $(tdDate).append(moment(result.date).format("MMMM D, YYYY h:mm A"))
        $(tdStatus).append(result.status)
        $(tdRemark).append(result.remark)
        $(tdButton).append(deleteButton)

        $(trElement).append(tdDate)
        $(trElement).append(tdStatus)
        $(trElement).append(tdRemark)
        $(trElement).append(tdButton)

        $(tbodyElement).append(trElement)
      }
    },

    error: function (err) {
      alert("Something went wrong! " + err)
    }
  })
})