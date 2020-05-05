'use strict'

//Bring in model
const Post = use('App/Models/Post')

class PostController {
    async index({view}){

        const posts = await Post.all();

        return view.render('posts.index',{
            title: 'Latest Post',
            posts: posts.toJSON()
        })
    }

    async details({ params, view }) {
        const post = await Post.find(params.id)

        return view.render('posts.details', {
            post: post
        })
    }

    async add({ view }) {
        return view.render('posts.add')
    }

    async store({ request, response, session }){
        const post = await Post.create(request.only(['title','body']))

        await post.save()

        session.flash({ notification: 'Post Added!' })

        return response.redirect('/posts')
    }

    async edit({ params, view }) {
        const post = await Post.find(params.id)

        return view.render('posts.edit', {
            post: post
        })
    }

    async update({ request, response, session, params }){
        const post = await Post.find(params.id)

        post.title = request.all().title
        post.body = request.all().body

        await post.save()

        session.flash({ notification: 'Post Updated!' })

        return response.redirect('/posts')
    }

    async destroy({ params, session, response }){
        const post = await Post.find(params.id)

        await post.delete()

        session.flash({ notification: 'Post Deleted!' })

        return response.redirect('/posts')
    }
}

module.exports = PostController
