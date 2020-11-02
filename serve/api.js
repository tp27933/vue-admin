const db = require('./model');
const multer = require('multer');
const fs = require('fs');
const app = express();

function tran_val (val) {
	if (val < 10) {
		val = "0" + val;
	} return val;
}
function formateDate () {
	var date = new Date();
	var year = date.getFullYear();
	var month = tran_val(date.getMonth() + 1);
	var day = tran_val(date.getDate());
	var datestr = year + "-" + month + "-" + day;
	console.log('txt' + ' ' + datestr);
	return datestr
}


//申辦會員卡
app.post('/signup', upload.single('avatar'), function (req, res, next) {

	req.body.photo = req.file.path;
	next()
}, (err, req, res, next) => {
	if (err && req.file === undefined) {
		req.body.photo = 'null'
		next()
	}
	// 錯誤處理


})
app.post('/signup', (req, res) => {

	let data = req.query

	db.Users.create({
		name: data.name,
		gender: data.gender,
		cardNumber: data.cardNumber,
		phoneNumber: data.phoneNumber,
		level: data.level,
		amount: data.amount,
		note: data.note,
		avatar: req.body.photo,
	})
  db.UsersHistory.create({
		name: data.username,
		cardNumber: data.cardNumber,
		type: data.type,
		amount: data.amount,
		date: formateDate(),
	})

	res.send('創建成功 ');

})
//用戶儲值
app.post('/deposit', (req, res) => {

	const key = JSON.parse(req.query.key);

	db.Users.findOneAndUpdate({ cardNumber: key.cardNumber }, { $inc: { amount: key.amount } }, { new: true, useFindAndModify: false }, (err, doc) => {
		if (err) {
			console.log("Something wrong when updating data!");
			res.send("Something wrong when updating data!");
			return;
		}
    db.UsersHistory.create({
			name: key.name,
			cardNumber: key.cardNumber,
			type: key.type,
			amount: key.amount,
			date: formateDate(),
		})
		res.send(doc);
	});

});

//用戶扣款
app.post('/withdraw', (req, res) => {
	const key = JSON.parse(req.query.key);

	//將所有金額相加
	let sum = key.detail.reduce(function (prev, next, index, array) {
		return prev + next.amount;
	}, 0)
	//更新數據庫'
	db.Users.findOneAndUpdate({ cardNumber: key.cardNumber }, { $inc: { amount: - sum } }, { new: true, useFindAndModify: false }, (err, doc) => {
		if (err) {
			console.log("Something wrong when updating data!");
			res.send("Something wrong when updating data!");
			return;
		}
		db.UsersHistory.create({
    	name: key.name,
			cardNumber: key.cardNumber,
			type: key.type,
			detail: key.detail,
			amount: sum,
			date: formateDate(),
})
		res.send(doc);
	});


});

//搜尋客戶歷史紀錄
app.get('/getprofile', (req, res) => {
	db.Users.findOne({ name: req.query.id }).then(result => {
		if (!result || result.avatar === 'null') {
			res.send('')
			return
		}
		// 取得圖檔完整路徑
		const imagePath = path.join(__dirname, '', result.avatar)
		// 設定回傳 Header 的資料類型為 jpg 格式的圖片
		res.set('Content-Type', 'image/jpg')
		// 讀取檔案，透過 pipe() 將檔案數據轉給回傳物件 res在瀏覽器中渲染
		fs.createReadStream(imagePath).pipe(res)
	})
})
app.post('/search', (req, res) => {
	const key = req.query.key;
	db.Users.findOne({ name: key }).then(result => {
		console.log('iam nonon result', result)
		res.send(result)
	})
})


//用戶儲值
app.get('/personalHistory', (req, res) => {
	const key = req.query.key;
	let number = JSON.parse(key)
	console.log(number);
	db.UsersHistory.find({ cardNumber: number.cardNumber }).limit(20).then(result => {
		res.send(result)
	})
});
//用戶更新
app.post('/updataUserData', (req, res) => {
	
	const key = req.query.key;
	let number = JSON.parse(key)
	db.Users.findOneAndUpdate({cardNumber:number.cardNumber}, {$set : {name:number.name,phoneNumber:number.phoneNumber
		,note:number.note}}, { new: true, useFindAndModify: false }).then(result => {
		console.log(result);
		res.send(result)
		})
	
});


app.get('/usersHistory', (req, res) => {
	console.log('123');
	const key = JSON.stringify(req.query.key) || JSON.stringify(req.query);

	if (key === '{}') {
		db.UsersHistory.find({}).then(result => {
		
			res.send(result)
		})

	} else {
		let data = JSON.parse(req.query.key)
		let startTime = data.start
		let endTime = data.end
		db.UsersHistory.find({ date: { $gte: new Date(startTime), $lte: new Date(endTime) } })
			.then(result => {
				res.send(result)
			})
	}
});


app.get('/getMemberAmount', (req, res) => {
	let data = {
		total: '',
		newToday: '',
		income: '',
	}
	db.UsersHistory.aggregate([
		{
			$match: {
				$and: [
					{ date: new Date(formateDate()) },
					{
						$or: [{ type: 'deposit' }, { type: 'signup' }]
					}]
			}
		},
		{
			$group:
			{
				_id: 0,
				total: { $sum: "$amount" }

			}
		}


	], function (err, result) {
		console.log(result);
		data.income = result.length != 0 ? result[0].total : 0
		db.Users.countDocuments({ date: new Date(formateDate()) }).then((count) => {
			data.newToday = count
			db.Users.countDocuments().then((count) => {
				data.total = count
				res.send(data)
			});
		});
	});


});



