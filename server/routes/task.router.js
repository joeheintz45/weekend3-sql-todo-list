const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// GET route for client and database
router.get('/', (req, res) => {
  console.log('successful get');
  const queryText = 'SELECT * FROM "tasks" ORDER BY "id";';

  pool
    .query(queryText)
    .then((dbResponse) => {
      console.log(dbResponse);
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
}); // end GET route

// POST route for client to server to database
router.post('/', (req, res) => {
  console.log('successful post');
  const taskData = req.body;
  const queryText = `INSERT INTO "tasks" ("new_task", "completed")
  VALUES ($1, $2);`;

  const taskArray = [taskData.new_task, taskData.completed];

  pool
    .query(queryText, taskArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
}); // end POST route

// DELETE route for deleting data from database
router.delete('/:id', (req, res) => {
  const taskId = req.params.id;
  const queryText = `DELETE FROM "tasks" WHERE "id"=$1;`;
  const taskIdArray = [taskId];

  pool
    .query(queryText, taskIdArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
}); // end DELETE route

// PUT route for updating complete status of task
router.put('/complete/:id', (req, res) => {
  const taskStatus = req.body;
  const queryText = `UPDATE "tasks" SET "completed"='true' WHERE "id"=$1;`;
  const taskStatusArray = [req.params.id];

  pool
    .query(queryText, taskStatusArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
}); // end PUT route

module.exports = router;
