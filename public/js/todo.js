$(document).ready(() => {
  $('.add').on('click', evt => {
    var task = $(evt.target)
      .siblings('input')
      .val()
    if (task === '') {
      alert('Task cannot be empty')
    } else {
      console.log('New task', task)
      // add task to database
      $.ajax({
        type: 'POST',
        url: '/todos/add',
        data: {
          text: task
        },
        success: function (resp) {
          console.log('Task Completed')
        },
        error: function (err) {
          console.log('Error!')
        }
      })
    }
  })
  $('.checkbox').on('click', evt => {
    var taskId = $(evt.target)
      .parent()
      .attr('id')
    var span = $(evt.target).siblings('span')
    var isChecked = $(evt.target).is(':checked') ? 1 : 0
    //
    console.log('TASK ID ', taskId)
    // mark/unmark the task as complete in satabase
    $.ajax({
      type: 'POST',
      url: '/todos/done',
      data: {
        id: taskId,
        complete: isChecked
      },
      success: function (resp) {
        console.log('Task Completed')
        isChecked
          ? $(span).css('text-decoration', 'line-through')
          : $(span).css('text-decoration', 'none')
      },
      error: function (err) {
        console.log('Error!')
      }
    })
  })

  $('.edit').on('click', evt => {
    var taskId = $(evt.target)
      .parent()
      .attr('id')
    var btnText = $(evt.target).text()
    if (btnText === 'Edit') {
      var span = $(evt.target).siblings('span')
      var input = $('<input type="text" value="' + span.text() + '">')
      span.remove()
      $(evt.target).before(input)
      $(evt.target).text('Modify')
    } else {
      input = $(evt.target).siblings('input[type=text]')
      // send ajax request
      var text = $(input).val()
      $.ajax({
        type: 'POST',
        url: '/todos/modify',
        data: {
          id: taskId,
          text: text
        },
        success: function (resp) {
          console.log($(input).val())
          span = $('<span>' + text + '</span>')
          input.remove()
          $(evt.target).before(span)
          $(evt.target).text('Edit')
        },
        error: function (err) {
          alert('Could not update the task. Try Again!')
        }
      })
    }
  })
})
