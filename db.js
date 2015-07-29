
var mongo = require("mongodb");
var monk = require("monk");
var db = monk("127.0.0.1:27017/youtubeID");

module.exports.collections = {
    users: db.get("users"),
    videos: db.get("youtubeID")
};