const Posts = require('./postsModel.js')
const express = require('express')
const analyze = require('./analyze-middleware.js')

const router = express.Router()

// endpoints
router.get('/:id', (req, res) => {
    const { id } = req.params
    const subject = req.decodedToken.subject

    if (subject.toString() === id) {
        Posts.getPosts(id)
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            res.status(500).json({ message:"Server failed."})
        }) 
    } else {
        res.status(400).json({message:"You are not authorized to access these posts."})
    }
})

router.post('/:id', analyze, (req, res) => {
    const { id } = req.params
    const post = req.body
    const subject = req.decodedToken.subject
    const prediction = req.prediction

    if (post && post.post_title && post.post_text && subject.toString() === id) {   
    Posts.addPost({...post, post_sub_reddit:prediction, user_id: id, dated: new Date().toDateString()})
        .then((id) => {
            res.status(201).json({id:id, created: new Date().toDateString(), prediction:prediction, message:"Successfully added post."})
        })
        .catch((error) => {
            res.status(500).json({message:"Server failed."})
        })
    } else {
        res.status(400).json({message:"Post title or post text was not provided. If they were then you are not authorized to post here."})
    }
})


router.get('/:id/post/:post_id', (req, res) => {
    const id = req.params.id
    const post_id = req.params.post_id
    const subject = req.decodedToken.subject

    if (subject.toString() === id) {
        Posts.getAPost(id, post_id)
        .then((post) => {
            res.status(200).json({post, id:id})
        })
        .catch((error) => {
            res.status(500).json({message:"Server failed."})
        })
    } else {
        res.status(400).json({message:"You are not authorized to access this post."})
    }
})

router.delete('/:id/post/:post_id', (req, res) => {
    const id = req.params.id
    const post_id = req.params.post_id
    const subject = req.decodedToken.subject

    if (subject.toString() === id) {
        Posts.deletePost(id, post_id)
        .then((deleted) => {
            res.status(200).json({ message:"The post has been deleted." })
        })
        .catch((error) => {
            res.status(500).json({ message:"Server failed." })
        })
    } else {
        res.status(400).json({message:"You can only delete posts you have created."})
    }

})

router.put('/:id/post/:post_id', analyze, (req, res) => {
    const id = req.params.id
    const post_id = req.params.post_id
    const newPost = req.body
    const subject = req.decodedToken.subject
    const prediction = req.prediction

    if (subject.toString() === id) {
        Posts.editPost(id, post_id, {...newPost, post_sub_reddit:prediction, dated: new Date().toDateString()})
        .then((updated) => {
            res.status(200).json({updated, newPrediction:prediction, id:id, updated_date: new Date().toDateString()})
        })
        .catch((error) => {
            res.status(500).json({ message:"Server failed" })
        })
    } else {
        res.status(400).json({message:"You can only edit posts that you have created."})
    }
})

// export 
module.exports = router