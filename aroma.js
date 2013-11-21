Dice = new Meteor.Collection("dice");
if (Meteor.isClient) {
  Template.global = function () {
    return "works?";
  };

  Template.game.turn_dice = function () {
    var dice = Dice.find({});
    var blurb = "";
    dice.fetch().forEach( function (die) {
      blurb = blurb + " " + die.value + " " + die.applied;
    });
    return blurb;
  };

  Template.game.events({
    'click input': function () {
      Meteor.call('roll');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Dice.remove({});
    Meteor.call('turn');
  });
}

Meteor.methods({
  'turn': function () {
    if (Meteor.isServer) {
      Meteor.call('roll');
    }},
  'roll': function () {
    if (Meteor.isServer) {
      Dice.remove({});
      Dice.insert(createDie());
      Dice.insert(createDie());
      Dice.insert(createDie());
    }
  }
});

createDie = function() {
  return {value: Math.floor((Math.random() * 6) + 1), applied: false};
}
