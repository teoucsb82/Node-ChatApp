(function(root) {
  var Room = root.Room = (root.Room || {});

  Room.Chat = function() {
    this.room = io.connect();
  };

  Room.Chat.prototype = {
    sendMessage: function(message) {
      this.room.emit( "message", { data: message } )
    },

    updateUsername: function(user) {
      this.room.emit( "newName", { data: user } )
    }
  };

})(this);