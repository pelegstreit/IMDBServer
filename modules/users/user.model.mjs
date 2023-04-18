import mongoose from "mongoose";
import {MovieSchema} from "../movie/movie.model.mjs";

const {Schema, model} = mongoose;


export const UserSchema = new Schema({
    name: {type:String, required: true},
    mail: {type:String, unique:true, required: true},
    password:{type:String, required:true},
    // movie: [MovieSchema],
    movie:{type:Array},
},{timestamps: true});



export default model('user', UserSchema);