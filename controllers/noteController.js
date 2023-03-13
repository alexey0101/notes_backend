const Note = require('../models/note');

exports.create = async (req, res) => {
    try {
        await Note.create(req.body, req.user.id);
        res.status(201).send({});
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const notes = await Note.findAll(req.user.id);
        res.status(200).send(notes);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

exports.findById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id, req.user.id);
        if (!note) {
            return res.status(404).send({ error: "Note not found" });
        }

        res.status(200).send(note[0]);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

exports.update = async (req, res) => {
    try {
        const result = await Note.update(req.params.id, req.body, req.user.id);
        if (result.changedRows == 0) {
            return res.status(404).send({ error: "Note not found" });
        }
        res.status(200).send({});
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await Note.delete(req.params.id, req.user.id);
        if (result.affectedRows == 0) {
            return res.status(404).send({ error: "Note not found" });
        }
        res.status(200).send({});
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};