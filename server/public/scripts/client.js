$(document).ready(onReady);

function onReady() {
  console.log('Ready');
  $('.js-add-task').on('click', makeTask);
  $('.js-task-table').on('click', '.js-delete', deleteTask);
  $('.js-task-table').on('click', '.js-complete', updateTask);

  getTask();
}

function makeTask() {
  newTask = {
    new_task: $('.js-new-task').val(),
    completed: false,
  };

  postTask(newTask);
  clearInput();
}

function clearInput() {
  $('.js-new-task').val('');
}

function render(tasks) {
  $('.js-task-list').empty();
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    if (task.completed === true) {
      $('.js-task-list').append(`
      <tr>
        <td>${task.new_task}</td>
        <td>Completed</td>
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

function handleUpdate() {}

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
