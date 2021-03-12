window.profileForm = function () {
  return {
      name: '',
      email: '',
      password: '',
      errors: {
          name: [],
          email: [],
          password: [],
      },
      validate() {
          if (! this.name) {
              this.errors.name.push('You must enter your name.')
          }
  
          if (this.email && ! this.email.includes('@')) {
              this.errors.email.push('You must enter a valid email address')
          }
  
          if (this.password && this.password.length < 8) {
              this.errors.password.push('Your password must be at least 8 characters long.')
          }
      }
  }
}