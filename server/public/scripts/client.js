$(document).ready(onReady);

// page ready function
function onReady() {
  console.log('Ready');
  $('.js-add-task').on('click', makeTask);
  $('.js-task-table').on('click', '.js-delete', deleteAlert);
  $('.js-task-table').on('click', '.js-complete', updateTask);

  getTask();
} // end onReady

// checks if input is filled and stores task in object
function makeTask() {
  if ($('.js-new-task').val().length === 0) {
    alert('Please Fill All Fields!');
  } else {
    newTask = {
      new_task: $('.js-new-task').val(),
      completed: false,
    };

    postTask(newTask);
    clearInput();
  }
} // end makeTask function

// clears input field after submit
function clearInput() {
  $('.js-new-task').val('');
} // end clearInput

// renders the server data onto the page
function render(tasks) {
  $('.js-task-list').empty();
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    // checks if the task is completed and applies new color if true
    if (task.completed === true) {
      $('.complete').addClass('complete');
      $('.complete').removeClass('table-striped');
      $('.js-task-list').append(`
      <tr class="complete">
        <td>${task.new_task}</td>
        <td class="complete-cell">Good Job!</td>
        <td><button type="button" class="btn btn-danger js-delete" data-id="${task.id}">Delete</button></td>
      </tr>
    `);
    } else {
      $('.js-task-list').append(`
      <tr>
        <td>${task.new_task}</td>
        <td><button type="button" class="btn btn-success js-complete" data-status="${task.completed}" data-id="${task.id}">Complete</button></td>
        <td><button type="button" class="btn btn-danger js-delete" data-id="${task.id}">Delete</button></td>
      </tr>
    `);
    }
  }
} // end render function

// gets the data from the server to be rendered on the page
function getTask() {
  $.ajax({
    type: 'GET',
    url: '/tasks',
  })
    .then((response) => {
      console.log(response);
      render(response);
    })
    .catch((err) => {
      console.log(err);
    });
} // end getTask

// posts data from the input to the server
function postTask(newTask) {
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: newTask,
  })
    .then((response) => {
      getTask();
    })
    .catch((err) => {
      console.log(err);
    });
} // end postTask

// alerts user if the are sure they want to delete task
function deleteAlert() {
  swal({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this Task!',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      const taskId = $(this).data('id');
      deleteTask(taskId);
      swal('Poof! Your Task has been deleted!', {
        icon: 'success',
      });
    } else {
      swal('Your Task is safe!');
    }
  });
} // end deleteAlert

// deletes data on the server if the user hits confirm
function deleteTask(taskId) {
  $.ajax({
    type: 'DELETE',
    url: `/tasks/${taskId}`,
  })
    .then((response) => {
      getTask();
    })
    .catch((err) => {
      console.log(err);
    });
} // end deleteTask

// updates the tasks complete status if selected
function updateTask() {
  const taskId = $(this).data('id');
  const taskStatus = $(this).data('status');

  if (taskStatus === true) {
    $(this).text('Completed');
  }

  $.ajax({
    type: 'PUT',
    url: `/tasks/complete/${taskId}`,
  })
    .then((response) => {
      getTask();
    })
    .catch((err) => {
      console.log(err);
    });
} // end updateTask
