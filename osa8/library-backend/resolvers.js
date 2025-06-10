const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const resolvers = {
	Query: {
		bookCount: async () => {
			const totalBooks = await Book.countDocuments();

			return totalBooks;
		},
		authorCount: async () => {
			const totalAuthors = Author.countDocuments();

			return totalAuthors;
		},
		allBooks: async (root, args) => {
			const filter = {};

			if (args.author) {
				const { _id } =
					(await Author.findOne({ name: args.author }).select(
						"_id"
					)) || {};
				if (_id) filter.author = _id;
			}

			if (args.genre) {
				filter.genres = { $in: args.genre };
			}

			return await Book.find(filter).populate({
				path: "author",
				select: "name id born",
			});
		},
		allAuthors: async () => {
			const authors = await Author.find({}).lean();

			const authorsWithBookCount = await Book.aggregate([
				{
					$group: {
						_id: "$author",
						bookCount: { $sum: 1 },
					},
				},
			]);

			// Map the authors to include the book count
			const authorsWithCounts = authors.map((author) => {
				const count = authorsWithBookCount.find(
					(a) => a._id.toString() === author._id.toString()
				);
				return {
					id: author._id,
					name: author.name,
					born: author.born,
					bookCount: count ? count.bookCount : 0,
				};
			});

			return authorsWithCounts;
		},
		me: (root, args, context) => {
			return context.currentUser;
		},
	},
	Mutation: {
		addBook: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new GraphQLError("not authenticated", {
					extensions: {
						code: "BAD_USER_INPUT",
					},
				});
			}

			try {
				let author = await Author.findOne({ name: args.author });
				if (!author) {
					// Create new author
					author = await Author.create({ name: args.author });
				}

				args.author = author;
				console.log(args);

				const createBook = new Book(args);
				await createBook.save();

				pubsub.publish("BOOK_ADDED", { bookAdded: createBook });

				return createBook;
			} catch (error) {
				console.log(JSON.stringify(error));
				let errorCode = "BAD_USER_INPUT";
				let errorMsg = error.message || "failed to create book";

				if (error.name === "ValidationError") {
					errorCode = error.name;
					errorMsg = error.message;
				}

				throw new GraphQLError(errorMsg, {
					extensions: {
						code: errorCode,
					},
				});
			}
		},
		editAuthor: async (root, args, { currentUser }) => {
			try {
				if (!currentUser) {
					throw new GraphQLError("not authenticated", {
						extensions: {
							code: "BAD_USER_INPUT",
						},
					});
				}

				return Author.findOneAndUpdate(
					{ name: args.name },
					{ born: parseInt(args.born) },
					{ new: true }
				);
			} catch (error) {
				console.log(JSON.stringify(error));
				let errorCode = "BAD_USER_INPUT";
				let errorMsg = error.message || "failed to create book";

				if (error.name === "ValidationError") {
					errorCode = error.name;
					errorMsg = error.message;
				}

				throw new GraphQLError(errorMsg, {
					extensions: {
						code: errorCode,
					},
				});
			}
		},
		createUser: async (root, args) => {
			try {
				const newUser = await User.create({
					username: args.username,
					favoriteGenre: args.favoriteGenre.toLowerCase(),
				});

				return newUser;
			} catch (error) {
				let errorCode = "BAD_USER_INPUT";
				let errorMsg = "failed to create book";

				if (error.name === "ValidationError") {
					errorCode = error.name;
					errorMsg = error.message;
				}

				throw new GraphQLError(errorMsg, {
					extensions: {
						code: errorCode,
					},
				});
			}
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });
			if (!user || args.password !== "secret") {
				throw new GraphQLError("wrong credentials", {
					extensions: {
						code: "BAD_USER_INPUT",
					},
				});
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
		},
	},
};

module.exports = resolvers;
