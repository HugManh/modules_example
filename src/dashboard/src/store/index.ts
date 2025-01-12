import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
interface Book {
  id: string;
  name: string;
  author: string;
  status: string;
  //   status: 'available' | 'issued';
}

interface IBook {
  books: Book[];
  noOfAvailable: number;
  noOfIssued: number;
  addBook: (book: Book) => void;
  issueBook: (id: string) => void;
  returnBook: (id: string) => void;
  reset: () => void;
}

export const bookStore = create<IBook>((set) => ({
  books: [],
  noOfAvailable: 0,
  noOfIssued: 0,
  addBook: (book: Book) => {
    set((state) => ({
      books: [...state.books, { ...book }],
      noOfAvailable: state.noOfAvailable + 1,
    }));
  },

  issueBook: (id: string) => {
    set((state) => {
      const updatedBooks = state.books.map((book) =>
        book.id === id && book.status === 'available'
          ? { ...book, status: 'issued' }
          : book
      );

      const issuedCount = state.noOfIssued + 1;
      const availableCount = state.noOfAvailable - 1;

      return {
        books: updatedBooks,
        noOfAvailable:
          availableCount >= 0 ? availableCount : state.noOfAvailable,
        noOfIssued: issuedCount,
      };
    });
  },

  returnBook: (id: string) => {
    set((state) => {
      const updatedBooks = state.books.map((book) =>
        book.id === id && book.status === 'issued'
          ? { ...book, status: 'available' }
          : book
      );

      const issuedCount = state.noOfIssued - 1;
      const availableCount = state.noOfAvailable + 1;

      return {
        books: updatedBooks,
        noOfAvailable: availableCount,
        noOfIssued: issuedCount >= 0 ? issuedCount : state.noOfIssued,
      };
    });
  },

  reset: () => {
    set({
      books: [],
      noOfAvailable: 0,
      noOfIssued: 0,
    });
  },
}));

interface IToken {
  token: string;
  setToken: (data: string) => void;
}

export const useTokenStore = create<IToken>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        setToken: (data: string) => {
          set(() => ({ token: data }));
        },
      }),
      { name: 'token-store' }
    )
  )
);
