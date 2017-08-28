/*
*Add an option for the user to redo previous searches.

*/
//This object will contain all of the methods used for the project.
var searchObject = {
  //This array contains all of the searches the user has done so far.
  searches: [],
  //This function will store a search in the "searches" array, and then output all current searches.
  addSearch: function(){
    //Picking out the input field.
    var query = document.querySelector('.search');
    //Creating the URL to use with the Wiki API.
    var urlstring = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + query.value + '&limit=10&namespace=0&format=json&callback=?';
    //Putting both the search and the Wiki URL in the searches array.
    this.searches.push({
      searchname: query.value,
      urlname: urlstring.toString()
      });
    //Resetting the search field.
    query.value = '';
    //Running both the "showSearch" and "conductSearch" functions.
    this.showSearch();
    this.conductSearch(urlstring, query.value);
  },
  //This method takes the previous searches and adds them to the DOM in a OL element.
  showSearch: function(word){
    //Grabbing the ordered list.
    var searchesOL = document.querySelector('.searches');
    //Resetting the entire ordered list.
    searchesOL.innerHTML = '';
    //Putting each searched element into a li and appending it to the ordered list.
    this.searches.forEach(function(searched){
      var newElement = document.createElement('li');
      newElement.textContent = searched.searchname;
      newElement.className = "contentCard";
      searchesOL.appendChild(newElement);
    });
   },
  /*This function actually runs the wiki search and the JSON call.
  "searchparam" is the search URL. "searchName" is just the name of the entry.
  
  */
  conductSearch: function(searchparam, searchName) {
    console.log(searchparam);
    //This variable holds the final OL with all of the li items.
    var finalResults = document.getElementById("searchResults");
    //Resetting the field each time...
    finalResults.innerHTML = '';
    //The JSON call.
    $.getJSON(searchparam, function(data){
      //It will print out a total of ten of the search results.
      for(i = 0; i < 10; i++){
        //Making sure it doesn't give blank slots when missing entries.
        if(data[1][i] !== undefined){
        //Declaring variables and DOM elements.
        var infoResult = document.createElement('li');
        var resultName = document.createElement('p');
        var resultSearch = document.createElement('p');
        var resultLink = document.createElement('a');
        //Adding the name data as well as the class.
        resultName.textContent = data[1][i];
        resultName.classList.add("name");
        //Adding the actual text as well a the class.
        resultSearch.textContent = data[2][i];
        resultSearch.classList.add("preview")
        //Hooking the link up to it, as well as adding the necessary classes.
        resultLink.setAttribute('href', data[3][i]);
        resultLink.setAttribute('target', 'blank');
        //Appending all of these items to the OL.
        resultLink.appendChild(resultName);
        resultLink.appendChild(resultSearch);
        infoResult.appendChild(resultLink);
        finalResults.appendChild(infoResult);
        }
      };
      //Writing to the DOM.
      $("#article").html(finalResults);
    });
    
  }
};

//Making sure that the search will only run if the search field isn't empty. It will run if the "Go" button is clicked, or if enter is pressed.
document.querySelector(".store").addEventListener("click", function(e){
  if($("input").val()){
    searchObject.addSearch();
  };
});
document.querySelector(".search").addEventListener('keypress', function(e){
  if(e.keyCode === 13){
    if($("input").val()){
    searchObject.addSearch();
    }
  };
});