const db = require("../models")
const Post_like = db.post_like
const Op = db.Op
const { getPagination, getPagingData } = require("../helpers/pagination")
const { messageError } = require("../helpers/messageError")

exports.findAll = (req, res) => {
    const name = req.query.name
    const { page, size} = req.query
    const { limit, offset } = getPagination(page, size)

    var condition = name ? {[Op.like] : '%' + name + '%'} : null
}