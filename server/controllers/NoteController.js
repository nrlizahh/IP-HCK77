const { Note } = require("../models");

module.exports = class NoteController {
  static async getNote(req, res, next) {
    try {
      const userId = req.user.id;
      const note = await Note.findAll({ where: { userId } });
      res.status(200).json(note);
    } catch (err) {
      console.log("🚀 ~ NoteController ~ getNote ~ err:", err);
      next(err);
    }
  }

  static async findNoteById(req, res, next) {
    try {
      const { id } = req.params;
      const note = await Note.findByPk(id);

      if (!note) {
        return next({
          name: "NotFound",
          message: "Note not found",
        });
      }

      res.status(200).json(note);
    } catch (err) {
      console.log("🚀 ~ NoteController ~ findNoteById ~ err:", err);
      next(err);
    }
  }

  static async createNote(req, res, next) {
    try {
      req.body.userId = req.user.id;
      const note = await Note.create(req.body);
      
      res
        .status(201)
        .json({ data: note, message: `Note ${req.body.task} created` });
    } catch (err) {
      console.log("🚀 ~ NoteController ~ createNote ~ err:", err);
      next(err);
    }
  }

  static async updateNote(req, res, next) {
    try {
      req.body.userId = req.user.id;
      const { id } = req.params;
      const note = await Note.findByPk(id);
      if (!note) {
        return next({
          name: "NotFound",
          message: "Note not found",
        });
      }

      await note.update(req.body, {
        individualHooks: true,
      });

      res.status(200).json({ data: note, message: `Note ${note.task} update` });
    } catch (err) {
      console.log("🚀 ~ NoteController ~ updateNote ~ err:", err);
      next(err);
    }
  }

  static async deleteNote(req, res, next) {
    try {
      const { id } = req.params;
      const note = await Note.findByPk(id);

      if (!note) {
        return next({
          name: "NotFound",
          message: `Note id:${id} not found`,
        });
      }

      await note.destroy();
      res.status(200).json({ message: `Note ${note.task} success to delete` });
    } catch (err) {
      console.log("🚀 ~ NoteController ~ deleteNote ~ err:", err);
      next(err);
    }
  }
};
