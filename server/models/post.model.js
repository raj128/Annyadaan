import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		venue: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		img_url: {
			type: String,
			default:"#"
		},
		postedBy:{
			type:ObjectId,
			ref:"user"
		},
		food_tags:{type:String},
        meal_size:{
            type: Number,
        },
		likes: [{ type: ObjectId, ref: "user" }],
		booker: [{ type: ObjectId, ref: "user" }],
		comments: [
			{
				Text: String,
				postedBy: {
					type: ObjectId,
					ref: "user",
				},
			},
		],
		expirey_date:{
			type:Date,
		}
	},
	{ timestamps: true }
);
var PostModel = mongoose.model('posts', postSchema);

export default PostModel;