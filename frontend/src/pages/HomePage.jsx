import React, { useEffect } from 'react';
import { Note } from '../components/Note';
import { Container } from '../styles/Container';
import { getAllNotes, getAllCategories } from '../api/server';
import { NoteGrid } from './../components/NoteGrid';
import { NewNoteButton } from './../components/NewNoteButton';
import { LoadingModalFull } from './../components/LoadingModalFull';
import { useNavigate } from 'react-router-dom';
import { createNote } from '../api/server';
import { SearchBar } from '../components/SearchBar';
import { FadeIn } from '../styles/FadeIn';
import { CategorySlider } from '../components/CategorySlider';

export const HomePage = () => {
	const [notes, setNotes] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [searchTerm, setSearchTerm] = React.useState('');
	const [selectedCategories, setSelectedCategories] = React.useState([]);
	const [categories, setCategories] = React.useState([]);
	const navigate = useNavigate();

	//loads all notes and categories
	const loadNotes = async () => {
		setIsLoading(true);
		const notes = await getAllNotes(searchTerm, selectedCategories);
		const categories = await getAllCategories();
		setCategories(categories);
		setNotes(notes);
		setIsLoading(false);
	};

	//scrolls to top on every dependency
	useEffect(() => {
		window.scrollTo(0, 0);
		console.log('scroll to top');
	});

	//updates notes when search term changes
	useEffect(() => {
		loadNotes();
	}, [searchTerm]);

	//reloads notes when a note is deleted
	const onDeleteNote = () => {
		loadNotes();
	};

	//creates a new note
	const onNewNote = async () => {
		setIsLoading(true);
		const newNote = await createNote({
			title: '',
			content: '',
			categories: selectedCategories,
		});

		if (newNote.error) {
			navigate('/error');
			return;
		}
		navigate(`/notes/${newNote._id}`);
		setIsLoading(false);
	};

	//handles search term change
	const onNewSearch = async (searchTerm) => {
		setSearchTerm(searchTerm);
	};

	//handles category change
	const onSelectedCategoriesChange = async (selectedCategories) => {
		setSelectedCategories(selectedCategories);
	};

	useEffect(() => {
		loadNotes();
	}, [selectedCategories]);
	return (
		<>
			<Container style={{ paddingBlock: '1rem', minHeight: '100vh' }}>
				<FadeIn>
					<SearchBar onNewSearch={onNewSearch} />
					<CategorySlider
						onSelectedCategoriesChange={onSelectedCategoriesChange}
					/>
					{isLoading && <LoadingModalFull />}
					<NoteGrid
						notes={notes}
						onDeleteNote={onDeleteNote}
						categories={categories}
					/>
				</FadeIn>
				<NewNoteButton onNewNote={onNewNote} />
			</Container>
		</>
	);
};
