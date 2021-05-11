const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String, required: true, min: 5, unique: true,
    },
    password: { type: String, min: 3, required: true },
  },
);

module.exports = model('User', userSchema);
