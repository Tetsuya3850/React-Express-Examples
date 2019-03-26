exports.searchProducts = async (req, res) => {
  const products = await Product.find(
    {
      $text: {
        $search: req.query.q
      }
    },
    {
      score: { $meta: "textScore" }
    }
  ).sort({
    score: { $meta: "textScore" }
  });
  res.status(200).json(products);
};

exports.pagination = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 10;
  const skip = page * limit - limit;

  const productPromise = Product.find()
    .skip(skip)
    .limit(limit);
  const countPromise = Store.count();

  const [products, count] = Promise.all([productPromise, countPromise]);
  const pages = Math.ceil(count / limit);
  if (!products.length && skip) {
    res.status(400).end;
  }
  res.json({ products, page, pages, count });
};
