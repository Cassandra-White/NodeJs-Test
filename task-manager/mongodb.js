const { MongoClient, ObjectId, Collection } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Impossiblde de se connecter à la base de données");
    }

    const db = client.db(databaseName);

   db.collection('tasks')
   .deleteOne({
     description: "Manger"
   })
   .then((result)=> {
     console.log(result)
   })
   .catch((error)=> {
      console.log(error);
   });
  }
);
