var assert = require('assert');
suite ('Dice', function () {
  test ('in the server', function(done, server) {
    server.eval(function() {
      Meteor.call('roll');
      var docs = Dice.find().fetch();
      emit('docs',docs);
    });
    server.once('docs', function(docs) {
      assert.equal(docs.length, 3);
      done();
    });
  });
});
