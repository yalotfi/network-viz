let express = require('express');
let path = require('path');

let app = express();
let http = require('http').Server(app);

app.use(express.static(path.join(__dirname, 'public')));

http.listen(8080, () => {
	console.log('listening on port 8080');
});
