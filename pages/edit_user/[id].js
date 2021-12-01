import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../store/GlobalState'
import { useRouter } from 'next/router'
import { patchData } from '../../utils/fetchData'
import { updateItem } from '../../store/Actions'

const EditUser = () => {

	const { state, dispatch } = useContext(DataContext)
	const router = useRouter()

	const { id } = router.query
	const { auth, users } = state

	const [editUser, setEditUser] = useState([])
	const [checkAdmin, setCheckAdmin] = useState(false)
	const [num, setNum] = useState(0)


	useEffect(() => {
		users.forEach(user => {
			if (user._id === id) {
				setEditUser(user)
				setCheckAdmin(user.role === 'admin' ? true : false)
			}
		})
	}, [users])

	const handleChecked = () => {
		setCheckAdmin(!checkAdmin)
		setNum(num + 1)
	}

	const handleSubmit = () => {
		let role = checkAdmin ? 'admin' : 'user'
		if (num % 2 != 0) {

			dispatch({ type: 'NOTIFY', payload: { loading: true } })
			patchData(`user/${editUser._id}`, { role }, auth.token)
				.then(res => {
						if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
						dispatch(updateItem(users, editUser._id, {
							...editUser, role,
						}, 'ADD_USERS'))
						return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
					},
				)
		}

	}

	return (
		<div className="edit_user my-3">
			<Head>
				<title>Edit User</title>
			</Head>

			<button className="btn btn-dark" onClick={() => router.back()}>
				<i className="fa fa-long-arrow-left mx-2" aria-hidden></i>
				Go Back
			</button>
			<div className="row">
				<div className="col-md-4 mx-auto my-4">
					<h2 className="text-uppercase text-secondary text-center my-4">Edit User</h2>

					<div className="form-group">
						<label htmlFor="name" className="d-block">Name</label>
						<input type="text" id="name" placeholder="Your name" className="form-control"
									 defaultValue={editUser.name} disabled/>
					</div>

					<div className="form-group">
						<label htmlFor="email" className="d-block">Email</label>
						<input type="email" id="email" placeholder="Your email" className="form-control"
									 defaultValue={editUser.email} disabled/>
					</div>

					<div className="form-group">
						<input type="checkbox" id="isAdmin"
									 checked={checkAdmin} onChange={handleChecked}
						/>
						<label htmlFor="isAdmin" className="mx-2">isAdmin</label>
					</div>

					<button className="btn btn-dark" onClick={handleSubmit}>Update</button>
				</div>
			</div>
		</div>
	)
}

export default EditUser
