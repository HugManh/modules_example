import { bookStore } from '@/store';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

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
    <div className="w-full max-w-3xl mx-auto p-6 space-y-8 font-mono font-bold">
      <div className="flex justify-between text-2xl">
        {!!books?.length && (
          <>
            <div>Available: {noOfAvailable}</div>
            <div>Issued: {noOfIssued}</div>
          </>
        )}
      </div>

      <div className="space-y-4">
        {books?.map((book) => (
          <Card
            key={book.id}
            className="relative p-4 pr-64 bg-gray-100 shadow-[4px_4px_0px_rgba(0,0,0,0.1)]"
          >
            <div className="text-lg">
              {book.id} {book.name} {book.author}
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
              <Button
                variant="destructive"
                className={`w-24 h-10 font-mono font-bold bg-red-600 hover:bg-red-700 ${
                  book.status === 'issued' ? 'disabled' : ''
                }`}
                onClick={() => issueBook(book.id)}
              >
                Issue
              </Button>
              <Button
                variant="secondary"
                className={`w-24 h-10 font-mono font-bold bg-gray-300 hover:bg-gray-400 text-black ${
                  book.status === 'available' ? 'disabled' : ''
                }`}
                onClick={() => returnBook(book.id)}
              >
                Return
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default BookList;
