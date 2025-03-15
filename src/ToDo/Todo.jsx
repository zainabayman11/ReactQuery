import { useQuery } from '@tanstack/react-query'
import React from 'react'
import './Todo.css' 

export default function Todo() {

//  First useQuery hook to fetch data from the API
  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
        res.json()
      ),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="todo-container">
      {data?.map((todo) => (
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
    </div>
  );
}
