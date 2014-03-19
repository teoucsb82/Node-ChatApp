(function(root) {
  var ChatApp = root.ChatApp = (root.ChatApp || {});

  ChatApp.ChatSocket = function() {
    this.chat = io.connect();
  };

  ChatApp.ChatSocket.prototype = {
    sendMessage: function(message) {
      this.chat.emit( "message", { data: message } )
    },

    updateUsername: function(user) {
      this.chat.emit( "newName", { data: user } )
    },

    changeRoom: function(data) {
      this.chat.emit("updateRoom", { room: data } );
    },

    changeColor: function(data) {
      this.chat.emit( "newColor", { color: data } );
    }

  };

})(this);