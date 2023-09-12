const User = require('../../models/user');
const note = require('../../models/note');
const { UNSAFE_RouteContext } = require('react-router-dom');

module.exports = {
    create,
    index,
    delete: deletenote,
    edit
};

async function create(req, res) {
    try {
        const newnote = {
            title: req.body.newTitle,
            text: req.body.newnote,
            genre: req.body.newGenre,
            user: req.user._id
        };
        const note = await note.create(newnote);
        res.json(note);
    }   catch (err) {
        res.status(400).json(err);
    }
}

async function index(req, res) {
    try {
        const notes = await note.find({user: req.user._id});
        res.json(notes);
    }   catch (err) {
        res.status(400).json(err);
    }
}

async function deletenote(req, res) {
    try {
        const note = await note.findOneAndDelete({_id: req.params.id});
        res.json(note);
    }   catch (err) {
        res.status(400).json(err);
    }
}

async function edit(req, res) {
    try {
        const note = await note.findOneAndUpdate({ _id: req.params.id }, req.body , { new: true });
        res.json(note);
    }   catch (err) {
        res.status(400).json(err);
    }
}