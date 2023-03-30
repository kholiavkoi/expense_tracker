const model = require('../models/model')

// post: http://localhost:8080/api/categories
async function createCategories(req, res) {
	try {
		const Create = await new model.Categories({
			type: 'Investment',
			color: '#FCBE44'
		})
		await Create.save()
		return res.json(Create)

	} catch (err) {
		return res.status(400).json({ message: `Error while creating categories ${err}` })
	}
}

// get: http://localhost:8080/api/categories
async function getCategories(req, res) {
	let data = await model.Categories.find({})

	let filter = await data.map(v => Object.assign({}, { type: v.type, color: v.color }))

	return res.json(filter)
}

// post: http://localhost:8080/api/transaction
async function createTransaction(req, res) {
	if (!req.body) return res.status(400).json('Post HTTP Data not provided')
	let { name, type, amount } = req.body

	try {
		const create = await new model.Transaction({
			name,
			type,
			amount,
			date: new Date()
		})

		await create.save()
		return res.json(create)
	} catch (err) {
		return res.status(400).json({ message: `Error while creating transaction ${err}` })
	}
}

// get: http://localhost:8080/api/transaction
async function getTransactions(req, res) {
	let data = await model.Transaction.find({})

	return res.json(data)
}

// delete: http://localhost:8080/api/transaction
async function deleteTransaction(req, res) {
	if (!req.body) return res.status(400).json({ message: 'Request body not found' })

	try {
		await model.Transaction.deleteOne(req.body)
		res.json('Record Deleted!')
	} catch (err) {
		res.json('Error while deleting Transaction Record')
	}
}

// get: http://localhost:8080/api/labels
async function getLabels(req, res) {
	model.Transaction.aggregate([
		{
			$lookup: {
				from: 'categories',
				localField: 'type',
				foreignField: 'type',
				as: 'categories_info'
			}
		},
		{
			$unwind: '$categories_info'
		}
	]).then(result => {
		let data = result.map(v => ({
			id: v._id,
			type: v.type,
			amount: v.amount,
			name: v.name,
			color: v.categories_info.color
		}))
		res.json(data)
	}).catch(err => {
		res.status(400).json('Lookup Collection Error')
	})
}


module.exports = {
	createCategories,
	getCategories,
	createTransaction,
	getTransactions,
	deleteTransaction,
	getLabels
}