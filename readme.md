Serverside tumbnail og original billede

Modul
Express-fileupload

req.files.(navnpåfelt)

enctype="multipart/formdata"

let billede = req.files

billede.mv()

let upload_location = path.join(__dirname,"..","public","img","uploads",billede.name)

billede.mv(upload_location,(err)=>{
if(err){

}else{
    
}
})

const fs = require("fs")
let mappe = path.join(__dirname,"..","public","img","uploads","thumbs",billede.name)
fs.readdir(mappe,(err,files)=>{
let images = []
if (err){

}else{
    files.forEach(file =>{
        if (path.extname(file) == ".jpg" || path.extname(file) == ".png"){
            images.push(file)
        }
    })
}
})