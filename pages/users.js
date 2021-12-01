import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import Head from 'next/head'
import Link from 'next/link'

const Users = () => {
	const { state, dispatch } = useContext(DataContext)
	const { users, auth } = state

	if (!auth.user) {
		return null
	}

	return (
		<div className="table-responsive">
			<Head>
				<title>Users</title>
			</Head>

			<table className="table w-100">
				<thead>
				<tr>
					<th>#</th>
					<th>ID</th>
					<th>Avatar</th>
					<th>Name</th>
					<th>Email</th>
					<th>Admin</th>
					<th>Action</th>
				</tr>
				</thead>
				<tbody>
				{
					users.length && users.map((user, index) => (
						<tr key={user._id} style={{ cursor: 'pointer' }}>
							<th>{index + 1}</th>
							<td>{user._id}</td>
							<td>
								<img src={user.avatar} alt={user.avatar}
										 style={{
											 width: '30px', height: '30px',
											 overflow: 'hidden', objectFit: 'cover',
										 }}/>
							</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>
								{
									user.role === 'admin'
										? user.root ? <i className="fa fa-check text-success">Root</i>
											: <i className="fa fa-check text-success"></i>
										: <i className="fa fa-times text-danger"></i>
								}
							</td>
							<td>
								<Link href={
									auth.user.root && auth.user.email !== user.email
										? `edit_user/${user._id}` : '#!'
								}>
									{
										auth.user.root && auth.user.email !== user.email
											? <a><i className="fa fa-edit text-info mr-2" title="Edit"></i></a>
											: <div></div>
									}
								</Link>

								{
									auth.user.root && auth.user.email !== user.email
										? <i className="fa fa-trash text-danger ml-2" title="Remove"
												 data-toggle="modal" data-target="#exampleModal"
												 onClick={() => dispatch({
													 type: 'ADD_MODAL',
													 payload: { data: users, id: user._id, title: user.name, type: 'ADD_USERS' },
												 })}
										></i>
										: <div></div>
								}
							</td>
						</tr>
					))
				}
				</tbody>
			</table>
		</div>
	)
}

export default Users
