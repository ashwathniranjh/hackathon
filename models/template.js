const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const templateSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  category:{
      type: Schema.Types.ObjectId,
      ref: 'Category'
  },
  description: {
    type: String,
    default: ''
  },
  images: {
   
       type:  {
            type:String,
            required: true
        },
        images:
            {
                type: String
            }
         
    },
//   lists:{
//     object: {
//         title:{
//             type: String,
//             required: true
//         },
//         items:[
//             {
//                 type: String,
//             }
//         ]
//     }
//   },
  user:{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }
},
{
  timestamps:true
});



module.exports = mongoose.model('Template', templateSchema);
