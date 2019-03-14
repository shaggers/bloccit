const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics/";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topics;
const Post = require("../../src/db/models").Posts;
const User = require("../../src/db/models").Users;
const Comment = require("../../src/db/models").Comments;

describe("routes : comments", () => {

    beforeEach((done) => {

        this.user;
        this.topic;
        this.post;
        this.comment;

        sequelize.sync({force: true}).then((res) => {

        User.create({
            email: "starman@tesla.com",
            password: "Trekkie4lyfe"
        })
        .then((user) => {
            this.user = user;  // store user

            Topic.create({
            title: "Expeditions to Alpha Centauri",
            description: "A compilation of reports from recent visits to the star system.",
            posts: [{   
                title: "My first visit to Proxima Centauri b",
                body: "I saw some rocks.",
                flair: "Answer",
                userId: this.user.id   
            }]
            }, {
            include: {                        //nested creation of posts
                model: Post,
                as: "posts"
            }
            })
            .then((topic) => {
            this.topic = topic;                 // store topic
            this.post = this.topic.posts[0];  // store post

            Comment.create({  
                body: "ay caramba!!!!!",
                userId: this.user.id,          
                postId: this.post.id
            })
            .then((coment) => {
                this.comment = coment;             // store comment
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
            })
            .catch((err) => {
            console.log(err);
            done();
            });
        });
        });
    });

    // #1__________________________________________________________
    describe("guest attempting to perform CRUD actions for Comment", () => {

        beforeEach((done) => {    // before each suite in this context
           request.get({           // mock authentication
             url: "http://localhost:3000/auth/fake",
             form: {
               userId: 0 // flag to indicate mock auth to destroy any session
             }
           },
             (err, res, body) => {
               done();
             }
           );
        });
    
        describe("POST /topics/:topicId/posts/:postId/comments/create", () => {
    
           it("should not create a new comment", (done) => {
             const options = {
               url: `${base}${this.topic.id}/posts/${this.post.id}/comments/create`,
               form: {
                 body: "This comment is amazing!"
               }
             };
             request.post(options,
               (err, res, body) => {
                 Comment.findOne({where: {body: "This comment is amazing!"}})
                 .then((comment) => {
                   expect(comment).toBeNull();   // ensure no comment was created
                   done();
                 })
                 .catch((err) => {
                   console.log(err);
                   done();
                 });
               }
             );
           });
        });
    
    
        describe("POST /topics/:topicId/posts/:postId/comments/:id/destroy", () => {
    
           it("should not delete the comment with the associated ID", (done) => {
             Comment.all()
             .then((comments) => {
               const commentCountBeforeDelete = comments.length;
    
               expect(commentCountBeforeDelete).toBe(1);
    
               request.post(
                 `${base}${this.topic.id}/posts/${this.post.id}/comments/${this.comment.id}/destroy`,
                 (err, res, body) => {
                 Comment.all()
                 .then((comments) => {
                   expect(err).toBeNull();
                   expect(comments.length).toBe(commentCountBeforeDelete);
                   done();
                 })
    
               });
             })
           });
        });
    });

    // #2_______________________________________________________________________
    describe("signed in user performing CRUD actions for Comment", () => {

        beforeEach((done) => {    // before each suite in this context
          request.get({           // mock authentication
            url: "http://localhost:3000/auth/fake",
            form: {
              role: "member",     // mock authenticate as member user
              userId: this.user.id
            }
          },
            (err, res, body) => {
              done();
            }
          );
        });
   
        describe("POST /topics/:topicId/posts/:postId/comments/create", () => {
   
          it("should create a new comment and redirect", (done) => {
            const options = {
              url: `${base}${this.topic.id}/posts/${this.post.id}/comments/create`,
              form: {
                body: "This comment is amazing!"
              }
            };
            request.post(options,
              (err, res, body) => {
                Comment.findOne({where: {body: "This comment is amazing!"}})
                .then((comment) => {
                  expect(comment).not.toBeNull();
                  expect(comment.body).toBe("This comment is amazing!");
                  expect(comment.id).not.toBeNull();
                  done();
                })
                .catch((err) => {
                  console.log(err);
                  done();
                });
              }
            );
          });
        });
   
        describe("POST /topics/:topicId/posts/:postId/comments/:id/destroy", () => {
   
            it("should delete the comment with the associated ID", (done) => {
                Comment.all()
                .then((comments) => {
                const commentCountBeforeDelete = comments.length;
    
                expect(commentCountBeforeDelete).toBe(1);
    
                request.post(
                `${base}${this.topic.id}/posts/${this.post.id}/comments/${this.comment.id}/destroy`,
                    (err, res, body) => {
                    expect(res.statusCode).toBe(302);
                    Comment.all()
                    .then((comments) => {
                    expect(err).toBeNull();
                    expect(comments.length).toBe(commentCountBeforeDelete - 1);
                    done();
                    })
    
                });
                })
   
            });

            it("should not delete a comment with the associated ID", (done) => {
              console.log(this.user.id);
              
                User.create({
                    email: "whoman@ford.com",
                    password: "muscle4lyfe"
                })
                .then((user) => {
                    this.user = user;

                    request.get({          
                        url: "http://localhost:3000/auth/fake",
                        form: {
                          role: "member",    
                          userId: this.user.id
                        }
                    },
                    (err, res, body) => {
                        console.log(this.user.id);

                        Comment.all()
                        .then((comments) => {
                        const commentCountBeforeDelete = comments.length;
            
                        expect(commentCountBeforeDelete).toBe(1);
            
                        request.post(
                        `${base}${this.topic.id}/posts/${this.post.id}/comments/${this.comment.id}/destroy`,
                            (err, res, body) => {
                                expect(res.statusCode).toBe(401);
                                Comment.all()
                                .then((comments) => {
                                    expect(err).toBeNull();
                                    expect(comments.length).toBe(commentCountBeforeDelete);
                                    done();
                                })
                            });
                        })
                    });
                })

            })
   
        });
   
    }); 

    describe("admin performing CRUD actions on comment", () => {

        it("should delete a comment with the associated id", (done) => {
            console.log(this.user.id);
            
              User.create({
                  email: "adminman@admin.com",
                  password: "iamadmin"
              })
              .then((user) => {
                  this.user = user;

                  request.get({          
                      url: "http://localhost:3000/auth/fake",
                      form: {
                        role: "admin",    
                        userId: this.user.id
                      }
                  },
                  (err, res, body) => {
                      console.log(this.user.id);

                      Comment.all()
                      .then((comments) => {
                      const commentCountBeforeDelete = comments.length;
          
                      expect(commentCountBeforeDelete).toBe(1);
          
                      request.post(
                      `${base}${this.topic.id}/posts/${this.post.id}/comments/${this.comment.id}/destroy`,
                          (err, res, body) => {
                              expect(res.statusCode).toBe(302);
                              Comment.all()
                              .then((comments) => {
                                  expect(err).toBeNull();
                                  expect(comments.length).toBe(commentCountBeforeDelete - 1);
                                  done();
                              })
                          });
                      })
                  });
              })

        })

    })

});
