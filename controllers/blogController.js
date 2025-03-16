var fs = require('fs').promises;
const filePath = 'models/blog.json';

async function loadBlog() {
    try {
        let data = await fs.readFile(filePath, 'utf8');
        return data.length > 0 ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error while loading blog: ", error);
        return [];
    }
}

async function saveBlog(posts) {
    try {
        await fs.writeFile(filePath, JSON.stringify(posts, null, 2));
    } catch (error) {
        console.error("Error while saving blog: ", error);
    }
}

async function saveFile(fileInput) {
    let file = fileInput;
    await file.mv('public/uploads/' + file.name);
    return 'uploads/' + file.name;
}

async function savePost(req) {
    let posts = await loadBlog();
    let filename = '';
    if (req.files) {
        filename = await saveFile(req.files.image);
    }
    let post = {
        id: posts.length ? posts[posts.length - 1].id + 1 : 0,
        title: req.body.title,
        username: req.body.username,
        date: req.body.date,
        text: req.body.text,
        image: filename
    }
    posts.push(post);
    await saveBlog(posts);
    return post;
}

function getPostForm() {
    let formSubmits = {action: '/blog', method: 'POST', enctype: 'multipart/form-data'};
    let formInputs = [
        {label: 'title', text: 'Title', type: 'text', required: true},
        {label: 'username', text: 'Username', type: 'text', required: true},
        {label: 'date', text: 'Date', type: 'date', required: true},
        {label: 'text', text: 'Text', type: 'textarea', required: true},
        {label: 'image', text: 'Image', type: 'file', required: false}
    ];
    return { formSubmits, formInputs };
}

const getAllPosts = async (req, res) => {
    let posts = await loadBlog();
    res.render('blog', { title: 'Blogposts', posts });
};

const getAllPostsAPI = async (req, res) => {
    let posts = await loadBlog();
    res.status(200).json({ "success": true, posts });
};

const createPost = async (req, res) => {
    let post = await savePost(req);
    let form = getPostForm();
    res.render('post', { title: post.title, post, submit_button: 'Post', formSubmits: form.formSubmits, formInputs: form.formInputs });
};

const createPostAPI = async (req, res) => {
    let post = await savePost(req);
    res.status(201).json({ "success": true, post });
};

const newPost = (req, res) => {
    let form = getPostForm();
    res.render('post', { title: 'New Blogpost', submit_button: 'Post', formSubmits: form.formSubmits, formInputs: form.formInputs });
};

const readPost = async (req, res) => {
    let posts = await loadBlog();
    let post = posts.find(p => p.id === parseInt(req.params.postID));
    if (post) {
        let form = getPostForm();
        res.render('post', { title: post.title, post, submit_button: 'Post', formSubmits: form.formSubmits, formInputs: form.formInputs });
    } else {
        res.send("Post not found");
    }
};

const readPostAPI = async (req, res) => {
    let posts = await loadBlog();
    let post = posts.find(p => p.id === parseInt(req.params.postID));
    if (post) {
        res.status(200).json({ "success": true, post });
    } else {
        res.status(404).json({ "success": false, message: "Post not found" });
    }
};

const updatePostAPI = async (req, res) => {
    let posts = await loadBlog();
    let index = posts.findIndex(p => p.id === parseInt(req.params.postID));
    if (index === -1) {
        return createPostAPI(req, res);
    } else {
        if (req.body.title !== undefined) {
            posts[index].title = req.body.title;
        }
        if (req.body.username !== undefined) {
            posts[index].username = req.body.username;
        }
        if (req.body.date !== undefined) {
            posts[index].date = req.body.date;
        }
        if (req.body.text !== undefined) {
            posts[index].text = req.body.text;
        }
        await saveBlog(posts);
        res.status(200).json({ "success": true, post: posts[index] });
    }
};

const deletePostAPI = async (req, res) => {
    let posts = await loadBlog();
    let index = posts.findIndex(p => p.id === parseInt(req.params.postID));
    if(index !== -1) {
        posts.splice(index, 1);
        await saveBlog(posts);
    }
    res.status(200).json({ "success": true });
};

module.exports = {
    getAllPosts,
    getAllPostsAPI,
    createPost,
    createPostAPI,
    newPost,
    readPost,
    readPostAPI,
    updatePostAPI,
    deletePostAPI
}