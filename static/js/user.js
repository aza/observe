function User(token){
  this.get = function(path, callback){
    $.get('https://shielded-woodland-3199.herokuapp.com/api', {path:path, token:token}, function(data){
      console.log( data )
      if( callback ) callback(data)
    })
  }
}