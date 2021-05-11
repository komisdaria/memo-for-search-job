const { Schema, model } = require('mongoose');

const questionSchema = new Schema(
  {
    question: [{ type: String }],
    myAnswer: [{ type: String }],
  },
);

module.exports = model('Question', questionSchema);
