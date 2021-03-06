import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState'
import Cookie from 'js-cookie'

function NavBar() {
	const router = useRouter()
	const { state, dispatch } = useContext(DataContext)
	const { auth, cart } = state

	const isActive = r => r === router.pathname ? ' active' : ''

	const handleLogout = () => {
		Cookie.remove('refreshToken', { path: 'api/auth/accessToken' })
		localStorage.removeItem('firstLogin')
		dispatch({ type: 'AUTH', payload: {} })
		dispatch({ type: 'NOTIFY', payload: { success: 'Logged out!' } })
		return router.push('/')
	}

	const adminRouter = () => {
		return (
			<>
				<Link href="/users">
					<a className="dropdown-item">Users</a>
				</Link>
				<Link href="/create">
					<a className="dropdown-item">Products</a>
				</Link>
				<Link href="/categories">
					<a className="dropdown-item">Categories</a>
				</Link>
			</>
		)
	}

	const loggedRouter = () => {
		return (
			<li className="nav-item dropdown">
				<a
					className="nav-link dropdown-toggle"
					href="#"
					id="navbarDropdownMenuLink"
					role="button"
					data-toggle="dropdown"
					aria-expanded="false"
				>
					<img src={auth.user.avatar} alt="User Avatar"
							 style={{
								 borderRadius: '50%', width: '30px', height: '30px',
								 transform: 'translateY(-3px)', marginRight: '3px',
							 }}/>
					{auth.user.name}
				</a>
				<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
					<Link href="/profile">
						<a className="dropdown-item">
							Profile
						</a>
					</Link>

					{
						auth.user.role === 'admin' && adminRouter()
					}

					<div className="dropdown-divider"></div>
					<button className="dropdown-item" onClick={handleLogout}>
						Logout
					</button>
				</div>
			</li>
		)
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link href="/">
				<a className="navbar-brand">Top Intim</a>
			</Link>

			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
				<ul className="navbar-nav p-1">
					<li className="nav-item">
						<Link href="/">
							<a className={'nav-link' + isActive('/')}>
								Home
							</a>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/cart">
							<a className={'nav-link position-relative' + isActive('/cart')}>
								<i className="fa fa-shopping-cart" aria-hidden="true"> <span className="ml-1">Cart</span></i>

								<span className="position-absolute"
											style={{
												padding: '3px 6px',
												background: '#ed143dc2',
												borderRadius: '50%',
												top: '-5px',
												right: '-5px',
												color: 'white',
												fontSize: '14px',
											}}>{cart.length}</span>
							</a>
						</Link>
					</li>

					{
						Object.keys(auth).length === 0
							? <li className="nav-item">
								<Link href="/signin">
									<a className={'nav-link' + isActive('/signin')}>
										Sign in
									</a>
								</Link>
							</li>
							: loggedRouter()
					}
				</ul>
			</div>
		</nav>
	)
}

export default NavBar
