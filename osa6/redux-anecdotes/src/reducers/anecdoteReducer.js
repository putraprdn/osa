import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

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
		updateAnecdote(state, action) {
			const payload = action.payload;
			const anecdoteToChange = state.find(
				(anecdote) => anecdote.id === payload.id
			);

			const updatedAnecdote = state.map((a) =>
				a.id !== payload.id ? a : { ...anecdoteToChange, ...payload }
			);

			return updatedAnecdote;
		},
	},
});

export const { setAnecdotes, addAnecdote, updateAnecdote } =
	anecdoteSlice.actions;

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.create(content);
		dispatch(addAnecdote(newAnecdote));
	};
};

export const addVote = (id) => {
	return async (dispatch) => {
		const updatedAnecdote = await anecdoteService.vote(id);
		dispatch(updateAnecdote(updatedAnecdote));
	};
};

export default anecdoteSlice.reducer;
