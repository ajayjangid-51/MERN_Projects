import express from "express";
const app = express();
app.get("/", (req, res, next) => {
	// res.cookie("ajay", "given by ajay").status(202).json({
	// 	key1: "value1",
	// 	key2: "value2",
	// });
	req.user = { key1: "valu1", key2: "value2" };
	res.send("hello");
});

app.listen(8080, () => {
	console.log("okay server started");
});
