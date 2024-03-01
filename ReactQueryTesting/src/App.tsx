import './App.css';
import { useQuery, useMutation } from '@tanstack/react-query';

interface Todo {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App() {
  // It can be used as a global state management system taking the place of redux and zustand, changes data that we are fetching
  // 1. we need to make a provider in the index/main file
  // using error handling and isLoading can help so you dont need to create many types of state
  // this can be done with useQuery
  // useMutation can then be used to change posts
  // most of the good stuff is the cache ing

  const { data, error, isLoading } = useQuery({
    queryKey: ['todo'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
        res.json()
      ),
  });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (newPost: Todo) =>
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }).then((res) => res.json()),
  });

  if (error || isError) return <div>There was an error</div>;

  if (isLoading) return <div>LOADING</div>;

  return (
    <div>
      <button
        onClick={() =>
          mutate({
            userId: 400,
            id: 5000,
            title:
              'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
          })
        }
      >
        Mutate
      </button>

      {isPending && <p>Data is being added</p>}
      <h1>hello</h1>
      {data.map((todo: Todo) => (
        <div key={todo.id}>
          <p>{todo.id}</p>
          <p>{todo.title}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
