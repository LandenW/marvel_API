(function() {

  //stops refresh when enter is click in search box
  $("#search-field").submit(function() {
      return false;
  });

//declair varibles
  let searchButton = $("#search_button")
  let heroName
  let heroIcon
  let iconExtension
  let newRow
  let tableHeading
  let searchTerm
  let homeButton = $("#home")
  let searchURL = "http://gateway.marvel.com/v1/public/characters?limit=100&ts=1&apikey=45ffc7a588682b67fca8b6fd6a866bcb&hash=1b9b9c66cd69a13c4a32ee739962a948"

//function to hit the API and grab hero names and pictures then populate thos in a table
function getHeros() {
    $.get(searchURL, function (data){

      tableHeading = $("<th>Hero Picture</th><th>Hero Name</th>")
      $("#heroTable").append(tableHeading)

      for (let i = 0; i < data.data.results.length; i++) {
      heroName = data.data.results[i].name
      heroIcon = data.data.results[i].thumbnail.path
      iconExtension = "." + data.data.results[i].thumbnail.extension
      newRow = $("<tr><td><img src=\"" + heroIcon + iconExtension + "\"/></td>" + "<td><h2>" + heroName + "</h2></td></tr>")
      $("#heroTable").append(newRow)
      }
    })
  }

//run function
getHeros()

//rerun getHeros function with new URL based on the search box value
searchButton.click(function(){
  $("#heroTable").html("")
  searchTerm = $("#search").val()
  searchURL = ("http://gateway.marvel.com/v1/public/characters?nameStartsWith=" + searchTerm + "&limit=100&ts=1&apikey=45ffc7a588682b67fca8b6fd6a866bcb&hash=1b9b9c66cd69a13c4a32ee739962a948")
  $("#search").val("")
  getHeros()
  })

homeButton.click(function(){
  $("#heroTable").html("")
  searchURL = "http://gateway.marvel.com/v1/public/characters?limit=100&ts=1&apikey=45ffc7a588682b67fca8b6fd6a866bcb&hash=1b9b9c66cd69a13c4a32ee739962a948"
  getHeros()
})

})();
