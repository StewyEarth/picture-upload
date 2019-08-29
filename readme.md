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