import React from 'react'
import Author from './Author'

const AuthorList = ({ authors }) => {
	
	const authorsElements = authors.map( (author, index) => {
		const addComma = (index + 1 < authors.length) ? true : false
		return (
			<Author 
				key={author.id}
				author={author}
				addComma={addComma}
			/>
		)
	})

	return (
		<div className="author-row">
			{authorsElements}
		</div>
	);
}

export default AuthorList;
