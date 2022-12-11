const Note = require('./../models/note');


exports.getAllNotes = async (req, res, next) =>{
    const notes = await Note.find({
        createdBy: req.user.id}); // this will get note details base on logged user ID
    res.status(200).json(notes);
}

exports.postNote = async(req, res, next) => {
    const newNote = new Note(req.body);
    newNote.createdBy = req.user.id; // this get user ID and insert it in the database
    try {
        const note = await newNote.save();
        res.status(201).json(note); // show success if creation
    } catch (error) {
        error.status = 400;
        next(error); // show erroe if anything went wrong here..
    }
}

exports.getNoteById = async(req, res, next) => {
    const {noteId} = req.params;
    try {
        const note = await Note.findById(noteId);
        res.status(200).json(note);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.updateNote = async(req, res, next) => {
    const {noteId} = req.params;
    try {
        await Note.findByIdAndUpdate(noteId, req.body);
        res.status(200).json({success: true});
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.deleteNote = async(req, res, next) => {
    const {noteId} = req.params;
    try {
        await Note.findByIdAndRemove(noteId);
        res.status(200).json({success: true, message: 'Deleted successfully!'});
    } catch (error) {
        error.status = 400;
        next(error);
    }
};


// we to route folder and create note.js then add the routes