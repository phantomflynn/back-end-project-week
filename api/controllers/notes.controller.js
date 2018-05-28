const express = require("express")
const User = require("../models/users.schema")
const Note = require("../models/notes.schema")
const router = express.Router()

const GET = (req, res) => {
  const { username, id } = req.decoded;
  Note
    .find({ postedBy: id })
    .then(notes => res.status(200).json(notes))
    .catch(err => res.status(500).json({ error: 'error fetching notes' }))
}

const POST = async (req, res) => {
  const { username, id } = req.decoded;
  const user = await User.findById(id)
  const newNote = { title: req.body.title, content: req.body.content, postedBy: id }
  Note
    .create(newNote)
    .then(note => res.status(201).json(note))
    .catch(err => res.status(500).json({ error: 'error creating new note' }))
}

const PUT = (req, res) => {
  const { id } = req.params;
  Note
    .findByIdAndUpdate(id, req.body, { new: true })
    .then(updated => res.status(200).json(updated))
    .catch(err => res.status(500).json({ error: 'cannot update note at this time' }))
}

const DELETE = (req, res) => {
  const { id } = req.params;
  Note
    .findByIdAndRemove(id)
    .then(success => res.status(200).json({ message: 'note successfully deleted' }))
    .catch(err => res.status(500).json({ error: 'cannot delete note at this time' }))
}

router.route('/')
  .get(GET)
  .post(POST)

router.route('/:id')
  .put(PUT)
  .delete(DELETE)

module.exports = router;