const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topics; 
const Post = require("../../src/db/models").Posts;
const Flair = require("../../src/db/models").Flairs;


describe("Flair", () => {

    beforeEach((done) => {

        this.topic;
        this.post;
        this.flair;
        sequelize.sync({force: true}).then((res) => {

            Topic.create({
                title: "New feature",
                description: "Here we are going to implement flairs"
            })
            .then((topic) => {
                this.topic = topic;

                Post.create({
                    title: "What is a flair",
                    body: "It is a way to add a subject to a post",
                    topicId: this.topic.id
                })
                .then((post) => {
                    this.post = post;

                    Flair.create({
                        name: "Answer",
                        postId: this.post.id
                    })
                    .then((flair) => {
                        this.flair = flair;
                        done();
                    });
                })    
            })
            .catch((err) => {
                console.log(err);
                done();
            });

        });
    });

    describe("#create()", () => {

        it("should create a flair object with a name and assigned post", (done) => {
   //#1
          Flair.create({
            name: "Question",
            postId: this.post.id
          })
          .then((flair) => {
   
   //#2
            expect(flair.name).toBe("Question");
            done();
   
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });

        it("should not create a flair with missing name or assigned post", (done) => {
            Flair.create({
              name: null
            })
            .then((flair) => {
       
             // the code in this block will not be evaluated since the validation error
             // will skip it. Instead, we'll catch the error in the catch block below
             // and set the expectations there
       
              done();
       
            })
            .catch((err) => {
       
              expect(err.message).toContain("Flairs.name cannot be null");
              expect(err.message).toContain("Flairs.postId cannot be null");
              done();
       
            })
        });
   
    });

    describe("#setPost()", () => {

        it("should associate a post and a flair together", (done) => {
   
   // #1
          Post.create({
            title: "Challenges of interstellar travel",
            body: "1. The Wi-Fi is terrible",
            topicId: this.topic.id
          })
          .then((newPost) => {
   
   // #2
            expect(this.flair.postId).toBe(this.post.id);
   // #3
            this.flair.setPost(newPost)
            .then((flair) => {
   // #4
              expect(flair.postId).toBe(newPost.id);
              done();
   
            });
          })
        });
   
    });

    describe("#getPost()", () => {

        it("should return the associated post", (done) => {
   
          this.flair.getPost()
          .then((associatedPost) => {
            expect(associatedPost.title).toBe("What is a flair");
            done();
          });
   
        });
   
    });

});