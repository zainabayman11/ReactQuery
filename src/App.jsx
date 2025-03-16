import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { QueryClient, QueryClientProvider , useQuery} from '@tanstack/react-query'
import Todo from './ToDo/Todo'



function App() {

  // Paginated Queries - dummy data

  const limit = 5
  const [page, setPage] = useState(0)
  const Products = async (page) => {
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${page * limit}`)
    const products = await res.json()
    return products
  }

  const { data, isLoading } = useQuery({
    queryKey: ['products', page],
    queryFn: () => Products(page),
  })

  console.log(data)

 if (isLoading) return <div>Loading...</div>;

  return (
    <>
     <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
     <button onClick={() => setPage(page + 1)} disabled={page === Math.ceil(data.total / limit) - 1}>Next</button>
    <div className="pagination">
        <span>Current Page: {page + 1}</span>
       
        <span>Last Page: {data.total && Math.ceil(data.total / limit)}</span>
    </div>
 <div>

      <h2>Products:</h2>
        {data.products && data.products.map(product => (
        <div key={product.id}>
          <h4>{product.title}</h4>
          <p>{product.description}</p>
          <hr />
        </div>
      ))}
    </div>
    </>
  )
}

export default App
