var fs = require('fs');
var xml2js = require('xml2js');
var _ = require('underscore');
var parser = new xml2js.Parser();

var images = {};
var imagesAttr = {};



fs.readFile(__dirname + '/right_buildings.xml', function (err, data) {
	parser.parseString(data, function (err, result) {

		for (var i = 0; i < result.annotations.image.length; i++) {
			images[result.annotations.image[i].$.id] = result.annotations.image[i];
		}

		for (var indexstr in images) {
			var currentImagen = images[indexstr];
			var currentImagenBoxes = currentImagen.box;
			var index = parseInt(indexstr);
			imagesAttr[indexstr] = [];
			for (let d = 0; d < currentImagenBoxes.length; d++) {
				const box = currentImagenBoxes[d];
				var attr = fix_attributes(box.attribute);
				imagesAttr[indexstr].push(attr);
			}
		}

		var weird = 0
		for (i = 1; i < Object.keys(imagesAttr).length; i++) {
			var previewElement = Object.values(imagesAttr)[i - 1];
			var element = Object.values(imagesAttr)[i];
			var nextElement = Object.values(imagesAttr)[i + 1];
			// console.log(previewElement)
			// console.log(element)
			// console.log(nextElement)
			if ((JSON.stringify(previewElement.sort()) !== JSON.stringify(element.sort())) && (JSON.stringify(element.sort()) !== JSON.stringify(nextElement.sort()))) {
				weird++;
				console.log('They are no equal!');
				var a = Object.entries(imagesAttr)[i - 1];
				var b = Object.entries(imagesAttr)[i];
				var c = Object.entries(imagesAttr)[i + 1];
				console.log(a)
				console.log(b)
				console.log(c)

			}
		}
		console.log("Diferencias: "+weird)
	});
});

function fix_attributes(attributes) {
	var fix_attr = {}

	for (let i = 0; i < attributes.length; i++) {
		const attribute = attributes[i];
		// console.log('=======')
		var key = attribute.$.name;
		var value = attribute._;

		// console.log(key,value)
		fix_attr[key] = value;
	}
	return `${fix_attr.material}-${fix_attr.design}-${fix_attr.construction}`
}