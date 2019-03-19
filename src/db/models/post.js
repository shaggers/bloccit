'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Posts', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flair: {
      type: DataTypes.STRING,
      allowNull: true
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.Topics, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });
    Post.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    Post.hasMany(models.Comments, {
      foreignKey: "postId",
      as: "comments"
    });

    Post.hasMany(models.Votes, {
      foreignKey: "postId",
      as: "votes"
    });
  };

  Post.prototype.getPoints = function(){

    if(this.votes.length === 0) return 0
    return this.votes
      .map((v) => { return v.value })
      .reduce((prev, next) => { return prev + next });
  };

  Post.prototype.hasUpvotedFor = function(userId){

    const value = this.votes.map((vote) => { if(vote.userId === userId) return vote.value })
      if(value > 0){
        return true;
      } else {
        return false;
      }
  };

  Post.prototype.hasDownvotedFor = function(userId){

    const value = this.votes.map((vote) => { if(vote.userId === userId) return vote.value })
      if(value < 0){
        return true;
      } else {
        return false;
      }
  }

  return Post;
};