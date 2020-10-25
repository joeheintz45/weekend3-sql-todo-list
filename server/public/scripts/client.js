$(document).ready(onReady);

function onReady() {
  console.log('Ready');
  $('.js-add-task').on('click', makeTask);
  $('.js-task-table').on('click', '.js-delete', deleteAlert);
  $('.js-task-table').on('click', '.js-complete', updateTask);

  getTask();
}

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
}

function clearInput() {
  $('.js-new-task').val('');
}

function render(tasks) {
  $('.js-task-list').empty();
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

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
}

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
}

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
}

function deleteAlert() {
  swal({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this imaginary file!',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      deleteTask();
      swal('Poof! Your imaginary file has been deleted!', {
        icon: 'success',
      });
    } else {
      swal('Your imaginary file is safe!');
    }
  });
}

function deleteTask() {
  const taskId = $(this).data('id');

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
}

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
}
