// =================================================================
//   COMMENTS ROUTES
// =================================================================
const express = require("express");
const router  = express.Router({mergeParams: true});
const Campground = require("../models/Campground");
const Comment = require("../models/comment");
const middleWare = require("../middleware");

router.get("/new", middleWare.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
           res.render("comments/new", {campground: campground});     
        }
    });
});

router.post("/", middleWare.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground) {
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else{
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   req.flash("error", "Something went wrong");
                   console.log(err);
               } else{
                //   add username and id to comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                //   save the comment
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   req.flash("success", "Successfully created comment")
                   res.redirect("/campgrounds/" + campground._id);
               }
           });
       }
    });
});

router.get("/:comment_id/edit", middleWare.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, commentEdit) {
      if(err){
          res.redirect("back");
      } else{
          res.render("comments/edit", {comment: commentEdit, campground_id: req.params.id});
      }
   }); 
});

router.put("/:comment_id", middleWare.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, UpdatedComment){
       if(err){
           res.redirect("back");
       } else{
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

router.delete("/:comment_id", middleWare.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else{
           req.flash("success", "Comment deleted")
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

module.exports = router;
