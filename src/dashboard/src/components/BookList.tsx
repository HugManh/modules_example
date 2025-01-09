//BookList.js

import { Fragment } from 'react';
import { bookStore } from '../store/bookStore';

function BookList() {
  const { books, noOfAvailable, noOfIssued, issueBook, returnBook } =
    bookStore();

  // FIXME: This error
  // const { books, noOfAvailable, noOfIssued, issueBook, returnBook } = bookStore(
  //   (state) => ({
  //     books: state.books,
  //     noOfAvailable: state.noOfAvailable,
  //     noOfIssued: state.noOfIssued,
  //     issueBook: state.issueBook,
  //     returnBook: state.returnBook,
  //   })
  // );

  console.log(books);

  return (
    <ul className="book-list">
      {!!books?.length && (
        <span className="books-count">
          <h4>Available: {noOfAvailable}</h4>
          <h4>Issued: {noOfIssued}</h4>
        </span>
      )}
      {books?.map((book) => {
        return (
          <Fragment key={book.id}>
            <li className="list-item">
              <span className="list-item-book">
                <span>{book.id}</span>
                <span>{book.name}</span>
                <span>{book.author}</span>
              </span>
              <div className="btn-grp">
                <button
                  onClick={() => issueBook(book.id)}
                  className={`issue-btn ${
                    book.status === 'issued' ? 'disabled' : ''
                  }`}
                  disabled={book.status === 'issued'}
                >
                  {' '}
                  Issue{' '}
                </button>
                <button
                  onClick={() => returnBook(book.id)}
                  className={`return-btn ${
                    book.status === 'available' ? 'disabled' : ''
                  }`}
                  disabled={book.status === 'available'}
                >
                  {' '}
                  Return{' '}
                </button>
              </div>
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
}

export default BookList;
