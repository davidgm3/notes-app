import styled from "styled-components";
import { NewNoteButton } from "./NewNoteButton";

import { useState } from "react";

const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.2);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const Form = styled.form`
	background-color: ${(props) => props.theme.colors.neutral700};
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(89, 89, 89, 0.2);
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	overflow: hidden;
	position: relative;
`;

const Input = styled.input`
	background-color: ${(props) => props.theme.colors.neutral200};
	border: none;
	border-radius: 5px;
	padding: 10px;
	font-size: 1rem;
	color: ${(props) => props.theme.colors.neutral800};
	margin-bottom: 10px;
	&:focus {
		outline: none;
	}
`;

const Button = styled.input`
	background-color: ${(props) => props.theme.colors.primary};
	border: none;
	border-radius: 5px;
	padding: 10px;
	font-size: 1rem;
	color: ${(props) => props.theme.colors.neutral100};
`;
export const NewCategoryModal = ({ onClose, onNewCategory }) => {
	const [categoryName, setCategoryName] = useState("");

	return (
		<ModalBackground>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					onNewCategory(categoryName);
					onClose();
				}}
			>
				<Input
					type="text"
					placeholder="Category Name"
					value={categoryName}
					onChange={(e) => setCategoryName(e.target.value)}
				/>
				<Button type="submit" value="Create" />
			</Form>
		</ModalBackground>
	);
};
