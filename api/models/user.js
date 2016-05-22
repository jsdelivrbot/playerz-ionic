//user schema

'use strict'

var moogoose = require('mongoose');
var Schema = moogoose.Schema;
var bcrypt = require('bcrypt');


//User model

var UserSchema = new Schema({
    
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    connected: String, // facebook or jwt 
    country: String,
    description: String,
    genre: String,
    created_at: Date,
    sport: String,
    type: String // coach, player
    
});

//trigger before sava user schem
UserSchema.pre('save', function (next){
    var user = this;
    
    if(user.password){
	if(this.isModified('password') || this.isNew){
	    bcrypt.genSalt(10, function(err, salt){
		if(err){
		    return next(err);
		}
		bcrypt.hash(user.password, salt, function(err, hash){
		    if(err){
			return next(err);
		    }
		    user.password = hash;
		    next();
		});
	    });
	} else {
	    return next();
	}
    } else{
	return next();
    }

});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


exports.userSchema = UserSchema;
