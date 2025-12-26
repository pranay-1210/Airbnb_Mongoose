
const { ObjectId } = require("mongodb");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if(_id) {
      this._id = new ObjectId(String(_id));
    }
  }

  save() {
    const db = getDb();
    if(this._id) { //Update
      return db.collection("homes").updateOne({ _id: this._id}, {$set: this}); 
      
    } else { //insert
      return db.collection("homes").insertOne(this);
    }
  }

static fetchAll() {
  const db = getDb();
  return db.collection("homes").find().toArray();
//     .then(registeredHomes => {
//       console.log(registeredHomes);
//       return registeredHomes;
//     })
//     .catch(error => {
//       console.log("Error while fetching homes", error);
//     });
// }
}


  static findById(homeId) {
    const db = getDb();
    return db.collection("homes").find({ _id: new ObjectId(String(homeId))}).next()
    .then(home => {
      console.log(home);
      return home;
    })
    .catch(error => {
      console.log("Error while doing findById ", error);
    });
  }

  static deleteById(homeId) {
    
    const db = getDb();
    return db.collection("homes").deleteOne({ _id: new ObjectId(String(homeId))});
  }
};
