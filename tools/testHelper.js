/**
 * Created by ebinhon on 1/20/2017.
 */
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var baseDOM = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>';
var jsdom = require('jsdom').jsdom;
global.document = jsdom(baseDOM);
global.window = document.defaultView;
if (global.self != null) {
  console.log(' global.self >>>>> ' + global.self);
} else {
  global.self = global.this;
}
global.navigator = {
  userAgent: 'node.js'
};
