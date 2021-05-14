const { Schema, model } = require('mongoose');

const memoSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    company: { type: String, require: true },
    adress: { type: String, require: true },
    date: { type: Date },
    text: [{ type: String }],
    infoAboutCompany: [{ type: String }],
    myQuestions: [{ type: String }],
    companyQuestions: [{ type: String }],
    salary: { type: Number },
    withWhoWasInterview: [{ type: String }],
    contactInfo: [{ type: String }],
    memoAfterInterview: [{ type: String }],
  },
  { timestamps: true },
);

module.exports = model('Memo', memoSchema);
