const Topic = require("./models").Topics;
const Post = require("./models").Posts;

module.exports = {

  getAllTopics(callback){
    return Topic.all()

    .then((topics) => {
      callback(null, topics);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    })
  },
  getTopic(id, callback){
    return Topic.findById(id, {
        include: [{
          model: Post,
          as: "posts"
        }]
      })
    .then((topic) => {
      callback(null, topic);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addTopic(newTopic, callback){
    return Topic.create({
      title: newTopic.title,
      description: newTopic.description
    })
    .then((topic) => {
      callback(null, topic);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    })
  },
  deleteTopic(req, callback){

    // #1
        return Topic.findById(req.params.id)
        .then((topic) => {
   
    // #2
          
   
          
    // #3
            topic.destroy()
            .then((res) => {
              callback(null, topic);
            });
            
           
   
    // #4
  
          
        })
        .catch((err) => {
          callback(err);
        });
  },
  updateTopic(req, updatedTopic, callback){

    // #1
         return Topic.findById(req.params.id)
         .then((topic) => {
    
    // #2
           if(!topic){
             return callback("Topic not found");
           }
    
    // #3
           
    
    // #4
             topic.update(updatedTopic, {
               fields: Object.keys(updatedTopic)
             })
             .then(() => {
               callback(null, topic);
             })
             .catch((err) => {
               callback(err);
             });
           
         });
  }
}