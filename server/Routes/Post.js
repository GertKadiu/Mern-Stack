const express = require("express");
const router = express.Router();
const PostModel = require("../models/posts");
const UserModel = require("../models/users");

router.post("/CreateEvents", (req, res) => {
  try {
    const newEvent = new PostModel({
      eventName: req.body.eventName,
      creator: req.body.creator,
      location: req.body.location,
      description: req.body.description,
      participants: req.body.participants,
      date: req.body.date,
      image: req.body.image,
    });

    newEvent
      .save()
      .then((event) => res.json(event))
      .catch((err) => res.status(500).json(err));
  } catch (error) {
    console.error("Error reading and encoding image:", error);
    res.status(500).json({ error: "Error reading and encoding image" });
  }
});

router.get("/Events", async (req, res) => {
  try {
    const posts = await PostModel.find({})
      .populate("creator", "name")
      .populate({
        path: "participants",
        select: "name",
      })
      .exec();

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/PostsByCreator/:creatorId", async (req, res) => {
  const creatorId = req.params.creatorId;
  try {
    const posts = await PostModel.find({ creator: creatorId })
      .populate("creator", "name")
      .populate({
        path: "participants",
        select: "name",
      })
      .exec();

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/EventsByParticipant/:participantsId", async (req, res) => {
  const participantsId = req.params.participantsId;

  try {
    const posts = await PostModel.find({ participants: participantsId })
      .populate("creator", "name")
      .populate("participants", "name")
      .exec();

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/deletePost/:id", (req, res) => {
  const id = req.params.id;
  PostModel.findByIdAndDelete({ _id: id })
    .then((posts) => res.json(posts))
    .catch((err) => res.json(err));
});

router.get("/getPost/:id", (req, res) => {
  const id = req.params.id;
  PostModel.findById({ _id: id })
    .then((posts) => res.json(posts))
    .catch((err) => res.json(err));
});

router.get("/SingleEvent/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findById(id)
      .populate({
        path: "creator",
        select: "name",
      })
      .populate({
        path: "participants",
        select: "name image",
      })
      .exec();

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/editEvent/:id", (req, res) => {
  const id = req.params.id;
  try {
    PostModel.findByIdAndUpdate(
      { _id: id },
      {
        eventName: req.body.eventName,
        creator: req.body.creator,
        location: req.body.location,
        description: req.body.description,
        participants: req.body.participants,
        date: req.body.date,
        image: req.body.image,
      },
      { new: true }
    )
      .then((updateEvent) => res.json(updateEvent))
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    console.error("Error reading and encoding image:", error);
    res.status(500).json({ error: "Error reading and encoding image" });
  }
});



router.put("/like/:id", async (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId; // Assuming the user ID is sent in the request body

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: userId } }, // Add userId to the likes array if it doesn't already exist
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/unlike/:id", async (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId; // Assuming the user ID is sent in the request body

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } }, // Remove userId from the likes array
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/allLikes/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const likes = post.likes;

    res.json(likes);
  } catch (error) {
    console.error("Error getting likes:", error);
    res.status(500).json({ error: "Error getting likes" });
  }
});




router.get('/likedUsers/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    // Assuming you have a 'likes' field in your Post model containing the IDs of users who liked the post
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Assuming you have a User model representing your users
    const likedUsers = await UserModel.find({ _id: { $in: post.likes } });

    res.json(likedUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});




module.exports = router;
