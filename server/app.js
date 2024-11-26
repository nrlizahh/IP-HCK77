if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const NoteController = require("./controllers/NoteController");
const StatusController = require("./controllers/StatusController");
const { errorHandler } = require("./middleware/errorHandler");
const UserController = require("./controllers/UserController");
const authentication = require("./middleware/authentication");
const guardUser = require("./middleware/guardUser");
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//User
app.post("/login", UserController.login);

app.use(authentication);
//Notes
app.get("/notes", NoteController.getNote);
app.post("/notes", NoteController.createNote);
app.get("/notes/:id", NoteController.findNoteById);
app.put("/notes/:id",guardUser, NoteController.updateNote);
app.delete("/notes/:id",guardUser, NoteController.deleteNote);

//Status
app.get("/statuses", StatusController.getStatus);

app.use(errorHandler);


module.exports = app