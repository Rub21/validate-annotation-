var fs = require('fs');
var xml2js = require('xml2js');
var _ = require('underscore');
var parser = new xml2js.Parser();

var images = {};
var imagesAttr = {};



fs.readFile(__dirname + '/right.xml', function (err, data) {
	parser.parseString(data, function (err, result) {

		for (var i = 0; i < result.annotations.image.length; i++) {
			images[result.annotations.image[i].$.id] = result.annotations.image[i];
		}


		for (var indexstr in images) {
			var currentImagen = images[indexstr];
			var currentImagenBoxes = currentImagen.box;
			var index = parseInt(indexstr);
			imagesAttr[indexstr]=[];
			for (let d = 0; d < currentImagenBoxes.length; d++) {
				const box = currentImagenBoxes[d];
				var attr = fix_attributes(box.attribute);
				imagesAttr[indexstr].push(attr);
			}
			// for (let i = 1; i < 6; i++) {

			// 	if (images[index + i]) {
			// 		console.log('======= next imagens ' + (index + i))
			// 		console.log(images[index + i])
			// 	}
			// }
		}


		//============================================0000
		// for (var index in imagesAttr) {

		// 	console.log(imagesAttr[index]);
		
		// }

		console.log(imagesAttr)

	});
});


function fix_attributes(attributes){
 var fix_attr ={}

	for (let i = 0; i < attributes.length; i++) {
		const attribute = attributes[i];
		// console.log('=======')
	var key = attribute.$.name;
	var value = attribute._;

	// console.log(key,value)
	fix_attr[key]=value;

		
	}
return `${fix_attr.material}-${fix_attr.design}-${fix_attr.construction}` 

}