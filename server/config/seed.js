/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Book = require('../api/book/book.model')


var testBookshelf = [{
    'thumb':'http://books.google.it/books/content?id=gUhE8po4jgAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    'title':'The C++ Standard Library',
    'pages':'1099',
    'publisher':'Addison-Wesley Professional',
    'year':'2012',
    'isbn_13': '9780321623218',
    'isbn_10': '0321623215',
    'categories': ['Computers'],
    'authors': ['Nicolai M. Josuttis']
  }, {
    'thumb':'http://books.google.it/books/content?id=dSzHnI1QGywC&printsec=frontcover&img=1&zoom=5&source=gbs_api',
    'title':'Thinking in C++',
    'pages':'814',
    'publisher':'Pearson P T R',
    'year':'2000',
    'isbn_10':'0139798099',
    'isbn_13':'9780139798092',
    'categories':['Computers'],
    'authors':['Bruce Eckel']
  }, {
    'thumb':'http://books.google.it/books/content?id=mDzDBQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    'title':'Eloquent JavaScript, 2nd Ed.',
    'pages':'472',
    'publisher':'No Starch Press',
    'year':'2014',
    'isbn_13':'9781593275846',
    'isbn_10':'1593275846',
    'categories':['Computers'],
    'authors':['Marijn Haverbeke']
  }, {
    'thumb':'http://books.google.it/books/content?id=3HxcZPXLLUEC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    'title':'Mastro-don Gesualdo',
    'pages':'434',
    'publisher':'Giunti Editore',
    'year':'2004',
    'isbn_10':'8809033868',
    'isbn_13':'9788809033863',
    'categories':['Fiction'],
    'authors':['Giovanni Verga']
  }, {
    'thumb':'http://books.google.it/books/content?id=rorlAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    'title':'Principles of Object-Oriented JavaScript',
    'pages':'120',
    'publisher':'No Starch Press',
    'year':'2014',
    'isbn_13':'9781593275402',
    'isbn_10':'1593275404',
    'categories':['Computers'],
    'authors':['Nicholas C. Zakas']
  }, {
    'thumb':'http://books.google.it/books/content?id=v2ftnQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
    'title':'Practical Node.js',
    'pages':'300',
    'publisher':'Apress',
    'year':'2014',
    'isbn_10':'1430265957',
    'isbn_13':'9781430265955',
    'categories':['Computers'],
    'authors':['Azat Mardan']
}];


User.find({}).remove(function() {
  User.create(
    {
      provider: 'local',
      name: 'John',
      email: process.env.JOHN_EML || 'john@test.com',
      password: process.env.JOHN_PWD ||'john'
    }, {
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function(err, john) {
    console.log('Finished populating Users ...');
    Book.find({}).remove(function() {
      var uid = john._id;
      testBookshelf = testBookshelf.map(function(book) {
        book.owner = uid;
        return book;
      });
      Book.create(testBookshelf, function(err,data) {
        console.log('Finished populating John\'s Books !');
      })
    });
    }
  );
});
