import { Link, useMatch } from "react-router-dom";

const BlogList = ({ blogs }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	return (
		<>
			{blogs.map((blog) => (
				<div
					key={blog.id}
					style={blogStyle}
					className="blog"
				>
					<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
				</div>
			))}
		</>
	);
};

export default BlogList;
