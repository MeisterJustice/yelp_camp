const express = require("express");
const router  = express.Router();
const Campground = require("../models/Campground");
const middleWare = require("../middleware");


// INDEX- Show all Campgrounds
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    })
});

// NEW - Show form to create new Campground
router.get("/new", middleWare.isLoggedIn, function(req, res) {
    res.render("campgrounds/new", {currentUser: req.user}); 
 });

// CREATE- add new Campground
router.post("/", middleWare.isLoggedIn, function(req, res){
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newCampground = {name: name, image: image, description: description, author: author};
    Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } 
       else{
           res.redirect("/");
       }
    });
});

// SHOW- shows more info about one campground
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } 
       else{
           console.log(foundCampground);
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

// ========================================================================================================
// EDIT ROUTE
// =========================================================
router.get("/:id/edit", middleWare.checkCampgroundOwnership, function(req, res) {
        Campground.findById(req.params.id, function(err, foundCampground){
                   res.render("campgrounds/edit", {campground: foundCampground});
        });
});

router.put("/:id", middleWare.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.edit, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else{
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

// ====================================================
// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleWare.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else{
           res.redirect("/campgrounds");
       }
   }); 
});

module.exports = router;