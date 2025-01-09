import { useState } from 'react';
import { bookStore } from '../store/bookStore';

function BookForm() {
  const addBook = bookStore((state) => state.addBook);
  const [bookDetails, setBookDetails] = useState({
    id: '',
    name: '',
    author: '',
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  const handleAddBook = () => {
    if (!Object.keys(bookDetails).length)
      return alert('Please enter book details!');
    addBook({
      ...bookDetails,
      status: 'available',
    });
    alert('Book added successfully!');
  };

  return (
    <div className="input-div">
      <div className="input-grp">
        <label htmlFor="id">Book ID</label>
        <input
          type="text"
          id="id"
          name="id"
          size={50}
          onChange={handleOnChange}
        />
      </div>
      <div className="input-grp">
        <label htmlFor="name">Book Name</label>
        <input
          type="text"
          id="name"
          name="name"
          size={50}
          onChange={handleOnChange}
        />
      </div>
      <div className="input-grp">
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          size={50}
          onChange={handleOnChange}
        />
      </div>
      <button onClick={handleAddBook} className="add-btn">
        {' '}
        Add{' '}
      </button>
    </div>
  );
}

export default BookForm;
