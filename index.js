const express=require('express');
const app=express();
const { v4: uuidv4 } = require('uuid');
const path=require('path')
var router = express.Router()
app.use(express.urlencoded({ extended: true  })) // for parsing application/x-www-form-urlencoded
app.use(express.json())
var methodOverride = require('method-override')
// router.use(function (req, res, next) {
//   console.log('middleware run')
//   next()
// })
app.use(methodOverride('_method'))
app.use(function (req, res, next) {
    console.log('Request Type:', req.method)
    next()
})
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
router.get('/tacos',(req,res)=>{
    res.send("Get /tacos response")
})
let comments=[
    {
        id:uuidv4(),
        username:'Todd',
        comment:'lol that is so funny'
    },
    {
        id:uuidv4(),
        username:'Skyler',
        comment:'I like to go bird watchinh with my dog'
    },
    {
        id:uuidv4(),
        username:'sk8erBoi',
        comment:'pls delete your account , todd'
    },
    {
        id:uuidv4(),
        username:'onlysaywoof',
        comment:'woof woof woof'
    }
]
app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments})
})
app.get('/comments/new',(req,res)=>{
    res.render('comments/new')
})
app.get('/comments/:id',(req,res)=>{
    const {id}=req.params
    const comment=comments.find(c=>c.id===id)
    res.render('comments/show',{comment})
})
app.post('/comments',(req,res)=>{
    const {username,comment}=req.body
    const id=uuidv4()
    comments.push({username,comment,id})
    res.redirect('/comments')

})
app.patch('/comments/:id',(req,res)=>{
    const{id}=req.params;
    const newCommentText=req.body.comment;
    const foundComment=comments.find(c=>c.id===id);
    foundComment.comment=newCommentText;
    res.redirect('/comments')
})
// app.post('/tacos',(req,res)=>{
//     var {meat, qty}=req.body
//     res.send(`Post /tacos response ${meat}: ${qty}`)
// })
app.listen(process.env.PORT || 3000)
app.get('/comments/:id/edit',(req,res)=>{
    const {id}=req.params
    const comment=comments.find(c=>c.id===id)
    res.render('comments/edit',{comment})
})
app.delete('/comments/:id',(req,res)=>{
    const{id}=req.params;
    comments=comments.filter(c=>c.id!==id)
    res.redirect('/comments')
})
/*
get /comments - list all comments
post /comments - creat a new comments
get /comments/:id - get one comment from user id
patch /comments/:id - update one comments
detete /comments/:id - deleta commenst froem user id*/
module.exports=router;