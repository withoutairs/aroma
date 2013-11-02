if (Meteor.isClient) {
  Template.global = function () {
    return "works?";
  }

  Template.there.greeting = function () {
    return "Welcome, from aroma!";
  };

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
