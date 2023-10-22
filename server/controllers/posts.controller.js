import posts from "../models/post.model.js";

export const getPosts = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const postsdata = await posts
      .find({ expirey_date: { $gt: currentDate } })
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name")
      // .populate("comments.postedBy","_id Name")
      .sort("-createdAt")
      .then((data) => {
        let list = [];
        data.map((item) => {
          list.push({
            _id: item.id,
            title: item.title,
            postedBy: item.postedBy,
            venue: item.venue,
            city: item.city,
            img_url: item.img_url,
            likes: item.likes,
            comments: item.comments,
            bookers: item.donees,
            meal_size: item.meal_size,
            food_tags: item.food_tags,
            expirey_date: item.expirey_date,
          });
        });
        res.status(200).json({ list });
      });
  } catch (err) {
    next(err);
  }
};
export const createPost = (req, res) => {
  const {
    title,
    venue,
    city,
    food_tags,
    meal_size,
    postedBy,
    img_url,
    expirey_date,
  } = req.body;

  if (
    !title ||
    !venue ||
    !city ||
    !food_tags ||
    !meal_size ||
    !img_url ||
    !expirey_date
  ) {
    return res.json({
      error: "Please submit all the required fields.",
    });
  }
  const post = new posts({
    title: title,
    venue: venue,
    city: city,
    meal_size: meal_size,
    img_url: img_url,
    expirey_date: expirey_date,
    food_tags: food_tags,
    postedBy: postedBy,
  });

  post
    .save()
    .then((result) => {
      res.status(200).json({ message: "post created successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const like = (req, res) => {
  posts
    .findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.body._id },
      },
      { new: true }
    )
    .exec()
    .then((result) => {
      res.status(200).json({
        _id: result._id,
      });
    })
    .catch((err) => {
      res.status(422).json({ Error: err });
    });
};
export const unlike = (req, res) => {
  posts
    .findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.body._id },
      },
      { new: true }
    )
    .exec()
    .then((result) => {
      res.status(200).json({
        _id: result._id,
      });
    })
    .catch((err) => {
      res.status(422).json({ Error: err });
    });
};
export const comment = (req, res) => {
  const comment = { Text: req.body.text, postedBy: req.body._id };
  posts
    .findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      { new: true }
    )
    .populate("comments.PostedBy", "_id name")
    //.populate("PostedBy", "_id Name")
    .exec()
    .then((result) => {
      res.status(200).json({
        _id: result._id,
      });
    })
    .catch((err) => {
      res.status(422).json({ Error: err });
    });
};
export const book = async (req, res) => {
  const { postId} = req.body;
  const bookingTime = new Date();

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      {
        $push: {
          donees: {
            donee: req.user._id,
            bookingTime: bookingTime
          }
        }
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ _id: updatedPost._id });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

export const getDonee = async (req, res, next) => {
  try {
    const postsdata = await posts
      .find({ postedBy : req.user._id })
      .populate("postedBy", "_id name")
      .sort("-createdAt")
      .then((data) => {
        let list = [];
        data.map((item) => {
          list.push({
            _id: item.id,
            title: item.title,
            postedBy: item.postedBy,
            venue: item.venue,
            city: item.city,
            img_url: item.img_url,
            likes: item.likes,
            comments: item.comments,
            bookers: item.booker,
            meal_size: item.meal_size,
            food_tags: item.food_tags,
            expirey_date: item.expirey_date,
          });
        });
        res.status(200).json({ list });
      });
  } catch (err) {
    next(err);
  }
};