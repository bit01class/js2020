var express    = require('express');
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var dbconfig   = require('./config/database.js');
var connection = mysql.createConnection(dbconfig);

var app = express();

// configuration ===============================================================
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.set('port', process.env.PORT || 3000);

app.get('/msg', function(req, res){
  res.send('Root');
});

app.get('/json', function(req, res){

  connection.query('SELECT * from Emp01', function(err, rows) {
    if(err) throw err;

    console.log('The solution is: ', rows);
    res.send(rows);
  });
});
app.get('/emp', function(req, res, next) {
	res.redirect('/emp/1');
});

app.get('/emp/add', function(req, res, next) {
	res.render('add', {title: '게시판 글쓰기'});
});
app.post('/emp/add', function(req, res, next) {
    var name=req.body.name;
    var pay=req.body.pay;
	var params=[name,pay];
	console.log(params);
	var sql="insert into emp01 (name,nalja,pay) values (?,now(),?)";
	connection.query(sql, params, function(err, rows) {
    if(err) throw err;
	res.redirect('/emp/1');
  });
});

app.get('/emp/:page', function(req, res, next) {
    var page = req.params.page;
    console.log('param:'+page);
    var sql = "select sabun,name,date_format(nalja,'%Y/%m/%d %H:%i:%s') nalja,pay from Emp01";
    connection.query(sql, function (err, rows) {
        if (err) console.error("err : " + err);
        res.render('list', {title: '게시판 리스트', rows: rows});
    }); 
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});




















