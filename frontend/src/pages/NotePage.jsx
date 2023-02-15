import styled from 'styled-components';
import { updateNote, getNote, getAllCategories } from '../api/server';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { LoadingModalFull } from './../components/LoadingModalFull';
import { FadeIn } from './../styles/FadeIn';
import { Container } from './../styles/Container';

const NoteContent = styled.textarea`
	width: 100%;
	height: 100%;
	background-color: ${(props) => props.theme.colors.neutral800};
	color: ${(props) => props.theme.colors.light};
	border: none;
	font-size: 1rem;
	resize: none;
	&:focus {
		outline: none;
	}
	flex-grow: 1;
	padding: 1rem;
`;

const NoteTitle = styled.input`
	width: 100%;
	height: 100%;
	background-color: ${(props) => props.theme.colors.neutral800};
	color: ${(props) => props.theme.colors.light};
	border: none;

	font-size: 1.8rem;
	resize: none;
	&:focus {
		outline: none;
	}
	padding: 1rem;
`;
const SaveButton = styled.button`
	position: fixed;
	bottom: 20px;
	right: 20px;
	border-radius: 10px;
	background-color: ${(props) => props.theme.colors.primary};
	color: ${(props) => props.theme.colors.light};
	border: none;
	font-size: 1rem;
	resize: none;
	&:focus {
		outline: none;
	}
	flex-grow: 1;
	font-weight: 600;
	padding: 0.6rem 1.2rem;
`;

const CatElement = styled.div`
	background-color: ${(props) =>
		props.selected
			? props.theme.colors.neutral500
			: props.theme.colors.neutral700};
	color: ${(props) => props.theme.colors.light};
	border-radius: 10px;
	padding: 0.5rem 1rem;
	margin: 0.5rem;
`;

export const NotePage = () => {
	const [content, setContent] = useState('');
	const [title, setTitle] = useState('');
	const [categories, setCategories] = useState([]);

	const [allCategories, setAllCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	//loads a note
	const loadNote = async () => {
		setIsLoading(true);
		const note = await getNote(id);
		const categories = await getAllCategories();
		setTitle(note.title);
		setContent(note.content);
		setCategories(note.categories);
		setAllCategories(categories);
		setIsLoading(false);
	};

	//loads a note on page load
	useEffect(() => {
		loadNote();
	}, []);

	const navigate = useNavigate();

	//saves note to backend
	const saveNote = () => {
		updateNote(id, {
			title,
			content,
			categories,
		});
		navigate('/');
	};

	//handles input
	const onInput = (e) => {
		if (e.target.placeholder === 'title') {
			setTitle(e.target.value);
		} else {
			setContent(e.target.value);
		}
	};

	return (
		<Container>
			<FadeIn
				style={{
					minHeight: '100vh',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{isLoading ? (
					<LoadingModalFull />
				) : (
					<>
						<NoteTitle
							type='text'
							placeholder='title'
							value={title}
							onInput={onInput}
						/>
						<NoteContent
							type='text'
							placeholder='content'
							value={content}
							onInput={onInput}
						/>

						{allCategories.map((category) => {
							return (
								<CatElement
									selected={categories.includes(category._id)}
									onClick={() => {
										if (categories.includes(category._id)) {
											setCategories(
												categories.filter(
													(cat) =>
														cat !== category._id
												)
											);
										} else {
											setCategories([
												...categories,
												category._id,
											]);
										}
									}}
								>
									{category.title}
								</CatElement>
							);
						})}
					</>
				)}
			</FadeIn>
			<SaveButton onClick={saveNote}>Save</SaveButton>
		</Container>
	);
};
