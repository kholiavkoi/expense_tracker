import React from 'react';
import { default as api } from "../store/apiSlice";

import 'boxicons'


const List = () => {
	const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery()
	const [deleteTransaction] = api.useDeleteTransactionMutation()

	let Transactions

	const handleClick = (e) => {
		if (!e.target.dataset.id) return 0
		deleteTransaction({
			_id: e.target.dataset.id,
		})
	}
	if (isFetching) {
		Transactions = <div>Fetching</div>
	} else if (isSuccess) {
		Transactions = data.map((v, i) => <Transaction handler={handleClick} category={v} key={i} />)
	} else if (isError) {
		Transactions = <div>Error</div>
	}

	return (
		<div className='flex flex-col py-6 gap-3'>
			<h1 className='py-4 font-bold text-xl'>History</h1>
			{Transactions}

		</div>
	);
};

function Transaction({ category, handler }) {
	if (!category) return null
	return (
		<div className='item flex justify-center bg-gray-50 py-2 rounded'
			 style={{ borderRight: `8px solid ${category.color ?? '#e5e5e5'}` }}>
			<button onClick={handler} className='px-3'>
				<box-icon data-id={category.id ?? ''} size='15px' color={category.color ?? '#e5e5e5'} name='trash'></box-icon>
			</button>
			<span className='block w-full'>{category.name ?? ''}</span>
		</div>
	)
}

export default List;