$(document).ready(() => {
  /**
   ***  ADD NEW TASK
   **/
  $('.add').on('click', evt => {
    var input = $(evt.target).siblings('input')
    var task = input.val()
    if (task === '') {
      alert('Task cannot be empty')
    } else {
      // console.log('New task', task)
      // add task to database
      $.ajax({
        type: 'POST',
        url: '/todos/add',
        data: {
          text: task
        },
        success: function (resp) {
          // console.log('Task Completed', resp.taskId)
          $(input).val('')
          appendNewTask(resp.taskId)
        },
        error: function (err) {
          console.log('Error!', err)
          alert('Failed to add new task')
        }
      })
    }
  })
  /**
   ***  MARK TASK AS COMPLETED
   **/
  $('.checkbox').on('click', evt => {
    var taskId = $(evt.target)
      .parent()
      .attr('id')
    var span = $(evt.target).siblings('span')
    var editBtn = $(evt.target).siblings('button')
    var isChecked = $(evt.target).is(':checked') ? 1 : 0
    // console.log('TASK ID ', taskId)
    // mark/unmark the task as complete in satabase
    $.ajax({
      type: 'POST',
      url: '/todos/done',
      data: {
        id: taskId,
        complete: isChecked
      },
      success: function (resp) {
        // console.log('Task Completed')
        if (isChecked) {
          $(span).css('text-decoration', 'line-through')
          $(editBtn).attr('disabled', 'true')
        } else {
          $(span).css('text-decoration', 'none')
          $(editBtn).removeAttr('disabled')
        }
      },
      error: function (err) {
        console.log('Error!')
      }
    })
  })
  /**
   ***  EDIT A TASK
   **/
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
          // console.log($(input).val())
          span = $('<span>' + text + '</span>')
          input.remove()
          $(evt.target).before(span)
          $(evt.target).text('Edit')
        },
        error: function () {
          alert('Could not update the task. Try Again!')
        }
      })
    }
  })

  /**
   ***  DELETE TASK
   **/
  $('.delete').on('click', evt => {
    var li = $(evt.target).parent()
    var taskId = li.attr('id')
    console.log('task id', taskId)
    // add task to database
    $.ajax({
      type: 'POST',
      url: '/todos/delete',
      data: {
        id: taskId
      },
      success: function (resp) {
        console.log('Task deleted', resp)
        $(li).remove()
      },
      error: function (err) {
        console.log('Error!', err)
        alert('Failed to add new task')
      }
    })
  })
})

function appendNewTask (taskId) {
  // get updated todo tasks

  // append the new task
  $.ajax({
    type: 'GET',
    url: '/todos/' + taskId,
    dataType: 'json',
    success: function (resp) {
      // console.log('NEW TASK', resp.task)
      $('#task-list').append(
        '<li style="background-color:' +
          resp.task.color +
          '" id="' +
          resp.task.id +
          '"><input class="checkbox" type="checkbox"><span>' +
          resp.task.text +
          '</span><button type="button" class="edit green">Edit</button></li>'
      )
    },
    error: function () {
      alert('Failed to get tasks list')
    }
  })
}
