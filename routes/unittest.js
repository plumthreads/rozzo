var assert = require('assert');
const postjs = require('./post')
const file = require('fs')
it('should return the text from the image', async function () {
        //file.readFile('../sample/almond_milk_ing.jpg',(err,image)=>{
        //    let text=postjs.textdetect(image)
        //    console.log(text);
        //})
        var text =  await postjs.textdetect('../sample/kitkat_wasabi_ing.jpg')
        await console.log(text);
    }); 