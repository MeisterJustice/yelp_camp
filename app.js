const   express           = require("express"),
        app               = express(),
        bodyParser        = require("body-parser"),
        mongoose          = require("mongoose"),
        flash             = require("connect-flash"),
        passport          = require("passport"),
        LocalStrategy     = require("passport-local"),
        methodOverride    = require("method-override"),
        passportLocalMongoose = require("passport-local-mongoose"),
        Campground        = require("./models/Campground"),
        Comment           = require("./models/comment"),
        User              = require("./models/user"),
        seedDB            = require("./seeds");
    
const   commentsRoutes    = require("./routes/comments"),
        campgroundRoutes  = require("./routes/campgrounds"),
        indexRoutes        = require("./routes/index");
    

mongoose.connect('mongodb://localhost:27017/yelp_camp_v11', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); seed the database
// ============================
// PASSPORT CONFIG
// ============================
app.use(require("express-session")({
    secret: "My name is Justice",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// for header login signin shows
app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER STARTED");
});