const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topics; 
const Post = require("../../src/db/models").Posts;
const Flair = require("../../src/db/models").Flairs;


describe("routes : flairs", () => {

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
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                });
            });
        });
    });



});