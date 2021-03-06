import declare from 'dojo/_base/declare';

import _WidgetBase from 'dijit/_WidgetBase';
import _TemplatedMixin from 'dijit/_TemplatedMixin';

import topic from 'dojo/topic';

import arcgisUtils from 'esri/arcgis/utils';
import mapgen from 'app/helpers/mapgenerator';

export default declare([
  _WidgetBase, _TemplatedMixin
], {

  templateString: '<div class="map-node"></div>',

  postCreate() {
    var webmapid = this.get('webmapid');
    var node = this.domNode;
    if (webmapid) {
      console.log("there is a webmap!")
      mapgen.fromWebMapAsJSON({
        webmapid,
        node
      }).then(response => {
        var map = response.map;
        this.set('map', map);
        var layers = arcgisUtils.getLegendLayers(response);
        topic.publish('map-ready', { map, layers });
      });
    }
  }

});
