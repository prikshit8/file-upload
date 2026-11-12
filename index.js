const path = require("path");
const fs = require('fs');
const express = require("express");
const multer = require('multer');

const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        const filePath = path.join("./uploads", file.originalname);

        if (fs.existsSync(filePath)) {
            return cb(new Error("File with the same name already exists!"));
        }

        cb(null, file.originalname);
    },
    destination: function(req,file,cb){
        return cb(null, "./uploads");
    }
})

// const upload = multer({ dest: 'uploads/' });
const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post("/upload", upload.single("avatar"), (req, res) => {
  console.log(req.file);

  return res.redirect("/");
});

app.listen(PORT, () => console.log(`server is up and running on ${PORT}`));
