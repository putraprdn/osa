import { gql } from "@apollo/client";

export const GET_ALL_AUTHORS = gql`
	query {
		allAuthors {
			id
			name
			born
			bookCount
		}
	}
`;

export const GET_ALL_BOOKS = gql`
	query {
		allBooks {
			id
			title
			genres
			author {
				name
				id
				born
			}
			published
		}
	}
`;

export const CURRENT_USER = gql`
	query {
		me {
			id
			username
			favoriteGenre
		}
	}
`;

export const ADD_BOOK = gql`
	mutation createBook(
		$title: String!
		$published: Int!
		$author: String!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			published: $published
			author: $author
			genres: $genres
		) {
			id
			title
			author
			published
			genres
		}
	}
`;

export const UPDATE_AUTHOR_BORN = gql`
	mutation updateAuthor($name: String!, $born: Int!) {
		editAuthor(name: $name, born: $born) {
			id
			name
			born
		}
	}
`;

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`;
