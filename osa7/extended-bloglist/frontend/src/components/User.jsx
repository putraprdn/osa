import { useParams } from "react-router-dom";

const User = ({ users }) => {
	const { id } = useParams();
	const user = users.find((u) => u.id === id);
	const userBlogs = user?.blogs || [];

	return (
		<div className="container mt-4">
			<h2 className="mb-3">{user.name}</h2>
			<strong>Added Blogs:</strong>
			<ul className="list-group mt-2">
				{userBlogs.length > 0 ? (
					userBlogs.map((blog) => (
						<li
							key={blog.id}
							className="list-group-item"
						>
							{blog.title}
						</li>
					))
				) : (
					<li className="list-group-item">No blogs added yet.</li>
				)}
			</ul>
		</div>
	);
};

export default User;
