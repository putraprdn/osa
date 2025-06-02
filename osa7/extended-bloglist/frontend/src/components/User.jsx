const User = ({ user }) => {
	const userBlogs = user?.blogs || [];

	return (
		<div>
			<h2>{user.name}</h2>
			<strong>added blogs</strong>
			<ul>
				{userBlogs &&
					userBlogs.map((blog) => (
						<li key={blog.id}>{blog.title}</li>
					))}
			</ul>
		</div>
	);
};

export default User;
