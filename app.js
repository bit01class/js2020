var express    = require('express');
var mysql      = require('mysql');
var dbconfig   = require('./config/database.js');
var connection = mysql.createConnection(dbconfig);

var app = express();

// configuration ===============================================================
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
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