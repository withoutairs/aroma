Dice = new Meteor.Collection("dice");
if (Meteor.isClient) {
  Template.turn_dice.turn_dice= function () {
    return Dice.find({});
  };

  Template.game.events({
    'click .roller': function () {
      Meteor.call('roll');
    },
    'click .applier': function() {
      Dice.update(this._id, {$set: {applied: true}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
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
