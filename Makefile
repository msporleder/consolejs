all: consolejs.js index.html
	jslint --browser --indent=2 --color consolejs.js
	jslint --browser --indent=2 --color index.html
