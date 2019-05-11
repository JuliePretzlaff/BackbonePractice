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

// View
var SongView = Backbone.View.extend({
  tagName: 'li',
  render: function() {
    this.$el.html(this.model.get('title'));
    return this;
  }
});

// instantiate a model
var song = new Song({ title: 'Daisy Mae', year: 'Now' });

// View
var SongsView = Backbone.View.extend({
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
  new Song({ title: 'Julie Mae' }),
  new Song({ title: 'Mother Mae' })
]);

// instantiate view of a model
var songView = new SongView({ el: '#songs', model: song });
songView.render();

// instantiate view of a collection
var songsView = new SongsView({ el: '#songs', model: songs });
songsView.render();
