Words = new Meteor.Collection("words");
Players = new Meteor.Collection("players");

if (Meteor.isClient) {
  Template.arena.words = function() {
    return Words.find({}, {sort: {timestamp: 1}});
  };

  Template.arena.events({
    'keydown input.text': function(event) {
      if (event.which == 13) {
        if (event.target.value.match(/\s+/)) {
          $('#error').text('One word only! (no whitespace)').show().fadeOut(2000);
        } else {
          Words.insert({
                        content: event.target.value, 
                        timestamp: (new Date()).getTime()
                      });
          event.target.value = '';
        }
      }
    },

    'click input.undo': function(event) {
      Words.remove(Words.findOne({}, {sort: {timestamp: -1}}));
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
