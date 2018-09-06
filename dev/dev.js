const express = require("express");
const path = require("path");

const app = express();
const port = 4000;
app.use(express.static(path.join(__dirname, "..")));
app.listen(port, () => console.log(`Sonalus started on localhost:${port}`));
