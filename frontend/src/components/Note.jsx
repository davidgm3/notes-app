import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as TrashcanIcon } from '../assets/trashcan-icon.svg';
import {
	CardContainer,
	CardContent,
	CardText,
	CardTitle,
	CardSubText,
} from '../styles/Card';
import { deleteNote } from '../api/server';

export const Note = ({ note, onDeleteNote, categories }) => {
	//formats date from db to str
	const date = new Date(note.lastEditedAt);
	const dateStr =
		date.getDate() +
		'-' +
		date.getMonth() +
		'-' +
		date.getFullYear() +
		' ' +
		date.getHours() +
		':' +
		date.getMinutes();

	const navigate = useNavigate();
	const navigateToNote = () => {
		navigate(`/notes/${note._id}`);
	};

	return (
		<CardContainer onClick={(e) => navigateToNote(e)}>
			<CardContent>
				<CardTitle>{note.title || 'No title'}</CardTitle>
				<CardText>{note.content || 'No content'}</CardText>
				<CardSubText>{dateStr}</CardSubText>
				<CardSubText>
					{categories
						.filter((category) =>
							note.categories.includes(category._id)
						)
						.map((category) => category.title)
						.join(', ')}
				</CardSubText>
			</CardContent>
			<button
				onClick={async (e) => {
					e.stopPropagation();
					await deleteNote(note._id);

					console.log('note._id', note._id);
					onDeleteNote();
				}}
				style={{
					backgroundColor: 'transparent',
					border: 'none',
					cursor: 'pointer',
					position: 'absolute',
					top: '10px',
					right: '10px',
				}}
			>
				<TrashcanIcon width={20} height={20} fill='white' />
			</button>
		</CardContainer>
	);
};
