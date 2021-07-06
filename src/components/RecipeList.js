import React, { useContext, useState, useEffect } from 'react';
import Recipe from './Recipe';
import { RecipeContext } from './App'

export default function RecipeList({ recipes }) {
	const [filteredRecipes, setFilteredRecipes] = useState(recipes)
	const { handleRecipeAdd } = useContext(RecipeContext)

	useEffect(() => {
		setFilteredRecipes([...recipes])
	}, [recipes])

	function handleFilteredRecipes(search){
		if(search === '') return setFilteredRecipes([...recipes])

		setFilteredRecipes(
			[...recipes].filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase()))
		)
	}

	return (
		<div className="recipe-list">
			<div className="recipe-list__search-bar-container">
				<input 
					className="recipe-list__search-bar"
					type="text"
					placeholder="Search Here..."
					onChange={ (e)=> handleFilteredRecipes(e.target.value)}
				/>
			</div>
			<div>
				{filteredRecipes.map( (recipe) => {
					return (
						<Recipe 
							key={recipe.id}
							{...recipe}
						/>
					)
				})}
			
			</div>
			<div className="recipe-list__add-recipe-btn-container">
				<button 
					className="btn btn--primary"
					onClick={ () => handleRecipeAdd()}
				>
				 Add recipe
				</button>
			</div>
		</div>
	);
}
