import React, { useContext } from 'react';
import RecipeIngredientEdit from './RecipeIngredientEdit';
import { RecipeContext } from './App'
import { v4 as uuidv4 } from 'uuid'
import RecipeAuthorEdit from './RecipeAuthorEdit'



const RecipeEdit = ({ recipe }) => {
	const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext)

	function handleChange(changes) {
		handleRecipeChange(recipe.id, { ...recipe, ...changes })
		console.log({ ...recipe, ...changes })
	}

	function handleIngredientChange(id, ingredient){
		const newIngredients = [...recipe.ingredients]
		const index = newIngredients.findIndex(i => i.id === id)
		newIngredients[index] = ingredient
		handleChange({ ingredients: newIngredients })
	}

	function handleIngredientAdd(){
		const newIngredient = {
		  id: uuidv4(),
		  name: '',
		  amount: ''
		}

		console.log(newIngredient)
		handleChange({ ingredients: [...recipe.ingredients, newIngredient] })
	}

	function handleIngredientDelete(id) {
		handleChange({ 
			ingredients: recipe.ingredients.filter(ingredient => ingredient.id !== id) 
		})
	}


	function handleAuthorChange(id, newAuthor) {
		const authors = [...recipe.authors]
		const index = authors.findIndex(author => author.id === id)
		authors[index] = newAuthor

		handleChange({ authors: authors })
	}

	function handleAuthorDelete(id){
		const authors = [...recipe.authors]
		const filteredAuthors = authors.filter(author => author.id !== id)
		handleChange({ authors: filteredAuthors })
	}

	function handleAuthorAdd(){
		const newAuthor = {
			id: uuidv4(),
			name: ''
		}

		handleChange({ authors: [...recipe.authors, newAuthor]})
	}

	return (
		<div className="recipe-edit">
			<div className="recipe-edit__remove-button-container">
				<button 
					className="btn recipe-edit__remove-button"
					onClick={() => handleRecipeSelect(undefined)}
				>
				&times;</button>
			</div>
			<div className="recipe-edit__details-grid"> 
				<label htmlFor="name" className="recipe-edit__label">Name</label>
				<input type="text" value={recipe.name} name="name" id="name" onChange={ e => handleChange({ name: e.target.value })} className="recipe-edit__input"/>

				<label htmlFor="cookTime" className="recipe-edit__label">Cook Time</label>
				<input type="text" value={recipe.cookTime} name="cookTime" onChange={ e => handleChange({ cookTime: e.target.value })} id="cookTime" className="recipe-edit__input" />

				<label htmlFor="servings" className="recipe-edit__label">Servings</label>
				<input type="number" value={recipe.servings} min="1" name="servings" onChange={ e => handleChange({ servings: parseInt(e.target.value) || ''})} id="servings" className="recipe-edit__input"/>

				<label htmlFor="instructions" className="recipe-edit__label">Instructions</label>
				<textarea name="instructions" value={recipe.instructions} onChange={ e => handleChange({ instructions: e.target.value })} id="instructions" className="recipe-edit__input" >
					{recipe.instructions}
				</textarea>
			</div>
			<br />
			<label className="recipe-edit__label">Ingredients</label>
			<div className="recipe-edit__ingredient-grid">
				<div>Name</div>
				<div>Amount</div>
				<div></div>
				{recipe.ingredients.map(ingredient => {
					return (
					<RecipeIngredientEdit 
						key={ingredient.id}
						ingredient={ingredient}
						handleIngredientChange={handleIngredientChange}
						handleIngredientDelete={handleIngredientDelete}
					/>
					)
				})}
			</div>
			<div className="recipe-edit__add-ingredient-btn-container">
				<button 
					className="btn btn--primary"
					onClick={() => handleIngredientAdd()}
				>
				Add ingredient</button>
			</div>
			<label className="recipe-edit__label">Authors</label>
			<div className="recipe-edit__author-grid">
				<div>Name</div>
				<div></div>
				{recipe.authors.map(author => {
					return (
						<RecipeAuthorEdit 
							key={author.id}
							author={author}
							handleAuthorChange={handleAuthorChange}
							handleAuthorDelete={handleAuthorDelete}
						/>
					)
				})}
			</div>

			<div className="recipe-edit__add-ingredient-btn-container">
				<button 
					className="btn btn--primary"
					onClick={() => handleAuthorAdd()}
				>
				Add author</button>
			</div>
		</div>
	);
}

export default RecipeEdit;
