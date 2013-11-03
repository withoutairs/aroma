Dice = new Meteor.Collection("dice");
if (Meteor.isClient) {
  Template.global = function () {
    return "works?";
  };

  Template.roller.greeting = function () {
    var die = Dice.findOne();
    return die && die.value;
  };

  Template.roller.events({
    'click input' : function () {
      Meteor.call('roll');
    }
  });

  Template.hello.greeting = function () {
    return "Welcome to aroma!";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({
  'roll': function () {
       if (Meteor.isServer) {
      Dice.remove({});
    Dice.insert({value: Math.floor((Math.random()*6)+1)});
   }
  }
});
