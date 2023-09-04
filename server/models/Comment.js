// const mongoose = require('mongoose');
// const { Schema } = mongoose ;

// const commentSchema = new mongoose.Schema(
//   {
//     albumId: {
//         type: String,
//         required: true,
//     },
//     commentText: {
//       type: String,
//       required: true,
//       minlength: 5,
//     },
//     commentAuthor: {
//         type: String,
//         required: true, 
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//         get: (timestamp) => dateFormat(timestamp),
//     },
//     // userId: {
//     //   type: Schema.Types.ObjectId,
//     //   ref: 'User',
//     //   required: true,
//     // },
    
//   },
// );

// const Comment = mongoose.model('Comment', commentSchema);

// module.exports = Comment;
