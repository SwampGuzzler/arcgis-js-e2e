define(function(require) {
  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var View = require('app/components/map/MapView');
  var topic = require('dojo/topic');
  var on = require('dojo/on');
  var dojo = require('dojo');
  var assert = require('intern/chai!assert');

  var mapView, handle;

  registerSuite({
    name: 'components: MapView',
    setup: function() {
      // set up test here
    },
    beforeEach: function() {
      // run before
    },
    afterEach: function() {
      // run after
      if (mapView && mapView.destroy) {
        mapView.destroy();
      }
    },
    teardown: function() {
      // destroy widget
    },
    'Component is valid': function() {
      expect(View).to.not.be.undefined;
    },
    'View publishes a valid map': function() {
      mapView = new View({
        center: [-118, 34],
        basemap: 'topo',
        zoom: 10
      });
      expect(mapView.map).to.not.be.undefined;
    }
  });
  
  registerSuite({
    name: 'async map on-ready',
    beforeEach: function() {
      // run before
      mapView = new View({
        center: [-118, 34],
        basemap: 'topo',
        zoom: 10
      });
    },
    afterEach: function() {
      // run after
      if (mapView && mapView.destroy) {
        mapView.destroy();
      }
    },


    'View adds a valid layer': function() {
      mapView.map.on('layers-add', function() {

        var layers = mapView.map.graphicLayerIds.length;
        var layer = mapView.map.getLayer(mapView.map.graphicsLayerIds[0])
        assert.equal(layers, 1,
          'There should be one graphic layer on the map');
        assert.equal(layer.id, "jsonfl",
          'The graphic layer should be our JSON features');

      })

    },
    'View contains a layer with a feature': function() {

      mapView.map.on('layers-add', function() {


        var layer = mapView.map.getLayer(mapView.map.graphicsLayerIds[0])

        mapView.map.on('graphic-draw', function(graphic) {
          console.log('graphic')
          console.log(g)
          // assert.equal(layers, 1,
          //   'There should be one graphic layer on the map');
          // assert.equal(layer.id, "jsonfl",
          //   'The graphic layer should be our JSON features');

        })

      })

    },
    // 'Async stuff should work': function() {

    //   var dfd = this.async(10000);
    //   mapView.map.on('layers-add', dfd.callback(function() {
    //     expect(mapView.map).to.not.be.undefined;
        
    //   }));

    //     // var layer = mapView.map.getLayer(mapView.map.graphicsLayerIds[0])

    //     // mapView.map.on('graphic-add', function(graphic) {
    //     //   console.log('graphic')
    //     //   console.log(g)
    //     //   // assert.equal(layers, 1,
    //     //   //   'There should be one graphic layer on the map');
    //     //   // assert.equal(layer.id, "jsonfl",
    //     //   //   'The graphic layer should be our JSON features');

    //     // })

    //   // })

    // },

  });


});
