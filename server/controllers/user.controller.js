import posts from '../models/post.model.js';
import user from '../models/user.model.js';

export const User = (req, res) => {
    user.findOne({ _id: req.params.id })
    
    .sort("-createdAt")
      .then((user) => {
        //console.log("1\n");
        posts.find({ postedBy: req.params.id })
          .populate("postedBy","_id name")
          .populate("comments.postedBy","_id name")
          .then((result) => {
            const list = [];
            result.map((item) => {
              list.push({
                _id: item.id,
                postedBy:item.postedBy,
                title:item.title,
                likes:item.likes,
                img_url:item.img_url,
                bookers:item.booker,
                comments:item.comments,
                food_tags:item.food_tags,
                meal_size:item.meal_size,
                expirey_date:item.expirey_date
            });
        });
        res.json({ user, list });
      })
      .catch((err) => {
        return res.status(422).json();
      });
  })
  .catch((err) => {
    return res.status(404).json({ Error: "User not found" });
  });
};

export const userSearch = (req, res) => {
	let pattern = new RegExp("^" + req.body.pattern);
	user.find({ email: { $regex: pattern } })
		//.select("_id Email Name")
		.then((user) => {
			res.json({ user });
		})
		.catch((err) => {
			console.log(err);
		});
};