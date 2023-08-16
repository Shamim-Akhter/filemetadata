var express = require('express');
var cors = require('cors');
var multer = require('multer');
var upload = multer().single("upfile");
require('dotenv').config()

var app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//API to get meta data of file

app.post('/api/fileanalyse',function(req,res,next){
  upload(req,res,function(err){
      if (err instanceof multer.MulterError) {
          res.status(404).send(err + 'Upload failed due to multer error');
      } else if (err) {
          res.status(404).send(err + 'Upload failed due to unknown error');
      }
         next();
  });
}, function(req,res){
  
      const fileInformation=req.file;
      if(fileInformation === undefined){
        res.status(400).send("Please select/choose the file first before uploading");
    }
      res.status(201).send({
      name:fileInformation.originalname,
      type:fileInformation.mimetype,
      size:fileInformation.size
  });  
}
)

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname+'/views/404.html');
});


app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
