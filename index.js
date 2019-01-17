var fs = require('fs');
var xml2js = require('xml2js');

var _ = require('underscore');

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/right.xml', function(err, data) {
	parser.parseString(data, function(err, result) {

		for (var i = 0; i < result.annotations.image.length; i++) {


			if (!_.isArray(result.annotations.image[i].box)) {
				console.log(result.annotations.image[i].box);
			}
		}


	});
});