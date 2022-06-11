const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  //TODO: define the correct schema here
  company: {
    type: String,
    // unique: true,
    // required: true
  }
});
//
// userSchema.pre('save', function (next) {
//   // we use "function" instead of () =>.. because we want access to "this"
//   const user = this;
//   if (!user.isModified('password')) {
//     return next;
//   }
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//       return next(err);
//     }
//
//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) {
//         return next(err);
//       }
//
//       user.password = hash;
//       next();
//     });
//   });
// });
//
// userSchema.methods.comparePassword = function (candidatePassword) {
//   const user = this;
//
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
//       if (err) {
//         return reject(err);
//       }
//
//       if (!isMatch) {
//         return reject(false);
//       }
//
//       resolve(true);
//     });
//   });
// };
mongoose.model('Job', jobSchema);


