Dice = new Meteor.Collection("dice");
if (Meteor.isClient) {
  Template.global = function () {
    return "works?";
  };

  Template.roller.greeting = function () {
    var dice = Dice.find({});
    var blurb = "";
    dice.fetch().forEach( function (die) {
      blurb = blurb + " " + die.value + " " + die.applied;
    });
    return blurb;
  };

  Template.roller.events({
    'click input': function () {
      Meteor.call('roll');
    }
  });

  Template.hello.greeting = function () {
    return "Welcome to aroma!";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
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
