const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topics;
const Post = require("../../src/db/models").Posts;
const User = require("../../src/db/models").Users;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({force: true}).then((res) => {

// #2
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user; //store the user

// #3
        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",

// #4
          posts: [{
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            flair: "Answer",
            userId: this.user.id
          }]
        }, {

// #5
          include: {
            model: Post,  // MIGHT NEED TO CHANGE TO POSTS *************
            as: "posts"
          }
        })
        .then((topic) => {
          this.topic = topic; //store the topic
          this.post = topic.posts[0]; //store the post
          done();
        })
      })
    });
  });

  describe("#create()", () => {

    it("should create a topic object with a title, and body", (done) => {
//#1
      Topic.create({
        title: "Barstool Sports",
        description: "Bringing you news feed on important topics"
      })
      .then((topic) => {

//#2
        expect(topic.title).toBe("Barstool Sports");
        expect(topic.description).toBe("Bringing you news feed on important topics");
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a topic with missing title, or description", (done) => {
        Topic.create({
          title: "Barstool Sports"
        })
        .then((topic) => {
   
         // the code in this block will not be evaluated since the validation error
         // will skip it. Instead, we'll catch the error in the catch block below
         // and set the expectations there
   
          done();
   
        })
        .catch((err) => {
   
          expect(err.message).toContain("Topics.description cannot be null");
          done();
   
        })
    });

  });

  describe("#getPosts()", () => {

    it("should associate a topic and a post together", (done) => {

        this.topic.getPosts()
        .then((posts) => {
            expect(posts[0].title).toContain("My first visit to Proxima Centauri b");
            expect(posts[0].topicId).toBe(this.topic.id);
            done();
        })
      
    });

  });

});