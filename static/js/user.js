function User(token){
  var self = this
      , baseUrl = 'http://127.0.0.1:5000/api'
      //, baseUrl = 'https://shielded-woodland-3199.herokuapp.com/api'
      , dateFormat = 'YYYYMMDD'


  this.get = function(path, callback){
    $.get(baseUrl+'/get', {path:path, token:token}, function(data){
      if( callback ) callback(data)
    })
  }

  // Use like this
  //this.request({path:'/users/@me/meals', params:{date:'20140422'}},function(x){...})
  this.request = function(options, callback){
    options.token = token
    $.get( baseUrl + '/request', {options:options}, function(data){
      if( callback ) callback(data)
    })
  }  

  this.getMeal = function(xid, callback){
    self.get( '/meals/'+xid, function(json){
      callback( json )
    })
  }

  // Normal meal objects, but includes an array of image urls for
  // convienience
  this.getMealsForDay = function( dateString, callback ){
    var meals = []
    self.request({path:'/users/@me/meals', params:{date:dateString}}, function(json){
      
      var numToLookUp = json.data.items.length
      if( json.data.items.length == 0 ) callback( null, dateString )

      _(json.data.items).each(function(meal, index){
        self.getMeal(meal.xid, function(mealJson){
          meals[index] = mealJson.data
          meals[index].images = []
          
          _(mealJson.data.items.items).each(function(detail){
            if( detail.image ) meals[index].images.push( 'http://jawbone.com' + detail.image )
          })
          if( --numToLookUp == 0 ) callback( meals, dateString )
        })
      })
    })
  }

  // Return a dict {"YYYYMMDD": null, "YYYYMMDD+1": [list, of, meals]}
  this.getMealsForWeek = function( dateString, callback ){
    var weekStart = moment(dateString, dateFormat)
        , weekOfMeals = {}
        , daysLeftToFetch = 0
    
    for( var i=0; i<7; i++){
      var dayDate = weekStart.clone().add(i, 'days').format(dateFormat)
      
      daysLeftToFetch++ 
      self.getMealsForDay( dayDate
      , function(meals, date){
        weekOfMeals[date] = meals
        if( --daysLeftToFetch == 0 ) callback( weekOfMeals, weekStart.format(dateFormat) )
      })
    }
  }


}
