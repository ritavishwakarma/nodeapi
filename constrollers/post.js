const Post = require('../models/post')
//var elasticsearch = require('elasticsearch')


Post.createMapping((err, mapping) => {
    console.log('mapping created');
});

exports.getPosts = (req, res) =>{
        const post = Post.find()
        .then((posts)=>{
            res.json({posts: posts})
        })
        .catch(err => console.log(err));
    };
     
exports.createPost = (req, res) => {
    const post= new Post(req.body)
    post.save((err, result)=>
    {
        if(err)
        {
            return res.status(400).json({
                error: err
                
            })
        }
        res.status(200).json({
            post: result 
        })
    });
    
    post.on('es-indexed', (err, result) => {
        console.log('indexed to elastic search');
    });
}; 

exports.deletePost = (req, res) => {
    Post.findByIdAndRemove(req.params.id)
    .then(posts => {
        if(!posts) {
            return res.status(404).send({
                message: "workout not found with id " + req.params.id
            });
        }    
        res.send({message: "post deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "post not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete post with id " + req.params.id
        });
    });
};

exports.updatePost = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "workout content can not be empty"
        });
    }
    Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title, 
        body: req.body.body,
    }, {new: true})
    .then(posts => {
        if(!posts) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.id
            });
        }
        res.send(workouts);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Post not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating post with id " + req.params.id
        });
    });
    
};

exports.searchPost = (req, res) => {
    Post.findById(req.params.id)
    .then(posts => {
        if(!posts) {
            return res.status(404).send({
                message: "workout not found with id " + req.params.id
            });            
        }
        res.send(posts);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "workout not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving product with id " + req.params.id
        });
    });

}

Post.on('es-indexed', (err, result) => {
    console.log('indexed to elastic search');
});

    
