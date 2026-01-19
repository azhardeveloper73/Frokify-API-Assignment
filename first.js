const foodItemArea = document.querySelector("#foodItemArea");

const searchInput = document.querySelector("input");

const searchButton = document.querySelector("button");

function myRecipesApiCall(foodName) {
  const myForkifyApiUrl = fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${foodName}`,
  );

  foodItemArea.innerHTML = `<h1>loaddiiiiiigggg</h1>`;

  myForkifyApiUrl
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      const { data } = result;
      const { recipes } = data;
      console.log(recipes, "====>>>> recipes");

      const myHTML = recipes.map((recipe) => {
        return `<div class="recipeName" id=${recipe.id} onclick="singleRecipeApi(this)">
                <div id="recipeImage">
                    <img src=${recipe.image_url}
                        alt="">
                </div>
                <div>
                    <h2 style="margin-bottom: 10px;">${recipe.title}</h2>
                    <p>${recipe.publisher}</p>
                </div>

            </div>`;
      });
      console.log(myHTML.join(""), "===>>> myHTML");

      foodItemArea.innerHTML = myHTML.join("");
    })
    .catch((error) => {
      console.log(error, "===>>> error");
    });
}

searchButton.addEventListener("click", () => {
  myRecipesApiCall(searchInput.value);
});

function singleRecipeApi(element) {
  console.log(element, "====>> element");
  console.log(element.id, "====>> element.id");

  fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${element.id}`)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      console.log(result, "===>>>result");
      const recipeDetail = document.querySelector("#recipeDetail");

      const { recipe } = result.data;

      const { image_url, title, ingredients } = recipe;

      const myLi = ingredients.map((ingredients) => {
        return `<li><img src="/assets/check.svg" alt="">${ingredients.description}</li>`;
      });

      console.log(myLi, "===>>>myLi");

      recipeDetail.innerHTML = `<div class="imageDetail">
                <img src=${image_url} alt="">
            </div>
            
            <div id="titleName"><h1>${title}</h1></div>
            <h3>RECIPE INGREDIENTS</h3>
            <ul>
            ${myLi.join(" ")}
            </ul>`;
    })
    .catch((error) => {
      console.log(error, "==>>error");
    });
}
