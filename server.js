const express = require('express');
const cors = require("cors")
const server = express();
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")
server.use(express.json())
server.use(cors())
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use("/api/users", userRouter)
server.use("/api/posts", postRouter)
//custom middleware

function logger(req, res, next) {}

module.exports = server;
