import React, { useState, useEffect } from 'react'
import RecipeList from './RecipeList'
import RecipeEdit from './RecipeEdit'
import '../css/App.css'

export const RecipeContext = React.createContext()

const API_URL = 'http://localhost:4200/recipes/'

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  /*
    UseEffect func to retrieve recipes from DB once
  */
  useEffect( () => {
    const recipeDataFromDB = fetch(API_URL)

    recipeDataFromDB
    .then((res => res.json()))
    .then((recipesFromDB) => {
      
      if(recipesFromDB != null) {
        const mappedRecipes = recipesFromDB.map(recipe => {
          const changeObj = {
            id: recipe._id,
            ingredients: 
              recipe.ingredients.map(ingredient => {
                return { ...ingredient, id: ingredient._id }
              }),
            authors: 
              recipe.authors.map(author => {
                return { ...author, id: author._id}
              })
          }
          return { ...recipe, ...changeObj }
        })
        console.log(mappedRecipes)
        setRecipes(mappedRecipes)
      }
    })  
    .catch(err => {
      console.log(err)
    })

  }, [])

  useEffect( () => {

    return () => console.log('Recipes set')
  }, [recipes])


  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeChange(id, recipe) {
    const UpdateRecipePromise = fetch(API_URL + id, { 
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe)
    })
    UpdateRecipePromise.then(res => res.json())
    .then(updatedRecipe => {
      const newRecipes = [...recipes]
      const mappedRecipe = mapRecipesID([updatedRecipe])
      const index = newRecipes.findIndex(r => r.id === id)
      newRecipes[index] = mappedRecipe[0]
      setRecipes(newRecipes)
    })
  }


  function handleRecipeSelect(id){
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd(){
    const newRecipe = {
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [

      ],
      authors: [
        
      ]
    }

    const AddRecipePromise = fetch(API_URL + "newrecipe", {
      method: 'POST',
      body: JSON.stringify(newRecipe)
    })

    AddRecipePromise.then(res => res.json())
    .then((updatedRecipe) => {
      const mappedRecipe = mapRecipesID([updatedRecipe])
      setSelectedRecipeId(mappedRecipe[0].id)
      setRecipes([...recipes, mappedRecipe[0]])
    })
    .catch((error) => {
      console.log(error)
    })

  }

  function handleRecipeDelete(id){
    const DeletePromise = fetch(API_URL + id, {
      method: 'DELETE'
    })

    DeletePromise.then(() => {
      console.log("Successfully deleted")
      if(selectedRecipeId != null && selectedRecipeId === id){
        setSelectedRecipeId(undefined)
      }
      setRecipes(recipes.filter(recipe => recipe.id !== id))
    })
  }




  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes}/>
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/> }
    </RecipeContext.Provider>
  )

}




const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    instructions: "1. Put salt on chicken\n2. Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Pounds'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbs'
      }
    ],
    authors: [
      {
        id: 1,
        name: 'Daniel'
      },
      {
        id: 2,
        name: 'Kyle'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 5,
    cookTime: '0:45',
    instructions: "1. Put paprika on pork\n2. Put pork in oven\n3. Eat pork",
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '3 Pounds'
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '2 Tbs'
      }
    ],
    authors: [
      {
        id: 1,
        name: 'Daniel'
      },
      {
        id: 2,
        name: 'Kile'
      }
    ]
  }
]

function mapRecipesID(recipeArray) {
  const mappedRecipes = recipeArray.map(recipe => {
    const changeObj = {
      id: recipe._id,
      ingredients: 
        recipe.ingredients.map(ingredient => {
          return { ...ingredient, id: ingredient._id }
        }),
      authors: 
        recipe.authors.map(author => {
          return { ...author, id: author._id}
        })
    }
    return { ...recipe, ...changeObj }
  })

  return mappedRecipes
}




export default App;