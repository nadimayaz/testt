var mongoose = require('mongoose');

try{
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
mongoose.Promise = global.Promise;
console.log("Hello");
var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
    console.log("Inside save!");
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});
}
catch(e){
    console.log(e.String);
}