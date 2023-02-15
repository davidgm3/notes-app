import React from "react";
import { Note } from "./Note";
import styled from "styled-components";
const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	grid-gap: 10px;
`;

export const NoteGrid = ({ notes, onDeleteNote, categories }) => {
	return (
		<StyledGrid>
			{notes.map((note) => (
				<Note
					key={Math.random()}
					note={note}
					onDeleteNote={onDeleteNote}
					categories={categories}
				/>
			))}
		</StyledGrid>
	);
};
