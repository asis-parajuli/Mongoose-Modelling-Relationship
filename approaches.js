// Modelling Relationships
// Three approaches:

// Using References (Normalization)
let author = {
  name: "Aashish",
};

let course = {
  author: "id",
};

// Using Embedded Documents (Denormalization)
let course = {
  author: {
    name: "Aashish",
  },
};
// here author is embedded inside the course property

///* *///
// Trade off between query performance vs consistency
// With Referencing approach (Normalization) -> consistency
// With Embedded Documents (Denormalization) -> performance

// With the Hybrid Approach
let author = {
  name: "Aashish",
  // 50 other properties
};

let course = {
  author: {
    id: "ref", // reference to author id
    name: "Aashish",
  },
};
