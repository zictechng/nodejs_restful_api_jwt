const express = require('express');
const router = express.Router();

//import the note controller here...
const noteController = require('./../controllers/note');

// create the route for note activities
router.route('/')
.get(noteController.getAllNotes)
.post(noteController.postNote);


router.route('/:noteId')
.get(noteController.getNoteById)
.put(noteController.updateNote)
.delete(noteController.deleteNote);

// export the routes

module.exports = router;

// then move to app.js to use this route,
// ensure to import the routes/note first

