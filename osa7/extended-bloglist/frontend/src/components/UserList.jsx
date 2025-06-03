import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ users }) => {
	return (
		<div className="container mt-4">
			<h2 className="mb-3">Users</h2>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>User</th>
						<th>Blogs Created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td className="user-name">
								<Link
									to={`/users/${user.id}`}
									className="text-decoration-none"
								>
									{user.name}
								</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserList;
