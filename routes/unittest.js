var assert = require('assert');
const post = require('./post')
var image = require('../sample/almond_milk_ing')
describe('Basic ML Image Test', function () {
    it('should return the text from the image', function () {
           textdetect(image)
       }); 
   });