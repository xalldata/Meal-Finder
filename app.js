var myInput = document.getElementById("my-input");
var form = document.querySelector("form");

var ingrContainer = document.querySelector(".ingr-container");

var meals = document.querySelector(".meals");

var desc = document.querySelector(".desc");

var mealTitle = document.querySelector(".meal-title");
var mealImg = document.querySelector(".meal-img");
var mealCtegory = document.querySelector(".meal-category");
var mealArea = document.querySelector(".meal-area");
var intructions = document.querySelector(".inst");
var ingredientsEL = document.querySelector(".ingr");
var catArea = document.querySelector(".cat-area");

var ingredients = [];

//****************************************************************** */

function createIngredients(meal) {
  // Get all ingredients from the object. Up to 20
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // Stop if there are no more ingredients
      break;
    }
  }
}
//********************************************************************** */

form.addEventListener("submit", function (e) {
  e.preventDefault();
  removeAllChildNodes(meals);
  desc.classList.add("hide");

  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + myInput.value)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var newData = data.meals;
      newData.forEach(function (dat) {
        updateDOM(dat, data);
      });
    });
});

function updateDOM(dat, data) {
  var dat = dat;
  var divs = document.createElement("div");
  var linkEL = document.createElement("a");
  linkEL.href = "#titre";
  linkEL.addEventListener("click", function () {
    updateDOM2(dat, data.meals[0]);
  });
  var addDOM = document.createElement("img");
  addDOM.src = dat.strMealThumb;
  addDOM.style.width = "300px";
  linkEL.appendChild(addDOM);
  divs.appendChild(linkEL);
  meals.appendChild(divs);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function updateDOM2(dat, data) {
  ingredients = [];
  desc.classList.remove("hide");
  removeAllChildNodes(desc);
  removeAllChildNodes(ingrContainer);
  removeAllChildNodes(catArea);

  createIngredients(data);

  var h1 = document.createElement("h1");
  h1.classList.add("meal-title");
  h1.id = "titre";
  h1.innerHTML = dat.strMeal;
  desc.appendChild(h1);
  var addDOM = document.createElement("img");
  addDOM.classList.add("meal-img");
  addDOM.src = dat.strMealThumb;
  addDOM.style.width = "300px";
  desc.appendChild(addDOM);

  var category = document.createElement("p");
  category.classList.add("meal-category");
  category.innerHTML = "Category : " + dat.strCategory;
  catArea.appendChild(category);
  desc.appendChild(catArea);
  var area = document.createElement("p");
  area.classList.add("meal-area");
  area.innerHTML = "Pays : " + dat.strArea;
  catArea.appendChild(area);
  desc.appendChild(catArea);

  var pInst = document.createElement("p");
  pInst.classList.add("inst");
  pInst.innerHTML = dat.strInstructions;
  desc.appendChild(pInst);

  for (var i = 0; i < ingredients.length; i++) {
    var lesIngr = document.createElement("p");
    lesIngr.innerHTML = ingredients[i];
    lesIngr.classList.add("ingrs");
    ingrContainer.appendChild(lesIngr);
    desc.appendChild(ingrContainer);
  }
}

function replaceFirst(values) {
  if (values == [] || values.length == 0) {
    return values;
  } else {
    values.push(values[0]);
    values.shift();
    return values;
  }
}
