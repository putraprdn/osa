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

module.exports = {
	dummy,
	totalLikes,
};
