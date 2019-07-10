var mongoose = require("mongoose"),
Campground   = require("./models/Campground"),
Comment      = require("./models/comment");

var data = [
        {
            name: "Cloud's Rest", 
            image: "https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419__340.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }, 
        {
            name: "Desert cloud", 
            image: "https://cdn.pixabay.com/photo/2016/06/06/08/32/tent-1439061__340.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "Canyon Floor", 
            image: "https://cdn.pixabay.com/photo/2016/09/18/18/18/tent-camping-1678714__340.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    ]


function seedDB(){
    // REMOVE ALL CAMPGROUNDS
     Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("REMOVED Campground");
         // ADD A FEW CAMPGROUNDS\
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("added a campground");
                    // CREATE COMMENT
                    Comment.create(
                        {
                            text: "This place is great but i wish there was internet!",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                        });
                }
            });
        });
    });   
}
module.exports = seedDB;