// const app = require("express")();
import express from "express";
const app = express();
app.get("/", (req, res, next) => {
	res.write("hello wordl!!");
	// next();
});

app.get("/", function (httpRequest, httpResponse, next) {
	httpResponse.write(" World !!!");
	httpResponse.end();
});
app.listen(8080, () => {
	console.log("okay server started");
});
