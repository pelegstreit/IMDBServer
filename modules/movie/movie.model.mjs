import mongoose from "mongoose";
const {Schema, model} = mongoose;

export const MovieSchema = new Schema({
    movieId: {type:String, required: true},
    movieName: {type:String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'user'}
},{timestamps: true})

        

export default model('movie', MovieSchema);