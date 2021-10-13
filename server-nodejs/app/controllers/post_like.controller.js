const db = require("../models")
const Post_like = db.post_like
const Op = db.Op
const { getPagination, getPagingData } = require("../helpers/pagination")
const { messageError } = require("../helpers/messageError")

exports.findAll = (req, res) => {
    const PostId = req.query.postId
    var condition = PostId ? { postId: PostId }: null;

    Post_like.findAndCountAll({
        where: condition
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            messageError(res, err)
        })

}

exports.create = (req, res) =>{
    const body = req.body
    Post_like.create(body)
    .then(data =>{
        res.send(data)
    })
    .catch(err => {
        messageError(res, err)
    });

}