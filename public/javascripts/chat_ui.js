(function(root) {
  var Room = root.Room = (root.Room || {});
  var ChatUI = Room.ChatUI = function() {

    this.chat = new Room.Chat();
    this.$messages = $('#messages');

    var chatui = this;

    $("#submit").on("click", function(event) {
      event.preventDefault();
      var text = $("#compose").val();
      var reg = new RegExp("^\/nick ");

      if ( text.match(reg) ) {
        chatui.chat.updateUsername(text.replace(reg, ""));
      } else {
        chatui.chat.sendMessage(text);
      }

      $("#compose").val("");
    });

    this.chat.room.on("newMessage", function(raw) {
      var $li = $('<li>').text('[' + raw.user + ']: ' + raw.data);
      chatui.$messages.append($li);
    });

    this.chat.room.on("names", function(data) {
      $("#all-users").empty();

      for(var key in data.names) {
        var $li = $('<li>').text(data.names[key])
        $("#all-users").append($li);
      }
    });

    this.getNicknames();

  };

  ChatUI.prototype = {
    getNicknames: function () {
      this.chat.room.emit("getAllNicknames");
    }
  };


})(this);