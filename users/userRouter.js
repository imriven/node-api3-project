const express = require("express");
const router = express.Router();
const db = require("./userDb");
const postdb = require("../posts/postDb")


router.post("/", validateUser, (req, res) => {
  db.insert(req.body)
    .then((result) => {
      res.status(201).send();
    })
    .catch((err) => {
      res.status(500).json({ error: "error connecting to database" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const p=req.body
  p.user_id = Number(req.params.id)
  postdb.insert(p)
  .then(result => {
    res.status(201).send()
  })
  .catch((err) => {
    res.status(500).json({ error: "error connecting to database" });
  });
});

router.get("/", (req, res) => {
  db.get()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "error connecting to database" });
    });
});

router.get("/:id", convertId, validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  db.getUserPosts(Number(req.params.id))
  .then(result => {
    res.status(200).json(result)
  })
  .catch((err) => {
    res.status(500).json({ error: "error connecting to database" });
  });
});

router.delete("/:id", validateUserId, (req, res) => {
  db.remove(Number(req.params.id))
  .then(result => {
    if (result === 1) {
      res.status(204).send()
    } else {
      res.status(500).json({ error: "error deleting record" })
    }
  })
  .catch((err) => {
    res.status(500).json({ error: "error connecting to database" });
  });
});

router.put("/:id", validateUserId, (req, res) => {
  db.update(Number(req.params.id), req.body)
  .then(result => {
    if (result === 1) {
      res.status(204).send()
    } else {
      res.status(500).json({ error: "error updating record" })
    }
  })
  .catch((err) => {
    res.status(500).json({ error: "error connecting to database" });
  });
});

//custom middleware

function validateUserId(req, res, next) {
  db.getById(req.id)
    .then((result) => {
      if (result) {
        req.user = result;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "error connecting to database" });
    });
}

function validateUser(req, res, next) {
  if (JSON.stringify(req.body) === '{}') {
  return res.status(400).json({ message: "missing user data" })
  }
  if (!req.body.name) {
    return res.status(400).json({ message: "missing required name field" })
  }
  next();
}

function validatePost(req, res, next) {
  if (JSON.stringify(req.body) === '{}') {
    return res.status(400).json({ message: "missing post data" })
    }
    if (!req.body.text) {
      return res.status(400).json({ message: "missing required text field" })
    }
    next();
}

function convertId(req, res, next) {
  req.id = Number(req.params.id)
  next()
}

module.exports = router;


