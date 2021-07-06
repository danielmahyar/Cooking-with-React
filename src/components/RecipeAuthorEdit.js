import React from 'react';

const RecipeAuthorEdit = ({ author, handleAuthorChange, handleAuthorDelete }) => {

	function handleChange(id, changes){
		handleAuthorChange(id, { ...author, ...changes })
	}

	return (
		<>
			<input
				className="recipe-edit__input"
				value={author.name}
				type="text"
				onChange={ (e) => handleChange(author.id, { name: e.target.value })}
			/>
			<button
				className="btn btn--danger"
				onClick={() => handleAuthorDelete(author.id)}
			>&times;</button>
		</>
	);
}

export default RecipeAuthorEdit;
