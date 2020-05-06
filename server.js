const express = require('express');
const cors = require("cors")
const server = express();
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")
server.use(express.json())
server.use(logger)
server.use(cors())
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use("/api/users", userRouter)
server.use("/api/posts", postRouter)
//custom middleware
//logger should be first after express.json - executed in order

function logger(req, res, next) {
  console.log(req.method)
  console.log(req.url)
  console.log(Date.now())
  next()
}

module.exports = server;
