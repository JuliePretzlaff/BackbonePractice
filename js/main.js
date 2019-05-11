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
    this.$el.html(this.model.get('title'));
    this.$el.attr('id', this.model.id);
    return this;
  }
});

// instantiate a model
var song = new Song({ title: 'Daisy Mae', year: 'Now' });

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
  new Song({ id: 1, title: 'Julie Mae' }),
  new Song({ id: 2, title: 'Mother Mae' }),
  new Song({ id: 3, title: 'Foobar' })
]);

// instantiate view of a model
var songView = new SongView({ el: '#songs', model: song });
songView.render();

// instantiate view of a collection
var songsView = new SongsView({ el: '#songs', model: songs });
songsView.render();
