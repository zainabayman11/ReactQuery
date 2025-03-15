import { useQuery, useMutation , useQueryClient} from '@tanstack/react-query'
import React from 'react'
import './Todo.css' 
import { Field, Form, Formik } from 'formik';

export default function Todo() {

// useQueryClient hook to get the query client
  const queryClient = useQueryClient()

//  First useQuery hook to fetch data from the API

  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: () =>
      fetch('http://localhost:3000/todo').then((res) =>
        res.json()
      ),
  });

  // if (isLoading) return <div>Loading...</div>;



  // useMutation add data to the API
  const initialValues = {
    title: '',
    description: '',
  };

  const addMutation = useMutation({

    // mutationKey: ['todos'],

    mutationFn: (data) =>
      fetch('http://localhost:3000/todo', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        body: JSON.stringify(data),
      }).then((res) => res.json()),

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
      }
  });

  const handleSubmit = (values) => {
    console.log(values);
    addMutation.mutate(values);
  };







  // useMutation hook to get data from the API

  // const getMutation = useMutation({
  //   mutationFn: () =>
  //     fetch('http://localhost:3000/todo').then((res) =>
  //       res.json()
  //     ),

  //     onSuccess: (data) => {
  //       console.log('Data fetched successfully:', data);
  //     },

  //     onError: (error) => {
  //       console.error('Error fetching data:', error);
  //     },
  // });

//  if (getMutation.isLoading) return <div>Loading...</div>;
//  if (getMutation.isError) return <div>Error: {getMutation.error.message}</div>;



  return (
    <>


<Formik initialValues={initialValues} onSubmit={handleSubmit} >

  <Form>
   <Field name="title"  placeholder="Enter Title" />
   <Field name="description" placeholder="Enter Description" />
   <button type="submit">add todo</button>
  </Form>
</Formik>


    <div className="todo-container">

    {/* useMutation */}
      {/* {getMutation.data?.map((todo) => (
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


      {/* useQuery */}
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

    </>
  );
}
