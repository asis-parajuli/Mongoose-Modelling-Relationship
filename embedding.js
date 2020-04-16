const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log("Connected to MondoDb..."))
  .catch((err) => console.error("Could not connect to MondoDb..", err));

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      type: authorSchema,
      required: true,
    },
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
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

// createCourse("Node Course", new Author({ name: "Aashish" }));

updateAuthor("5e9860ef40dbb135a8390caa");
