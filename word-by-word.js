Words = new Meteor.Collection("words");
Players = new Meteor.Collection("players");

if (Meteor.isClient) {
  Template.arena.words = function() {
    return Words.find({});
  };

  Template.arena.events({
    'keydown input.text': function(event) {
      if ((event.which == 13 || event.which == 32) && event.target.value.length) {
        event.preventDefault();
        if (event.target.value.match(/\s+/)) {
          $('#error').text('One word only! (no whitespace)').show().fadeOut(2000);
        } else {
          Words.insert({
                        content: event.target.value
                      });
          event.target.value = '';
        }
      }
    },

    'click input.undo': function(event) {
      var allWords = Words.find();
      var last_id;
      // overwrite "last_id" each time
      allWords.forEach(function(item) {
        last_id = item._id;
      });

      Words.remove(last_id);
    },

    'click input.obliterate': function(event) {
      if (confirm('Are you sure you want to erase everything?')) {
        Words.remove({});
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
