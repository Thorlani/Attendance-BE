const router = require('express').Router()
const HR = require('../model/Hr')

router.get('/', async (req, res) => {
    try {
        const posts = await HR.find()
        res.json(posts)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/:postId', async (req, res) => {
    try {
        const posts = await HR.findById(req.params.postId)
        res.json(posts)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router