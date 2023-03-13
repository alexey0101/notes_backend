const validateNote = async (req, res, next) => {
    const note = req.body;
    if (note.title && note.content) {
        next();
    } else {
        res.status(400).send({ error: "Invalid note structure" });
    }
};

module.exports = validateNote;