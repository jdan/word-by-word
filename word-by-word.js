Words = new Meteor.Collection("words");
Players = new Meteor.Collection("players");

if (Meteor.isClient) {
  Template.arena.words = function() {
    return Words.find({});
  };

  Template.arena.events({
    'keydown input.text': function(event) {
      if (event.which == 13) {
        Words.insert({
                      content: event.target.value, 
                      timestamp: (new Date()).getTime()
                    });
        event.target.value = '';
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
