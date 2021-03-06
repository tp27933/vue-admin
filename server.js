// 引入express框架
const express = require('express');
let request = require('request');
// 创建web服务器
const app = express();
// 路径处理模块
const path = require('path');
const bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
const multer = require('multer');
const fs = require('fs');

if (process.env.NODE_ENV == 'production') {
  mongoose
    .connect(
      'mongodb+srv://tp27933:tp2793371@cluster0.cgthg.mongodb.net/<dbname>?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('success'))
    .catch(err => console.log(err, 'fail')); //此处改为mongodb Atlas上的字段码
} else {
  mongoose
    .connect('mongodb://localhost/user', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('success'))
    .catch(err => console.log(err, 'fail')); //此处改为mongodb Atlas上的字段码;
}

function tran_val(val) {
  if (val < 10) {
    val = '0' + val;
  }
  return val;
}
function formateDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = tran_val(date.getMonth() + 1);
  var day = tran_val(date.getDate());
  var datestr = year + '-' + month + '-' + day;
  console.log('txt' + ' ' + datestr);
  return datestr;
}

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  gender: String,
  cardNumber: {
    type: Number,
    unique: true,
    require: true,
    dropDups: true
  },
  phoneNumber: {
    type: Number,
    unique: true,
    dropDups: true
  },
  level: String,
  amount: Number,
  note: String,
  avatar: String
});
var userHistorySchema = new mongoose.Schema({
  name: String,
  cardNumber: {
    type: Number,
    require: true
  },
  type: String,
  detail: Array,
  amount: Number,
  date: Date
});

const Users = mongoose.model('Users', userSchema);
const UsersHistory = mongoose.model('UsersHistory', userHistorySchema);

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploadIMGS');
  },
  filename: function(req, file, cb) {
    let extname = path.extname(file.originalname);
    filename = file.fieldname + ',' + Date.now() + extname;
    cb(null, filename);
  }
});

const upload = multer({ storage });

//申辦會員卡
app.post(
  '/signup',
  upload.single('avatar'),
  function(req, res, next) {
    req.body.photo = req.file.path;
    next();
  },
  (err, req, res, next) => {
    if (err && req.file === undefined) {
      req.body.photo = 'null';
      next();
    }
    // 錯誤處理
  }
);
app.post('/signup', (req, res) => {
  let data = req.query;
  Users.create(
    {
      name: data.name,
      gender: data.gender,
      cardNumber: data.cardNumber,
      phoneNumber: data.phoneNumber,
      level: data.level,
      amount: data.amount,
      note: data.note,
      avatar: req.body.photo
    },
    function(err) {
      if (err) {
        res.send(err);
        return;
      }
      let userHistory = new UsersHistory({
        name: data.name,
        cardNumber: data.cardNumber,
        type: data.type,
        amount: data.amount,
        date: formateDate()
      });
      res.send();
      userHistory.save();
    }
  );
  /*

  let user = new Users();
  user.save();
 */
});
//用戶儲值
app.post('/deposit', (req, res) => {
  const key = JSON.parse(req.query.key);

  Users.findOneAndUpdate(
    { cardNumber: key.cardNumber },
    { $inc: { amount: key.amount } },
    { new: true, useFindAndModify: false },
    (err, doc) => {
      if (err) {
        console.log('Something wrong when updating data!');
        res.send('Something wrong when updating data!');
        return;
      }

      let userHistory = new UsersHistory({
        name: key.name,
        cardNumber: key.cardNumber,
        type: key.type,
        amount: key.amount,
        date: formateDate()
      });
      userHistory.save();
      res.send(doc);
    }
  );
});

//用戶扣款
app.post('/withdraw', (req, res) => {
  const key = JSON.parse(req.query.key);

  //將所有金額相加
  let sum = key.detail.reduce(function(prev, next, index, array) {
    return prev + next.amount;
  }, 0);
  console.log('key' + req.query.key);
  //更新數據庫'
  Users.findOneAndUpdate(
    { cardNumber: key.cardNumber },
    { $inc: { amount: -sum } },
    { new: true, useFindAndModify: false },
    (err, doc) => {
      if (err) {
        console.log('Something wrong when updating data!');
        res.send('Something wrong when updating data!');
        return;
      }
      let userHistory = new UsersHistory({
        name: key.name,
        cardNumber: key.cardNumber,
        type: key.type,
        detail: key.detail,
        amount: sum,
        date: formateDate()
      });
      console.log('doc' + 'doc');
      userHistory.save();
      res.send(doc);
    }
  );
});

