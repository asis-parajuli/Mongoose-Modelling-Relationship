const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log("Connected to MondoDb..."))
  .catch((err) => console.error("Could not connect to MondoDb..", err));

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  })
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find()
    // populate is for populating through author for following
    .populate("author", "name -_id") // here name is added and '-' indicates removal
    // we can use multiple populate statement as
    // .populate("category", "name")
    .select("name author");
  console.log(courses);
}

//createAuthor("Aashish", "My bio", "My Website");

// createCourse("Node Course", "5e9850636c822d2bd48c5018");

listCourses();
