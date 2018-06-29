const Question = require('./question.model');
const Chalk = require('chalk'); //eslint-disable-line

/**
 * Load user and append to req.
 */
function list(req, res, next) {
  Question.get()
    .then(question => res.send(question))
    .catch(e => next(e));
}
/**
 * Creates a question.
 */
function createQuestion(req, res, next) {
  const reqBody = req.body;
  reqBody.createdBy = req.user.username;
  reqBody.updatedBy = req.user.username;
  const question = new Question(reqBody);
  question.save(question)
    .then(success => res.send(success))
    .catch(e => next(e));
}

function updateQuestion(req, res, next) {
  const question = req.body;
  const condition = { _id : req.params.questionId }; //eslint-disable-line
  const options = { multi: false };
  Question.update(condition, question, options)
    .then(success => { //eslint-disable-line
      res.send(success);
    })
    .catch(e => next(e));
}

module.exports = {
  list, createQuestion, updateQuestion
};
