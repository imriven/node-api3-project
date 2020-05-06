const express = require('express');

const router = express.Router();
const db = require("./userDb")
router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  db.get()
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(500).json({error: "error connecting to database"})
  })
});

router.get('/:id', (req, res) => {
  db.getById(Number(req.params.id))
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(500).json({error: "error connecting to database"})
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  db.getById(Number(req.params.id))
  .then(result => {
  req.user = result
  next();
  })
  .catch(err => {
    res.status(400).json({ message: "invalid user id" })
  })
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
