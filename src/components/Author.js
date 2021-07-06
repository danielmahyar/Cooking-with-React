import React from 'react';

const Author = ({ author, addComma}) => {
	const comma = (addComma === true) ? ", " : ""
	return (
		<>
			{ author.name }{comma} 
		</>
	);
}

export default Author;
