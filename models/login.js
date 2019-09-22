var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var bcrypt = require('bcrypt');

//Table for client information
var Login = new mongoose.Schema({
    username: {
        type:String,
        index:true
    },
    password: {
        type: String
    },
    weakness: {
        type: [Array]
    }
});


//before inputs are save I need to ajust or assign predetermine values
Login.pre('save', function (next) {
    var user = this;
    //For safely reason the password will be hashed
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
});

module.exports = mongoose.model('Login', Login);