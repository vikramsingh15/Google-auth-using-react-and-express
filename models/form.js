const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const formSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  interestedCourse: { type: String, required: true },
  phone: { type: String },
  employeeId: { type: Schema.Types.ObjectId, ref: 'user' },
  isClaimed: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('form', formSchema);
