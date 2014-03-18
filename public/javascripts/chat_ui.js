(function(root) {
  var Room = root.Room = (root.Room || {});
  var ChatUI = Room.ChatUI = function() {

    this.chat = new Room.Chat();
    this.$messages = $('#messages');

    var chatui = this;
    $("#submit").on("click", function(event) {
      event.preventDefault();
      var text = $("#compose").val();
      chatui.chat.sendMessage(text);
      $("#compose").val("");
    });

    this.chat.room.on("update", function(raw) {
      var $li = $('<li>').text('[' + raw.user + ']: ' + raw.data);
      chatui.$messages.append($li);
    });

  };

  ChatUI.prototype = {

  };


})(this);