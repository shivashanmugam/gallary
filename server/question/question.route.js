// Did't use Joi Schema for validation like as they have done for use route
const express = require('express');
const questionController = require('./question.controller.js');
const config = require('../../config/config');
const expressJwt = require('express-jwt');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/questions - Get list of question */
  .get(questionController.list)

  /** POST /api/questions - Create new question */
  .post(expressJwt({ secret: config.jwtSecret }), questionController.createQuestion);

router.route('/:questionId')
  /** PATCH /api/questions/questionId - Create new question */
  .patch(expressJwt({ secret: config.jwtSecret }), questionController.updateQuestion);

module.exports = router;
