var assert = require('assert');
suite ('Dice', function () {
  test ('in the server', function(done, server) {
    server.eval(function() {
      Meteor.call('roll');
      var docs = Dice.find().fetch();
      emit('docs',docs);
      var global_dice = Meteor.call('global_dice');
      emit('global_dice',global_dice);
    });
    server.once('global_dice', function(global_dice,no2) {
      assert.equal(global_dice, 3);
    });
    server.once('docs', function(docs) {
      console.log ( server.once('global_dice', function(global_dice) {
        return global_dice;
      }) );
      assert.equal(docs.length, gd);
      done();
    });
  });
});
