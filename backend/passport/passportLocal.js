const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  let user = await User.findById(id);
  if (user) done(null, user);
});
//register strategy
passport.use(
  "local.register",
  new localStrategy(
    {
      usernameField: "name",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, name, password, done) => {
      try {
        let user = await User.findOne({ name: req.body.name });
        if (user) {
          return done(
            null,
            false,
            req.flash("errors", "This user with name exists")
          );
        }
        const newUser = new User({
          name: req.body.name,
          price: req.body.price,
          password: bcrypt.hashSync(req.body.password, 8),
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        return done(error, false, { message: error });
      }
    }
  )
);

//login strategy
passport.use(
  "local.login",
  new localStrategy(
    {
      usernameField: "name",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, name, password, done) => {
      try {
        let user = await User.findOne({ name: req.body.name });
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
          return done(
            null,
            false,
            req.flash("errors", "Your information isn't correct")
          );
        }

        done(null, user);
      } catch (error) {
        return done(error, false, { message: error });
      }
    }
  )
);
