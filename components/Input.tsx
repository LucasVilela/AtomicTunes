import React, { FC } from 'react';

interface InputProps {
	onSearch: (artistName: string) => void;
	placeholder: string;
}

const Input: FC<InputProps> = ({ onSearch, placeholder }) => {
	return (
		<div>
			<form
				onSubmit={(e: React.SyntheticEvent) => {
					e.preventDefault();
					onSearch(e.currentTarget.artistName.value);
				}}
			>
				<input
					className="input"
					type="text"
					name="artistName"
					placeholder={placeholder}
				/>
				<button type="submit" aria-label="Search for albums">
					Search
				</button>
			</form>
		</div>
	);
};

export default Input;
