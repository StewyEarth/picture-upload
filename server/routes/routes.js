const path = require("path");
const mysql = require('../config/mysql');
module.exports = (app) => {

   app.get('/', async (req, res, next) => {

      res.render('home', {

      });
   });

   app.post('/upload', async (req, res, next) => {
      console.log(req.files.imgupload)
      let uploadedPic = req.files.imgupload;
      if (typeof uploadedPic != "undefined" && uploadedPic.name != "") {

         let upload_location = path.join(__dirname, "..", "..", "public", "img", "uploads", uploadedPic.name);

         uploadedPic.mv(upload_location, (err) => {
            if (err) {
               console.log("No way dude");
            } else {
               console.log("yes way dude");
            };
         });
      };
      res.redirect("/");
   });


};