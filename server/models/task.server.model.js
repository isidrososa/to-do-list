var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TaskSchema = new Schema({
  createdAt: {
    type: Date,
    default: new Date()
  },
  description: {
    type: String,
    required: [true, 'Description cannot be blank'],
    trim: true
  },
  level: {
    type: Number,
    default: 0,
    min: 0,
    max: 2
  },
  terminated: {
    type: Boolean,
    default: false
  },
  terminatedAt: {
    type: Date
  }
});

var Task = mongoose.model('Task', TaskSchema);

module.exports = Task;