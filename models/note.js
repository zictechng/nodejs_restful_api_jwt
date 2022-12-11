const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const noteSchema = new Schema({
    title: {type: String, require: true},
    content: {type: String, require: true},
    description: {type: String, require: true},
    category:{
        type: String,
        require: true,
        enum: ['GENERAL', 'IDPROOF', 'PROFESSIONAL']
    },
    createdBy: {type: Schema.Types.ObjectId, ref: 'user'}, // this will get the current user ID and save it 
    // with the data when creating this details.
    createdOn: {type: Date, default: Date.now},
});

// then export this model
module.exports = mongoose.model('note', noteSchema);