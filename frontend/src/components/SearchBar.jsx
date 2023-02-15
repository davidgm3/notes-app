import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
const SearchBarInput = styled.input`
	width: 100%;
	height: 100%;
	background-color: ${(props) => props.theme.colors.neutral700};
	color: ${(props) => props.theme.colors.light};
	border: none;
	font-size: 1rem;
	resize: none;
	&:focus {
		outline: none;
	}
	flex-grow: 1;
	padding: 0.4rem 1rem;
	border-radius: 10px;
	margin-bottom: 1rem;
`;
export const SearchBar = ({ onNewSearch }) => {
	const [inputValue, setInputValue] = useState('');
	const onInput = (e) => {
		setInputValue(e.target.value);
	};

	//if input value does not change for 200ms, search
	//auto search feature
	useEffect(() => {
		const timer = setTimeout(() => onNewSearch(inputValue), 200);

		return () => {
			clearTimeout(timer);
		};
	}, [inputValue]);

	return (
		<div>
			<SearchBarInput
				type='text'
				placeholder='Search'
				value={inputValue}
				onInput={(e) => {
					onInput(e);
				}}
			/>
		</div>
	);
};
