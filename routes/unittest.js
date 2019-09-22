var assert = require('assert');
const postjs = require('./post')
const file = require('fs')
it('should return the text from the image', function () {
        //file.readFile('../sample/almond_milk_ing.jpg',(err,image)=>{
        //    let text=postjs.textdetect(image)
        //    console.log(text);
        //})
        let text =  postjs.textdetect('../sample/almond_milk_ing.jpg')
        console.log(text);
    }); 