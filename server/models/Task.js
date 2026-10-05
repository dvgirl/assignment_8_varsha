const mongoose = require('mongoose');

/**
 * Task Schema Definition
 * Represents a single To-Do Task stored in MongoDB
 */
const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Task text/title is required'],
      trim: true,
      minlength: [1, 'Task text cannot be empty']
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

// Format output object to have standard id field
taskSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
