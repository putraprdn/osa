const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs = []) => {
	let likes = 0;
	blogs.forEach((blog) => {
		likes += blog?.likes || 0;
	});

	return likes;
};

const favoriteBlog = (blogs = []) => {
	let favIdx = null;

	blogs.forEach((blog, idx) => {
		favIdx = blog.likes >= blogs[favIdx || 0].likes ? idx : favIdx;
	});

	return favIdx === null ? null : blogs[favIdx];
};

const mostBlogs = (blogs = []) => {
	if (blogs.length === 0) return null;

	const authorBlogCount = {};
	for (const blog of blogs) {
		const author = blog.author;
		if (authorBlogCount[author]) {
			authorBlogCount[author] += 1;
		} else {
			authorBlogCount[author] = 1;
		}
	}

	let topAuthor = { author: "", blogs: 0 };
	for (const author in authorBlogCount) {
		const blogCount = authorBlogCount[author];
		if (blogCount > topAuthor.blogs) {
			topAuthor = { author, blogs: blogCount };
		}
	}

	return topAuthor;
};

const authorWithMostLikes = (blogs = []) => {
	if (blogs.length === 0) return null;

	const authorBlogLikes = {};
	for (const blog of blogs) {
		const author = blog.author;
		if (authorBlogLikes[author]) {
			authorBlogLikes[author] += blog.likes;
		} else {
			authorBlogLikes[author] = blog.likes;
		}
	}

	let topAuthor = { author: "", likes: 0 };
	for (const author in authorBlogLikes) {
		const totalLikes = authorBlogLikes[author];
		if (totalLikes > topAuthor.likes) {
			topAuthor = { author, likes: totalLikes };
		}
	}

	return topAuthor;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
    authorWithMostLikes
};
