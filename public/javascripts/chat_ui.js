(function(root) {

  var ChatApp = root.ChatApp = (root.ChatApp || {});

  var ChatUI = ChatApp.ChatUI = function() {

    this.chatsocket = new ChatApp.ChatSocket();
    this.$messages = $('#messages');

    var chatui = this;

    $("#submit").on("click", function(event) {
      event.preventDefault();
      var text = $("#compose").val();
      var nickreg = new RegExp("^\/nick ");
      var joinreg = new RegExp("^\/join ");
      var colorreg = new RegExp("^\/color ");

      if ( text.match(nickreg) ) {
        chatui.chatsocket.updateUsername(text.replace(nickreg, ""));
      } else if ( text.match(joinreg) ) {
        chatui.chatsocket.changeRoom(text.replace(joinreg, ""));
      } else if ( text.match(colorreg) ) {
        chatui.chatsocket.changeColor(text.replace(colorreg, ""));
      } else {
        chatui.chatsocket.sendMessage(text);
      }

      $("#compose").val("");
    });

    this.chatsocket.chat.on("newMessage", function(raw) {
      var $li = $('<li>').text('[' + raw.user + ']: ' + raw.data).css("color", raw.color);
      chatui.$messages.append($li);
    });

    this.chatsocket.chat.on("names", function(data) {
      $("#all-users").empty();

      for(var key in data.names) {
        var $li = $('<li>').text(data.names[key])
        $("#all-users").append($li);
      }
    });

    this.chatsocket.chat.on("leave", function(data) {
      var $li = $('<li>').text(data.name + ' has left the room.');
      chatui.$messages.append($li);
    });

    this.chatsocket.chat.on("newRoom", function(data) {
      var $li = $('<li>').text('Joined ' + data.room );
      chatui.$messages.append($li);
    });

    this.getNicknames();

  };

  ChatUI.prototype = {
    getNicknames: function () {
      this.chatsocket.chat.emit("getAllNicknames");
    }
  };


})(this);