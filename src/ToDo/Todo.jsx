import { useQuery, useMutation } from '@tanstack/react-query'
import React from 'react'
import './Todo.css' 

export default function Todo() {

//  First useQuery hook to fetch data from the API
  // const { data, isLoading } = useQuery({
  //   queryKey: ['todos'],
  //   queryFn: () =>
  //     fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
  //       res.json()
  //     ),
  // });


  // if (isLoading) return <div>Loading...</div>;

  
  // useMutation hook to get data from the API

  const getMutation = useMutation({
    mutationFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
        res.json()
      ),

      onSuccess: (data) => {
        console.log('Data fetched successfully:', data);
      },

      onError: (error) => {
        console.error('Error fetching data:', error);
      },
  });


  
 if (getMutation.isLoading) return <div>Loading...</div>;
 if (getMutation.isError) return <div>Error: {getMutation.error.message}</div>;

  return (
    <>

    <button onClick={() => getMutation.mutate()}>Get Data</button>


    <div className="todo-container">

    {/* useMutation */}
      {getMutation.data?.map((todo) => (
        <div
          key={todo.id}
          className={`todo-box ${todo.completed ? 'completed' : 'incomplete'}`}
        >
          <h4>Task #{todo.id}</h4>
          <p>{todo.title}</p>
          <span className="status">
            {todo.completed ? 'Completed' : 'Incomplete'}
          </span>
        </div>
      ))}


      {/* useQuery */}
      {/* {data?.map((todo) => (
        <div
          key={todo.id}
          className={`todo-box ${todo.completed ? 'completed' : 'incomplete'}`}
        >
          <h4>Task #{todo.id}</h4>
          <p>{todo.title}</p>
          <span className="status">
            {todo.completed ? 'Completed' : 'Incomplete'}
          </span>
        </div>
      ))} */}
    </div>

    </>
  );
}
