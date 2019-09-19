const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore();
const booksRef = firestore.collection('books');
const bunyan = require('bunyan');
const logger = bunyan.createLogger({
  name: 'bookshelf-api',
  level: 'debug',
  serializers: bunyan.stdSerializers
});

exports.list = function(req, res) {
  booksRef.get()
    .then(snapshot => {
      if (snapshot.empty) {
        logger.debug('No matching documents.');
        return;
      }

      let data = [];
      snapshot.forEach(doc => {
        data.push({id: doc.id, ...doc.data()});
      })

      res.json(data);
    })
    .catch(err => {
      logger.debug('Error getting documents', err);
      res.status(500).json({
        status: 500,
        message: err
      })
    });
};

exports.get = function(req, res) {
  booksRef.doc(req.params.id).get()
    .then(doc => {
      res.json(doc.data());
    })
    .catch(err => {
      logger.debug('Error getting document', err);
      res.status(500).json({
        status: 500,
        message: err
      })
    });
};

exports.add = function(req, res) {
  booksRef.add(req.body)
    .then(docRef => {
      return docRef.get();
    })
    .then(doc => {
      res.json({id: doc.id, ...doc.data()});
    })
    .catch(err => {
      logger.debug('Error adding document', err);
      res.status(500).json({
        status: 500,
        message: err
      })
    });
};

exports.update = function(req, res) {
  booksRef.doc(req.params.id).set(req.body)
    // .then(docRef => {
    //   return docRef.get();
    // })
    .then(doc => {
      res.json({id: doc.id, ...doc.data()});
    })
    .catch(err => {
      logger.debug('Error updating document', err);
      res.status(500).json({
        status: 500,
        message: err
      })
    });
};

exports.delete = function(req, res) {
  booksRef.doc(req.params.id).delete()
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      logger.debug('Error deleting document', err);
      res.status(500).json({
        status: 500,
        message: err
      })
    });
};
