const Posts = require('./postsModel.js')

const express = require('express')

const router = express.Router()

// endpoints
router.get('/:id', (req, res) => {
    const { id } = req.params
    Posts.getPosts(id)
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            res.status(500).json({ message:"Server failed."})
        })
})



// export 
module.exports = router