//搜尋客戶歷史紀錄
app.get('/getprofile', (req, res) => {
  Users.findOne({ name: req.query.id }).then(result => {
    if (!result || result.avatar === 'null') {
      res.send('');
      return;
    }
    // 取得圖檔完整路徑
    const imagePath = path.join(__dirname, '', result.avatar);
    // 設定回傳 Header 的資料類型為 jpg 格式的圖片
    res.set('Content-Type', 'image/jpg');
    // 讀取檔案，透過 pipe() 將檔案數據轉給回傳物件 res在瀏覽器中渲染
    fs.createReadStream(imagePath).pipe(res);
  });
});
app.post('/search', (req, res) => {
  const key = req.query.key;
  Users.findOne({ name: key }).then(result => {
    console.log('iam nonon result', result);
    res.send(result);
  });
});

//用戶儲值
app.get('/personalHistory', (req, res) => {
  const key = req.query.key;
  let number = JSON.parse(key);
  console.log(number);
  UsersHistory.find({ cardNumber: number.cardNumber })
    .sort({ $natural: -1 })
    .limit(20)
    .then(result => {
      res.send(result);
    });
});
//用戶更新
app.post('/updataUserData', (req, res) => {
  const key = req.query.key;
  let number = JSON.parse(key);
  Users.findOneAndUpdate(
    { cardNumber: number.cardNumber },
    { $set: { name: number.name, phoneNumber: number.phoneNumber, note: number.note } },
    { new: true, useFindAndModify: false }
  ).then(result => {
    console.log(result);
    res.send(result);
  });
});

app.get('/usersHistory', (req, res) => {
  const key = JSON.stringify(req.query.key) || JSON.stringify(req.query);

  if (key === '{}') {
    UsersHistory.find({})
      .sort({ $natural: -1 })
      .then(result => {
        res.send(result);
        console.log(result);
      });
  } else {
    let data = JSON.parse(req.query.key);
    let startTime = data.start;
    let endTime = data.end;
    UsersHistory.find({ date: { $gte: new Date(startTime), $lte: new Date(endTime) } })
      .sort({ $natural: -1 })
      .then(result => {
        console.log('123');
        console.log(result);
        res.send(result);
      });
  }
});

app.get('/getMemberAmount', (req, res) => {
  let data = {
    total: '',
    newToday: '',
    income: ''
  };
  UsersHistory.aggregate(
    [
      {
        $match: {
          $and: [
            { date: new Date(formateDate()) },
            {
              $or: [{ type: 'deposit' }, { type: 'signup' }]
            }
          ]
        }
      },
      {
        $group: {
          _id: 0,
          total: { $sum: '$amount' }
        }
      }
    ],
    function(err, result) {
      console.log(result);
      data.income = result.length != 0 ? result[0].total : 0;
      Users.countDocuments({ date: new Date(formateDate()) }).then(count => {
        data.newToday = count;
        Users.countDocuments().then(count => {
          data.total = count;
          res.send(data);
        });
      });
    }
  );
});
app.post('/getSms', function(req, res, next) {

  request(
    {
      url: 'http://www.web-jshtml.cn/productapi/token/getSms/',
      method: 'POST',
      json: true,
      headers: {
        'content-type': ' application/json'
      },
      body: req.body
    },
    function(error, response, body) {
      console.log(response.body);
      res.send(response.body);
    }
  );
});

app.post('/getBtn', function(req, res, next) {

  if(req.body.module){
    module='/register/'
  }else{
    module='/login/'  
  }
  request(
    {
      url: `http://www.web-jshtml.cn/productapi/token${module}`,
      method: 'POST',
      json: true,
      headers: {
        'content-type': ' application/json'
      },
      body: req.body
    },
    function(error, response, body) {
      console.log(response.body);
      res.send(response.body);
    }
  );
});

//設定server網址，因為在本機端測試，所以輸入127.0.0.1
//const hostname = '127.0.0.1'  //上傳至伺服器需拿掉
//port 號會由 Heroku 給予，因此不再自行指定
const port = process.env.PORT || 3000;

//新增一個server並指定他的頁面資訊，內容為'Hello World!'
const serveStatic = require('serve-static');
app.use(serveStatic(path.join(__dirname, 'dist')));
app.listen(port, () => {
  console.log(`
    Serve is running~
    network: localhost:${port}`);
});
