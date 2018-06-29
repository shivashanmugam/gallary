const mongoose = require('mongoose');
/**
 * User Schema
 */
const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['js', 'angularjs', 'node', 'mongo', 'html', 'css', 'browser', 'http'],
    required: true
  },
  body: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    strictBool: true,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  updatedBy: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
QuestionSchema.method({});

/**
 * Statics
 */
QuestionSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get() {
    return this.find()
      .exec()
      .then(question => question);
  }
};

/**
 * @typedef Question
 */
module.exports = mongoose.model('Question', QuestionSchema);
