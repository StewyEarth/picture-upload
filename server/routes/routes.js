const path = require("path");
const mysql = require('../config/mysql');
const sharp = require("sharp");
const fs = require("fs");
const uuidv4 = require('uuid/v4');

function generateUniueFilename(filename) {
   return uuidv4() + path.extname(filename)
}

module.exports = (app) => {

   app.get('/', async (req, res, next) => {

      res.render('home', {

      });
   });
   app.get('/pics', async (req, res, next) => {
      let images = []
      let mappe = path.join(__dirname, "..", "..", "public", "img", "uploads", "thumbs")
      fs.readdir(mappe, (err, files) => {
         if (err) {
            console.log(err)
         } else {
            files.forEach(file => {
               console.log(path.extname(file))
               if (path.extname(file) == ".jpg" || path.extname(file) == ".png") {
                  images.push(file)
               }
            })
         }
         res.render('pics', {
            images: images,
         });
      })
   });
   app.get('/dbpics', async (req, res, next) => {
      let db = await mysql.connect();
      let [images] = await db.execute("SELECT * FROM images");
      db.end()
      res.render('dbpics', {
         images: images,
      });
   });

   app.post('/upload', async (req, res, next) => {

      if (req.files != null) {
         let uploadedPic = req.files.imgupload;

         if (typeof uploadedPic != "undefined" && uploadedPic.name != "") {

            let filename = generateUniueFilename(uploadedPic.name)
            let upload_location = path.join(__dirname, "..", "..", "public", "img", "uploads", filename);

            uploadedPic.mv(upload_location, (err) => {
               if (err) {
                  console.log("No way dude");
               } else {
                  if (path.extname(upload_location) == ".jpg" || path.extname(upload_location) == ".png") {
                     let resized_location = path.join(__dirname, "..", "..", "public", "img", "uploads", "thumbs", filename)
                     sharp(upload_location)
                        .resize(200)
                        .grayscale()
                        .toFile(resized_location)
                        .then(async () => {
                           let db = await mysql.connect();
                           let result = await db.execute(`
                           INSERT INTO images
                           SET name = ?, 
                           imgName = ?
                           ` , [req.body.name, filename]);
                           db.end()
                           console.log("Picture Resized")
                        })
                  }
               };
            });
         };
      }
      res.redirect("/");
   });


};