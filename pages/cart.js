import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../store/GlobalState'
import Link from 'next/link'
import CartItem from '../components/CartItem'
import { getData } from '../utils/fetchData'

const Cart = () => {
	const [total, setTotal] = useState(0)
	const { state, dispatch } = useContext(DataContext)
	const { cart, auth } = state

	useEffect(() => {
		const getTotal = () => {
			const res = cart.reduce((prev, item) => {
				return prev + (item.price * item.quantity)
			}, 0)

			setTotal(res)
		}

		getTotal()
	}, [cart])

	useEffect(() => {
		const cartLocal = JSON.parse(localStorage.getItem('__next__cart01'))
		if (cartLocal && cartLocal.length > 0) {
			let newArr = []
			const updateCart = async () => {
				for (const item of cartLocal) {
					const res = await getData(`product/${item._id}`)
					const { _id, title, images, price, inStock, sold } = res.product
					if (inStock > 0) {
						newArr.push({
							_id, title, images, price, inStock, sold,
							quantity: item.quantity > inStock ? 1 : item.quantity,
						})
					}
				}

				dispatch({ type: 'ADD_CART', payload: newArr })
			}

			updateCart()
		}
	}, [])

	if (cart.length === 0) return <img
		className="image-responsive w-100"
		src="./empty_cart.jpeg" alt="not empty"/>
	return (
		<div className="row mx-auto">
			<Head>
				<title>Cart Page</title>
			</Head>

			<div className="col-md-8 text-uppercase text-secondary table-responsive my-3">
				<h2>Shopping Cart</h2>
				<table className="table my-3">
					<tbody>
					{
						cart.map(item => (
							<CartItem key={item._id} item={item}
												dispatch={dispatch} cart={cart}/>
						))
					}
					</tbody>
				</table>
			</div>

			<div className="col-md-4 text-right text-uppercase text-secondary my-3">
				<form>
					<h2>Shipping</h2>

					<label htmlFor="address">Address</label>
					<input type="text" name="address" id="address"
								 className="form-control mb-2"/>

					<label htmlFor="mobile">Mobile</label>
					<input type="text" name="mobile" id="mobile"
								 className="form-control mb-2"/>

					<h3>Total: <span className="text-danger">{total}</span></h3>

					<Link href={auth.user ? '#' : '/signin'}>
						<a className="btn btn-dark my-2">Proceed with payment</a>
					</Link>
				</form>
			</div>

		</div>
	)
}

export default Cart
