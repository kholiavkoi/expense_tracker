import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseURI = 'http://localhost:8080'

export const apiSlice = createApi({
	reducerPath: 'apiSlice',
	baseQuery: fetchBaseQuery({
		baseUrl: baseURI
	}),
	endpoints: builder => ({
		// get categories
		getCategories: builder.query({
			query: () => '/api/categories',
			providesTags: ['categories']
		}),

		// get labels
		getLabels: builder.query({
			query: () => '/api/labels',
			providesTags: ['transaction']
		}),

		// add new Transaction
		addTransaction: builder.mutation({
			query: (data) => ({
				url: '/api/transaction',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['transaction']
		}),

		// delete record
		deleteTransaction: builder.mutation({
			query: (recordId) => ({
				url: 'api/transaction',
				method: 'DELETE',
				body: recordId
			}),
			invalidatesTags: ['transaction']
		})
	})
})

export default apiSlice