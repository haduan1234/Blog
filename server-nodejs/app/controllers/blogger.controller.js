const db= require("../models");
const Blogger = db.blogger;
const Op = db.Op;
const { getPagination, getPagingData } = require("../helpers/pagination");
const { messageError } = require("../helpers/messageError");


exports.findAll = (req, res) => {
    const name = req.query.name;
    const gender = req.query.gender;
    const { page, size } = req.query;
    const { limit, offset } =  getPagination(page, size);
if(typeof name !=="undefined"){
      var condition = name ? { name: { [Op.like]: '%' + name + '%'} } : null;

     Blogger.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      messageError(res, err)
    });
}else{
     var condition = gender ? { gender: { [Op.like]: '%' + gender + '%'} } : null;

    Blogger.findAndCountAll({ where: condition, limit, offset })
  .then(data => {
    const response = getPagingData(data, page, limit);
    res.send(response);
  })
  .catch(err => {
    messageError(res, err)
  });

}
}

exports.create = (req, res) => {
    Blogger.create(req.body)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        messageError(res, err)
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
   Blogger.findOne({
        where: { id:  id}
    })
    .then(data=> {
      if(data.length == 0){
        res.send({
          message:" Can not find Blogger with id ="+id
        })
      }else{
        res.send(data)
      }
       
    })
    .catch(err => {
        res.status(500).send({
            message: `Error find Blogger with id=${id} `
        })
    })

   
}

exports.update = (req, res) => {
  const  id = req.params.id;

  Blogger.update(req.body ,{
    where : { id : id}
  })
  .then( num =>{
    if( num == 1){
      res.send({
        message: " Blogger update with successfully!"
      })
    }else{
      res.send({
        message: `Cannot update Blogger with id=${id}. Maybe Blogger was not found or req.body is empty!`
      })
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Error update Blogger with id=${id} `
  })
  })
}

exports.deleteOne = (req, res) => {
  const id = req.params.id;
  console.log("id la:" , id)
  Blogger.destroy({
    where: { id:id }
  })
  .then( num => {
    if( num == 1){
      res.send({
        message: "Blogger was delete succcessfully! "
      })
    }else{
      res.send({
        message: ` can not find id=${id} in Blogger!`
      })
    }
  })
  .catch( err =>{
    res.status(500).send({
      message: `Error delete Blogger with id=${id} `
  })
  })
  
}

exports.deleteAll = (req, res ) => {
  Blogger.destroy({
    where: [],
    truncate: false
  })
  .then(num => {
    res.send({
      message : `Blogger were deleted successfuly !`
    })
  })
  .catch(err =>{
    res.send( res, err)
  })
}

  
