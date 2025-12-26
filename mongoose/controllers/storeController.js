const Home = require("./../models/Home");
const Favourite = require("../models/Favourite");

exports.getIndex = (req, res, next) => {
  Home.find().then(registeredHomes => {
    res.render("store/index", {
      homes: registeredHomes,
      pagetTitle: "Our Airbnb",
    });
  });
};

exports.getHomes = (req, res, next) => {
    Home.find().then(registeredHomes => {
    res.render("store/homes", {
      homes: registeredHomes,
      pagetTitle: "Our Airbnb",
    });
  });
};

exports.getFavourites = (req, res, next) => {
  Favourite.find().populate("homeId").then((favIdHomes) => {
    const favouriteHomes = favIdHomes.map((favIdHome) => favIdHome.homeId);

    res.render("store/favourites", {
      homes: favouriteHomes,
      pageTitle: "Favourites",
    });
  });
};


exports.postAddFavourites = (req, res, next) => {
  const homeId = req.body.id;
  const fav = new Favourite({homeId});
  fav.save().then(() => {
    res.redirect("/favourites");
  }).catch(error => {
    console.log("Error while adding to favourites", error);
  })
};

exports.postDeleteFavourite = (req, res, next) => {
  const homeId = req.params.homeId;

  Favourite.findOneAndDelete({homeId})
    .then(() => {
      res.redirect("/favourites");
    })
    .catch((err) => {
      console.log("Error while deleting from favourites ", err);
    });
};

  

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeIdentity;
  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("Home not found");
      return res.redirect("/homes");
    }
    res.render("store/home-detail", { home: home, pagetTitle: "Home Detail" });
  });
};
