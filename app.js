const express = require("express");
const app = express();

app.get("/", function(req, res) {
	res.send("hi there");
});

const port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log(`listening ${port}`);
});
