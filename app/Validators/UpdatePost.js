'use strict'

class UpdatePost {
  get rules () {
    return {
      // validation rules
        'title': 'required|min:3|max:255',
        'body': 'required|min:3'
    } 
  }

  get messages() {
    return {
      'required': 'Woah now, {{ field }} is required.',
      'min': 'Minimum {{ field }} are 3 words',
      'max': 'Maximum {{ field }} are 255 words'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll()
    
    return this.ctx.response.redirect('back')
  }
}

module.exports = UpdatePost
