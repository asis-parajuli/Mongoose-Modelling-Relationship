const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log("Connected to MondoDb..."))
  .catch((err) => console.error("Could not connect to MondoDb..", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  // const course = await Course.findById(courseId);
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $unset: {
        // use of unset is to remove the nested structure
        author: "",
      },
    }
  );
  // course.author.name = "Aashish Parajuli";
  // course.save();
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

removeAuthor("5e987fad31239a280c9e6a6f", "5e9880fda271bd2ad4e5f4af");

// addAuthor("5e987fad31239a280c9e6a6f", new Author({ name: "Kane" }));

// createCourse("Node Course", [
//   new Author({ name: "Aashish" }),
//   new Author({ name: "Parajuli" }),
// ]);

// updateAuthor("5e9860ef40dbb135a8390caa");
