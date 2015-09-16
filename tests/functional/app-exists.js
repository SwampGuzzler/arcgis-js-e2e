

define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    name: 'index',

    'Legend text': function () {
      return this.remote
        .get(require.toUrl('http://lucas/arcgis-js-e2e/release/'))
        .setFindTimeout(5000)
        // .findById('legend-view')
        .findByCssSelector('#esri_dijit_Legend_0_msg')
          var ll = getVisibleText()
          console.log(ll)
          .getVisibleText()
          .then(function (text) {
            assert.strictEqual(text, 'No legend',
              'Legend should display no layers');
          });
    }
  });
});