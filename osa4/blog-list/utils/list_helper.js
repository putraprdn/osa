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

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
};
