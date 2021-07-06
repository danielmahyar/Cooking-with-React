import React from 'react';

const RecipeIngredientEdit = ({ ingredient, handleIngredientChange, handleIngredientDelete }) => {
	
	function handleChange(changes){
		handleIngredientChange(ingredient.id, { ...ingredient, ...changes })
	}
	
	return (
		<>
			<input 
				className="recipe-edit__input" 
				value={ingredient.name} 
				type="text"
				onChange={(e) => handleChange({ name: e.target.value })}
			/>

			<input 
				className="recipe-edit__input" 
				value={ingredient.amount} 
				type="text" 
				onChange={(e) => handleChange({ amount: e.target.value })}
			/>

			<button 
				className="btn btn--danger"
				onClick={ () => handleIngredientDelete(ingredient.id) }
			>
			  &times;</button>	
		</>
	);
}

export default RecipeIngredientEdit;
