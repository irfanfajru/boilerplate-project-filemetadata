var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();
// multer
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file)
  const {originalname:name,mimetype:type,size} = req.file;
  res.json({
    name,
    type,
    size
  })
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
