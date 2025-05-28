import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	};
};

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		setAnecdotes(state, action) {
			const anecdotes = action.payload;
			return anecdotes;
		},
		addAnecdote(state, action) {
			const content = action.payload;
			return [...state, content];
		},
		voteAnecdote(state, action) {
			const id = action.payload;
			const anecdoteToChange = state.find((a) => a.id === id);
			const changedAnecdote = {
				...anecdoteToChange,
				votes: anecdoteToChange.votes + 1,
			};
			return state.map((a) => (a.id !== id ? a : changedAnecdote));
		},
	},
});

export const { setAnecdotes, addAnecdote, voteAnecdote } =
	anecdoteSlice.actions;
export default anecdoteSlice.reducer;
