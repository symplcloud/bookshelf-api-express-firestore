'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const booksCtrl = require('../controllers/booksCtrl');
const router = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());

router.get('/', booksCtrl.list);
router.get('/:id', booksCtrl.get);
router.post('/', booksCtrl.add);
router.put('/:id', booksCtrl.update);
router.delete('/:id', booksCtrl.delete);

/**
 * Errors on "/api/books/*" routes.
 */
router.use((err, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = {
    message: err.message,
    internalCode: err.code,
  };
  next(err);
});

module.exports = router;
