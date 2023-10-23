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
export const createPost = (req, res, next) => {
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

export const like = (req, res, next) => {
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
export const unlike = (req, res, next) => {
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
export const comment = (req, res, next) => {
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
  // return res.status(404).json({ error: "Post not found888" });
  const { postId } = req.body;
  const bookingTime = new Date();

  try {
    const updatedPost = await posts.findByIdAndUpdate(
      postId,
      {
        $push: {
          donees: {
            donee: req.user._id,
            bookingTime: bookingTime,
          },
        },
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ _id: updatedPost._id });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

export const getDonees = async (req, res, next) => {
  try {
    const userId = req.user._id; // Assuming this is the user's ID

    const posts = await posts
      .find({ postedBy: userId })
      .populate({
        path: "donees.donee", // Populate the 'donees.donee' field with user data
        select: "name", // Select the 'name' field from the referenced user model
      })
      .sort("-createdAt")
      .exec();

    const list = posts.map((item) => {
      const doneesInfo = item.donees.map((donee) => ({
        name: donee.donee.name, // Access donee's name from the populated field
        bookingTime: donee.bookingTime, // Assuming booking time is a field in donee
      }));

      return {
        _id: item.id,
        title: item.title,
        venue: item.venue,
        city: item.city,
        donees: doneesInfo,
        meal_size: item.meal_size,
        food_tags: item.food_tags,
        expirey_date: item.expirey_date,
      };
    });

    res.status(200).json({ list });
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const doneeId = req.user._id; // Assuming this is the donee's user ID

    const wposts = await posts
      .find({ "donees.donee": doneeId })
      .populate("postedBy", "name")
      .sort("-donees.bookingTime")
      .exec();

    const list = wposts.map((post) => {
      // Find the specific donee entry in the 'donees' array
      const doneeEntry = post.donees.find(
        (donee) => donee.donee.toString() === doneeId
      );

      return {
        _id: post.id,
        title: post.title,
        Owner: post.postedBy.name,
        venue: post.venue,
        city: post.city,
        food_tags: post.food_tags,
        expirey_date: post.expirey_date,
        bookingTime: doneeEntry ? doneeEntry.bookingTime : null, // Access booking time if found
      };
    });
    res.status(200).json({ list });
  } catch (err) {
    next(err);
  }
};
