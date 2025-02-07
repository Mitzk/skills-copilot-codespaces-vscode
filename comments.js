// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 3000;

app.use(bodyParser.json());

// Create a new comment
app.post('/comments', (req, res) => {
  let comments = JSON.parse(fs.readFileSync('./comments.json'));
  let newComment = req.body;
  comments.push(newComment);
  fs.writeFileSync('./comments.json', JSON.stringify(comments));
  res.send('Comment added');
});

// Get all comments
app.get('/comments', (req, res) => {
  let comments = JSON.parse(fs.readFileSync('./comments.json'));
  res.send(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
  let comments = JSON.parse(fs.readFileSync('./comments.json'));
  let comment = comments.find((comment) => comment.id == req.params.id);
  res.send(comment);
});

// Update a comment by id
app.put('/comments/:id', (req, res) => {
  let comments = JSON.parse(fs.readFileSync('./comments.json'));
  let comment = comments.find((comment) => comment.id == req.params.id);
  let index = comments.indexOf(comment);
  comments[index] = req.body;
  fs.writeFileSync('./comments.json', JSON.stringify(comments));
  res.send('Comment updated');
});

// Delete a comment by id
app.delete('/comments/:id', (req, res) => {
  let comments = JSON.parse(fs.readFileSync('./comments.json'));
  let comment = comments.find((comment) => comment.id == req.params.id);
  let index = comments.indexOf(comment);
  comments.splice(index, 1);
  fs.writeFileSync('./comments.json', JSON.stringify(comments));
  res.send('Comment deleted');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});