default: 
	browserify src/* -o js/
	browserify ourtest.js -o woo.js