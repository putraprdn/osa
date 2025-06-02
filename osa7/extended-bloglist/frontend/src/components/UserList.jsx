import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ users }) => {
	return (
		<div>
			<h2>Users</h2>
			<table className="user-table">
				<thead>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td className="user-name">
								<Link to={`/users/${user.id}`}>{user.name}</Link>
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
