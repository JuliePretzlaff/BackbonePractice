// model
var Song = Backbone.Model.extend({
  initialize: function() {
    console.log('A new song has been created.');
  }
});

// collection
var Songs = Backbone.Collection.extend({
  model: Song
});

// View for a model with events
var SongView = Backbone.View.extend({
  initialize: function() {
    this.model.on('change', this.render, this);
  },
  events: {
    click: 'onClick',
    'click .bookmark': 'onClickBookmark'
  },
  onClick: function() {
    console.log('Listen Clicked');
  },
  onClickBookmark: function(e) {
    e.stopPropagation();
    console.log('Bookmark clicked');
  },
  tagName: 'li',
  render: function() {
    var template = _.template($('#songTemplate').html());
    var html = template(this.model.toJSON());
    this.$el.html(html);
    this.$el.attr('id', this.model.id);
    return this;
  }
});

// instantiate a model
var song = new Song({ title: 'Daisy Mae', year: 'Now', plays: 224242 });

// View for a collection with events
var SongsView = Backbone.View.extend({
  tagName: 'ul',
  initialize: function() {
    this.model.on('add', this.onSongAdded, this);
    this.model.on('remove', this.onSongRemoved, this);
  },
  onSongAdded: function(song) {
    var songView = new SongView({ model: song });
    this.$el.append(songView.render().$el);
  },
  onSongRemoved: function(song) {
    // this.$el.find('li#' + song.id).remove();
    this.$('li#' + song.id).remove();
  },
  render: function() {
    var self = this;
    this.model.each(function(song) {
      var songView = new SongView({ model: song });
      self.$el.append(songView.render().$el);
    });
  }
});

// instantiate a collection
var songs = new Songs([
  new Song({ id: 1, title: 'Julie Mae', plays: 1 }),
  new Song({ id: 2, title: 'Mother Mae', plays: 2 }),
  new Song({ id: 3, title: 'Foobar', plays: 3 })
]);

// instantiate view of a model
var songView = new SongView({ el: '#songs', model: song });
songView.render();

// instantiate view of a collection
var songsView = new SongsView({ el: '#songs', model: songs });
songsView.render();

//ROUTER TUTORIAL:
var ArtistsView = Backbone.View.extend({
  render: function() {
    this.$el.html('ARTISTS VIEW');
    return this;
  }
});

var AlbumsView = Backbone.View.extend({
  render: function() {
    this.$el.html('ALBUMS VIEW');
    return this;
  }
});

var GenresView = Backbone.View.extend({
  render: function() {
    this.$el.html('GENRES VIEW');
    return this;
  }
});

// Create router
var AppRouter = Backbone.Router.extend({
  routes: {
    albums: 'viewAlbums',
    'albums/:albumId': 'viewAlbumById',
    artists: 'viewArtists',
    genres: 'viewGenres',
    '*other': 'defaultRoute'
  },
  viewAlbums: function() {
    var view = new AlbumsView({ el: '#container' });
    view.render();
  },
  viewAlbumById: function(albumId) {},
  viewArtists: function() {
    var view = new ArtistsView({ el: '#container' });
    view.render();
  },
  viewGenres: function() {
    var view = new GenresView({ el: '#container' });
    view.render();
  },
  defaultRoute: function() {}
});

// instantiate router & tell Backbone to listen to it
var router = new AppRouter();
Backbone.history.start();

// view for nav bar
var NavView = Backbone.View.extend({
  events: {
    click: 'onClick'
  },
  onClick: function(e) {
    var $li = $(e.target);
    router.navigate($li.attr('data-url'), { trigger: true });
  }
});

// instantiate nav view
var navView = new NavView({ el: '#nav' });
