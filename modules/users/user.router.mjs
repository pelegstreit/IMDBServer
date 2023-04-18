import { Router } from "express";
import userModel from "./user.model.mjs";
import movieModel from "../movie/movie.model.mjs";
import express from 'express';
import raw from '../../middleware/route.async.wrapper.mjs';

const router=express.Router();

//define middlewawre
router.use(express.json());

//defnie founctions-
//create user
router.post('/', raw( async (req,res)=>{
    console.log(req.body);
    const user = await userModel.create(req.body);
    res.status(200).json(user);
}));

//get all users
router.get('/', raw(async (req,res)=>{
    const users= await userModel.find();
    res.status(200).json(users)
}))

//get user by ID
router.get('/:id', raw (async (req,res)=>{
    const user= await userModel.findById(req.params.id);
    res.status(200).json(user)
}))

//update user by ID
router.put('/:id',raw(async (req,res)=>{
    const user= await userModel.findByIdAndUpdate(req.params.id,req.body,{
        new:true, upsert:false
    });
    // for (let movieID of req.body.movie){
    //     let movie = await movieModel.findById(movieID);
    //     list.user = user;
    //     await list.save
    // }
    res.status(200).json(user)
}))


//merge user by ID
router.patch('/:id', raw(async (req,res)=>{
    const user= await userModel.findByIdAndUpdate(req.params.id,req.body,{
        new:true, upsert:false
    });
    // for (let listID of req.body.list){
    //     let list = await listModel.findById(listID);
    //     list.user = user;
    //     await list.save
    // }
    res.status(200).json(user)
}))


//delete user
router.delete('/:id',raw(async (req,res)=>{
    const user= await userModel.findByIdAndRemove(req.params.id);
    // for (let listID of req.body.list){
    //     let list = await listModel.findByIdAndRemove(listID);
    //     await list.save
    // }
    res.status(200).json(user);
}))

export default router;