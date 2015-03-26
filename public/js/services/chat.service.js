var app = angular.module('andehush.services');
app.factory('Chat', [function() {
  var roomPrefix = 'ah-room-';
  var ls = window.localStorage;
  if (!ls) {
    throw new Error("localStorage is not supported by your web browser");
  }

  var getFromStorage = function(key) {
    return ls.getItem(key, null);
  };

  return {
    generateRoomId: function(room) {
      var key = Math.floor(Math.random() * 10000).toString() + "-" + ((new Date()).getTime()).toString();
      var roomId = roomPrefix + room;
      ls.setItem(roomId, key);
      
      return {
        roomId: roomId,
        key: key
      };
    },

    getRoomKey: function(room) {
      var roomId = roomPrefix + room;
      var roomKey = getFromStorage(roomId) || this.generateRoomId(room).key
      return roomKey;
    }
  }

}])
