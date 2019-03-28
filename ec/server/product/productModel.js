const productSchema = new mongoose.Schema({
  genre: {
    ref: "Genre"
  },
  stock: {
    type: Number,
    min: 0
  }
});

productSchema.index({
  name: "text",
  description: "text"
});
