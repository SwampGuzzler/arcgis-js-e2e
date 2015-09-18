import declare from 'dojo/_base/declare';

import _WidgetBase from 'dijit/_WidgetBase';
import _TemplatedMixin from 'dijit/_TemplatedMixin';

import topic from 'dojo/topic';

import Map from 'esri/map';

import FeatureLayer from 'esri/layers/FeatureLayer'
import Polygon from 'esri/geometry/Polygon'
import SimpleFillSymbol from 'esri/symbols/SimpleFillSymbol'
import SimpleLineSymbol from 'esri/symbols/SimpleLineSymbol'
import Color from 'esri/Color'
import Graphic from 'esri/graphic'


export default declare([
  _WidgetBase, _TemplatedMixin
], {

  templateString: '<div class="map-node"></div>',

  postCreate() {
    var node = this.domNode;
    var mapOptions = this.get('mapOptions');
    var map = new Map(node, mapOptions);
    topic.subscribe('map-ready', this.onMapReady.bind(this));
    map.on('load', () => topic.publish('map-ready', { map }));
    this.set('map', map);
  },

  onMapReady() {

  	var featureCollection = {
	  "featureSet": {
	    "features": [
	   //  	{
    //           "attributes": {
    //               "Name": "1"
    //           },
    //           "geometry": {
    //             {
				// 	"rings" : [ 
				// 	 [ [-97.06138,32.837], [-97.06133,32.836], [-97.06124,32.834], [-97.06127,32.832], [-97.06138,32.837] ], 
				// 	 [ [-97.06326,32.759], [-97.06298,32.755], [-97.06153,32.749], [-97.06326,32.759] ]
				// 	],
				// 	"spatialReference" : {"wkid" : 4326}
				// }
    //           }
    //       	},
	    ],
	    "geometryType": "esriGeometryPolygon"
	  }
	};

	featureCollection.layerDefinition = {
      "geometryType": "esriGeometryPolygon",
      "objectIdField": "ObjectID",
      // "drawingInfo": {
      //   "renderer": {
      //     "type": "simple",
      //     "symbol": {
      //       "type": "esriPMS",
      //       "url": "images/flickr.png",
      //       "contentType": "image/png",
      //       "width": 15,
      //       "height": 15
      //     }
      //   }
      // },
      "fields": [{
        "name": "ObjectID",
        "alias": "ObjectID",
        "type": "esriFieldTypeOID"
      }]
    };


	var jsonfl = new FeatureLayer(featureCollection, {
      'id': 'jsonfl'
    });

	this.map.addLayer(jsonfl)

	var poly = new Polygon({"rings":
        [
          [[-11214840,4858704],[-10520181,4853812],[-10510397,4149368],[-11219732,4144476],[-11214840,4858704]], // ring #1, poly with two holes
          [[-11097433,4770648],[-10916430,4770648],[-10916430,4609213],[-10984918,4560294],[-11097433,4614105],[-11097433,4770648]], // ring #2, a hole
          [[-10779455,4472238],[-10622912,4349939],[-10750103,4242315],[-10833267,4296127],[-10779455,4472238]],  // ring #3, another hole
          [[-11298004,4614105],[-11293112,4310803],[-11571954,4305911],[-11542602,4584753],[-11298004,4614105]] // ring #4, western polygon
        ],
        "spatialReference":{"wkid":102100}
      });



  	var polySymbolRed = new SimpleFillSymbol(
        SimpleLineSymbol.STYLE_SOLID,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
          new Color([0, 0, 0, 1]), 1),
        new Color([255, 0, 0, 0.2]));

  	var graphic = new Graphic(poly,polySymbolRed)

  	var center = poly.getCentroid()

    jsonfl.add(graphic)

    this.map.centerAndZoom(center, 7)



  }

});
