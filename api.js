var request = require('request'),
    querystring = require('querystring')

/*request({
    url: 'https://jawbone.com/nudge/api/v.1.1/users/@me/',
    headers: {
      "Authorization": "Bearer " + options.token
    }
  }, function(e,r, body){
  console.log( JSON.parse(body).data )
})*/

function UP(accessToken){
  this.get = function( path, callback ){
    request({
        url: 'https://jawbone.com/nudge/api/v.1.1/' + path,
        headers: {
          "Authorization": "Bearer " + accessToken
        }
      }, function(e,r, body){
        try{
          callback( JSON.parse(body) )
        } catch(e){
          console.log( e )
          callback( null )
        }
    })
  }


  this.request = function( options, callback ){
    var params = options.params
                 ? '?' + querystring.stringify(options.params)
                 : ''
    console.log( "REQUEST", accessToken )
    request({
        url: 'https://jawbone.com/nudge/api/v.1.1/' + options.path + params,
        method: options.method || "GET",
        headers: {
          "Authorization": "Bearer " + accessToken
        }
      }, function(e,r, body){
        try{
          callback( JSON.parse(body) )
        } catch(e){
          console.log( e )
          callback( null )
        }
    })    
  }


}


/*var token = "CHSvNoQb5olNaTWw6fzpDQlfylYcq0b0GTIJIdmvBCAxYMk5svscEYBg7I5pGJeBAfIUXmAh_ywoLoPO1corRFECdgRlo_GULMgGZS0EumxrKbZFiOmnmAPChBPDZ5JP" 
var aza = new UP( token )
aza.get('users/@me', function(data){
  console.log( data )
})*/

exports.UP = UP