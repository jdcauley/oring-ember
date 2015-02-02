import Ember from "ember";
// import DS from "ember-data";


function search(dependentKey, propertyKey, searchQueryKey, returnEmptyArray) {

  returnEmptyArray = (typeof returnEmptyArray === "undefined") ? false : returnEmptyArray;
  return Ember.computed("" + dependentKey + ".@each." + propertyKey, searchQueryKey, function() {
    var items, query;
    if (returnEmptyArray && !this.get(searchQueryKey)) {
      return Ember.A([]);
    }

    query = this.get(searchQueryKey) || '';
    query = query.toLowerCase();
    items = this.get(dependentKey) || Ember.A([]);

    return items.filter(function(item) {
      if (item.get(propertyKey)) {
        return  item.get(propertyKey).toLowerCase().indexOf(query) !== -1;
      }
    });
  });
};


export default Ember.ArrayController.extend({

  searchQuery:   null,
  searchResults: search('card', 'firstname', 'searchQuery'),

  allPosts: function(){

    return this.store.all('card');

  }.property(),

  twelve: function(){


  }

});
