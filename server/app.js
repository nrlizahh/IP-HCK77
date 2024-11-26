const express = require("express");
const NoteController = require("./controllers/NoteController");
const StatusController = require("./controllers/StatusController");
const { errorHandler } = require("./middleware/errorHandler");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//User


//Notes
app.get('/notes', NoteController.getNote)
app.get('/notes', NoteController.createNote)
app.get('/notes/:id', NoteController.findNoteById)
app.get('/notes/:id', NoteController.updateNote)
app.get('/notes/:id', NoteController.deleteNote)

//Status
app.get('/statuses', StatusController.getStatus)

app.use()
app.listen(port, () => {
  console.log(`i like ur ${port} dollars`);
});
