import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as PlusSymbol } from "../assets/plus-symbol.svg";

const StyledNewNoteButton = styled.button`
	position: fixed;
	overflow: hidden;
	bottom: 20px;
	right: 20px;
	width: 50px;
	height: 50px;
	background-color: ${(props) => props.theme.colors.primary};
	color: ${(props) => props.theme.colors.light};
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	text-decoration: none;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	border-radius: 50%;
	border: none;
`;

export const NewNoteButton = ({ onNewNote }) => {
	const navigate = useNavigate();

	return (
		<StyledNewNoteButton onClick={onNewNote}>
			<PlusSymbol fill={"white"} h={24} />
		</StyledNewNoteButton>
	);
};
