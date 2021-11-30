import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../store/GlobalState'
import { useRouter } from 'next/router'
import Head from 'next/head'
import OrderDetail from '../../components/OrderDetail'

const DetailOrder = () => {
	const { state, dispatch } = useContext(DataContext)
	const { orders, auth } = state

	const router = useRouter()

	const [orderDetail, setOrderDetail] = useState([])

	useEffect(() => {
		const newArr = orders.filter(order => order._id === router.query.id)
		setOrderDetail(newArr)
	}, [orders])

	return (
		<div className="my-3">
			<Head>
				Detail Order
			</Head>
			<button className="btn btn-dark" onClick={() => router.back()}>
				<i className="fa fa-long-arrow-left mx-2" aria-hidden='true'></i>
				Go Back
			</button>
			<OrderDetail orderDetail={orderDetail} />

		</div>
	)
}

export default DetailOrder
