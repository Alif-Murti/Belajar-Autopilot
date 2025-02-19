// create web server
// create express object
const express = require('express');
const app = express();
// create body parser object
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
// create comment array
const comments = [];
// create comment object
const comment = {
    id: 1,
    username: 'test',
    content: 'test comment'
};
// push comment object into comment array
comments.push(comment);
// create get method
app.get('/comments', (req, res) => {
    res.send(comments);
});
// create post method
app.post('/comments', (req, res) => {
    const username = req.body.username;
    const content = req.body.content;
    const newComment = {
        id: comments.length + 1,
        username: username,
        content: content
    };
    comments.push(newComment);
    res.send(newComment);
});
// create put method
app.put('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const username = req.body.username;
    const content = req.body.content;
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
        comment.username = username;
        comment.content = content;
        res.send(comment);
    } else {
        res.status(404).send('Comment not found');
    }
});
// create delete method
app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = comments.findIndex(comment => comment.id === id);
    if (index !== -1) {
        comments.splice(index, 1);
        res.send('Comment deleted');
    } else {
        res.status(404).send('Comment not found');
    }
});
// listen to port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
// export app object
module.exports = app;