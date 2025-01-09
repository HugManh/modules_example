import { useEffect } from 'react';
import { bookStore } from './store/bookStore';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
const App = () => {
  const reset = bookStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="App">
      <h2>My Library Store</h2>
      <BookForm />
      <BookList />
    </div>
  );
};
export default App;
