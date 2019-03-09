const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topics;
const Post = require("../../src/db/models").Posts;

describe("Topic", () => {

  beforeEach((done) => {
//#1
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

//#2
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;
//#3
        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
//#4
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
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