const db = require("../models")
const Post_like = db.post_like
const Op = db.Op
const { getPagination, getPagingData } = require("../helpers/pagination")
const { messageError } = require("../helpers/messageError")

exports.findAll = (req, res) => {
    const body = req.body
    console.log("data body like >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", req.body.userId);
    var condition = body ? {
        [Op.and]: [
            { userId: body.userId },
            { postId: body.postId }
        ]
    } : null

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

exports.create = (req, res) => {
    const body = req.body
    var condition = body ? {
        [Op.and]: [
            { userId: body.userId },
            { postId: body.postId }
        ]
    } : null
    Post_like.findAndCountAll({
        where: condition
    })
        .then(data => {
            console.log("data))))))))))))", data)
            if (data.rows.length >0) {
                res.send({
                    message: "Can not create post_like  "
                })
            }
            else{Post_like.create(body)
                    .then(data => {
                        res.send(data)
                        console.log("wgcyagdhjagd ::: ", data   )
                    })
                
            }
        })

        .catch(err => {
            messageError(res, err)
        });

}

exports.delete = (req, res) => {
    const userId = res.query.id
    Post_like.destroy({
        where: { id: userId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: " Post_like was deleted successdully!"
                });
            }
            else {
                res.send({
                    message: `Can not delete Post with id=${id}. Maybe Post_like was not found!`
                });
            }
        })
        .catch(err => {
            res.send(500).send({
                message: "Error delete Post_like with id=" + id
            })
        })
}