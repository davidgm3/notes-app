import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { getAllCategories, createCategory } from '../api/server';
import { NewCategoryModal } from './NewCategoryModal';

const CategoryContainer = styled.div`
	background-color: ${(props) =>
		props.selected
			? props.theme.colors.neutral500
			: props.theme.colors.neutral700};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex-shrink: 0;
	padding: 10px;
	border-radius: 10px;
	cursor: pointer;
	border: none;
`;
const StyledCategorySlider = styled.div`
	display: flex;
	flex-direction: row;
	overflow-x: auto;
	width: 100%;
	gap: 10px;

	margin-bottom: 1rem;
`;

export const CategorySlider = ({ onSelectedCategoriesChange }) => {
	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedCats, setSelectedCats] = useState([]);

	const [newCatModal, setNewCatModal] = useState(false);

	//loads categories into state
	const loadCategories = async () => {
		setIsLoading(true);
		let categories = await getAllCategories();

		setCategories(categories);
		setIsLoading(false);
	};

	//function to handle adding a category
	const onNewCategory = async (title) => {
		await createCategory({ title });
		loadCategories();
	};

	//effects
	useEffect(() => {
		onSelectedCategoriesChange(selectedCats);
	}, [selectedCats]);
	useEffect(() => {
		loadCategories();
	}, []);

	return (
		<StyledCategorySlider>
			{categories.map((category) => (
				<CategoryContainer
					onClick={() => {
						if (selectedCats.includes(category._id)) {
							setSelectedCats(
								selectedCats.filter(
									(cat) => cat !== category._id
								)
							);
						} else {
							setSelectedCats([...selectedCats, category._id]);
						}
					}}
					key={category._id}
					selected={selectedCats.includes(category._id)}
				>
					{category.title}
				</CategoryContainer>
			))}
			<CategoryContainer
				as='button'
				onClick={() => setNewCatModal(!newCatModal)}
			>
				<p>+</p>
			</CategoryContainer>
			{newCatModal && (
				<NewCategoryModal
					onNewCategory={onNewCategory}
					onClose={() => setNewCatModal(false)}
				/>
			)}
		</StyledCategorySlider>
	);
};
