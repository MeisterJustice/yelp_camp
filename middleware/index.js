const Campground = require("../models/Campground");
const Comment = require("../models/comment");
// ALL THE MIDDLEWARE GOES HERE
const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    // MIDDLEWARE FOR CHECKING CAMPGROUND OWNERSHIP
    // is user logged in?
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err){
               req.flash("error", "Campground not found");
               res.redirect("back");
           } else{
               //   does user own campground?
               if(foundCampground.author.id.equals(req.user._id)){
                   return next();
               } else{
                   req.flash("error", "You don't have permission to do that!");
                   res.redirect("back");
               }
           }
        });
    }else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
     // MIDDLEWARE FOR CHECKING COMMENT OWNERSHIP
    // is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           } else{
               //   does user own campground?
               if(foundComment.author.id.equals(req.user._id)){
                   return next();
               } else{
                   req.flash("error", "You do not have permission to do that");
                   res.redirect("back");
               }
           }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}


module.exports = middlewareObj;