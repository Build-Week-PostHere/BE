const axios = require('axios')
//  https://subredditfinder.herokuapp.com/model/ <--- NEW MODEL
//  https://subreddit-finder.herokuapp.com/model/ <--- OLD MODEL
module.exports = (req, res, next) => {
        const text = req.body.post_text
        axios.get(`https://subredditfinder.herokuapp.com/model/${text}`)
            .then((response) => {
                console.log("This is the response data:", response.data)
                req.prediction = response.data
                next()
            })
            .catch((error) => {
                res.status(500).json({message:"could not receive a response from DS"})
            })
    }
