const express = require("express");
const app = express();
const cors = require("cors");
const { PORT } = require("./config/constants");
const adminRoutes = require("./routes/admin.routes");
const customerRoutes = require("./routes/customer.routes");
const artistRoutes = require("./routes/artist.routes");
const path = require("path");
const { s3Uploadv2 } = require("./utils/s3Service");
const multer = require("multer");
const socketCode = require('./utils/socket');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "/public")));

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000000, files: 2 },
});

app.post("/api/upload", upload.array("file"), async (req, res) => {
  console.log("err", req?.files);
  try {
    const results = await s3Uploadv2(req.files);
    console.log(results);
    return res.json({ ...results[0] } ?? []);
  } catch (err) {
    console.log(err);
  }
});


//Database
require("./config/database");

//routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/artist", artistRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is listing to port ${PORT}`);
});
socketCode(server);