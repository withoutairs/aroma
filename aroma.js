Dice = new Meteor.Collection("dice");
Bank = new Meteor.Collection("bank");
if (Meteor.isClient) {
  Meteor.subscribe("dice");
  Meteor.subscribe("bank");
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

  Template.bank.remaining = function () {
    var left = 0;
    Bank.find({}).forEach(function (b) {
        left = b.remaining;
    });
    return left;
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Bank.remove({});
    Bank.insert({remaining: 32});
    Meteor.call('turn');
  });
}

Meteor.methods({
  'global_dice': function () {
    return 3;
  },
  'turn': function () {
    if (Meteor.isServer) {
      Meteor.call('roll');
      Meteor.publish("dice", function () {
          return Dice.find({});
      });
      Meteor.publish("bank", function () {
          return Bank.find({});
      });
    }
  },
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
