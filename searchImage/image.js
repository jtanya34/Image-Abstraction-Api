const request=require('request');

var i;



var getimages=(imageof,offset,callback)=>{
  request({
  url:`https://www.googleapis.com/customsearch/v1?q=${imageof}&start=${offset}&cx=004216281983517798418%3Azsdobj0zfiq&searchType=image&key=AIzaSyDEp9o6oo-anIaKa51zQ5j8RLDSDsYUe60`,
 
     json:true
  },(error,response,body)=>{
    
    if(error ){
        callback("unable to fetch");
    } else{
        
var data=[];
for (i=0;i<10;i++){
    data.push({
        url:body.items[i].link,
        snippet:body.items[i].snippet,
        Thumbnail:body.items[i].image.thumbnailLink,
        context:body.items[i].image.contextLink
    });
}
// var imgdata=body.items;
// data=imgdata.map(function(value=>{
//     url:value.link;
//         snippet:value.snippet;
//         Thumbnail:value.image.thumbnailLink;
//         context:value.image.contextLink
// });


 }; 
     callback(undefined,{
                  links:data
              });     
});
};
   

module.exports.getimages=getimages;