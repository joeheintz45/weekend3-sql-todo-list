$(document).ready(onReady);

function onReady() {
  console.log('Ready');
  $('.js-add-task').on('click', makeTask);
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
