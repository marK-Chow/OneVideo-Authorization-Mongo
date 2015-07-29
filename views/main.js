_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

$(document).ready(function () {

    $('ul.nav > li').click(function (e) {

        $('ul.nav > li').removeClass('active');

        $(this).addClass('active');


    });
});

var VideoModel = Backbone.Model.extend({
    defaults: {
        "id": 0,
        "vid": "09R8_2nJtjg",
        "vname": "Sugar"
    },
    getVid: function () {
        return this.get("vid");
    },
    getVName: function () {
        return this.get("vname");
    }
});
var VideoCollection = Backbone.Collection.extend({
    model: VideoModel
});

//demo data
var video1 = new VideoModel();
var video2 = new VideoModel({
    "id": 1,
    "vid": "bXlrqQKbjSM",
    "vname": "Remember"
});
var video3 = new VideoModel({
    "id": 2,
    "vid": "Ktj1j2lfCyg",
    "vname": "Chacun"
});
var video4 = new VideoModel({
    "id": 3,
    "vid": "hkNkaBrZez4",
    "vname": "C'est La Vie"
});
var video5 = new VideoModel({
    "id": 4,
    "vid": "Hx045zhgiqI",
    "vname": "OLA!!!"
});
var videos = new VideoCollection([video1, video2, video3, video4, video5]);
var collectVideos = new VideoCollection([video1, video2, video3, video4]);

var random_id1 = Math.floor(Math.random() * 5);
var random_id2 = Math.floor(Math.random() * 5);

//Home page view, random video
var VideoView = Backbone.View.extend({
    el: $("#video-view"),
    render: function () {
        var video = videos.get(random_id1);
        var template = _.template($("#video-view-template").html())({video: video});
        this.$el.html(template);
        return this;
    }
});

var PastView = Backbone.View.extend({
    el: $("#video-view"),
    render: function () {
        var video = videos.get(random_id2);
        var template = _.template($("#past-view-template").html())({video: video});
        this.$el.html(template);
        return this;
    }
});

//User collection list
var CollectionItemView = Backbone.View.extend({
    tagName: "div",
    videoItemTmeplate: _.template($("#collection-view-template").html()),
    render: function () {
        this.$el.html(this.videoItemTmeplate(this.model.toJSON()));
        return this;
    }
});
var CollectionView = Backbone.View.extend({
    model: collectVideos,
    el: $("#video-view"),
    tagName: "div",
    render: function () {
        var video = new VideoModel();
        var template = _.template($("#collection-header-template").html());
        this.$el.html(template);
        this.model.each(function (video) {
            var collectionItemView = new CollectionItemView({model: video});
            this.$el.append(collectionItemView.render().el);
        }, this);

        return this;
    }
});

var Router = Backbone.Router.extend({
    routes: {
        "": "home",
        "past": "past",
        "collection": "collection",
        "login": "login"
    }
});

var router = new Router();

//Routers
router.on("route:home", function () {
    var videoView = new VideoView();
    videoView.render();
});

router.on("route:past", function () {
    var pastView = new PastView();
    pastView.render();
});

router.on("route:collection", function () {
    var collectionView = new CollectionView();
    collectionView.render();
});


Backbone.history.start();
