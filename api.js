var request = require('request')

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
        callback( JSON.parse(body) )
    })    
  }
}


/*var token = "CHSvNoQb5olNaTWw6fzpDQlfylYcq0b0GTIJIdmvBCAxYMk5svscEYBg7I5pGJeBAfIUXmAh_ywoLoPO1corRFECdgRlo_GULMgGZS0EumxrKbZFiOmnmAPChBPDZ5JP" 
var aza = new UP( token )
aza.get('users/@me', function(data){
  console.log( data )
})*/

exports.UP = UP