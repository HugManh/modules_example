import { useEffect } from 'react';
import { bookStore } from '@/store';
import BookForm from './components/book/BookForm';
import BookList from './components/book/BookList';
const App = () => {
  const reset = bookStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="App mt-10">
      <BookForm />
      <BookList />
    </div>
  );
};
export default App;
