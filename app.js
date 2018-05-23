
const axios=require('axios');
const express=require('express');
const mongoose=require('mongoose');
const hbs=require('hbs');
const fs=require('./')
const each =require('foreach');
const searchTerm=require('./models/searchTerm');
var images=require('./searchImage/image.js');


mongoose.connect(process.env.MONGOLAB_URI ||'mongodb://localhost/image-search-api');

var app=express();

var port=process.env.PORT||3000;
app.set('view engine','hbs');


app.get('/',(req,res)=>{
	res.render('index.hbs',{
		Name:"Tanya jain"
	});
	});



app.get('/recentsearch',(req,res,next)=>{

	searchTerm.find({},(err,data)=>{
		res.json(data);
	});
	 });
	

 app.get('/imagesearch/:searchVal',(req,res)=>{
 
 var {searchVal}=req.params.searchVal;
var offset=req.query.offset
//console.log(req.query);	 
	var data=new searchTerm({
		searchVal,
		offset
	});

	data.save(err=>{
		if(err){
		return 	res.send('Error in Saving to Database');
		}
	//	res.json(data);
	});
	images.getimages(searchVal,offset,(errorMessage,imageResults)=>{
		if(errorMessage){
			message:"errorMessage"
		} else {
	  
 res.json(imageResults.links);
		}

	   });
	});



app.listen(port,()=>{
	console.log(`server is up on port ${port}`);
});


