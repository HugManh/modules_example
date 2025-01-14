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

interface User {
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        setUser: (user) => set({ user, isAuthenticated: !!user }),
        setToken: (token) => {
          set({ token: token });
        },
        logout: () => {
          set({ user: null, token: null, isAuthenticated: false });
          localStorage.removeItem('token-store'); // Xóa dữ liệu persist
        },
        refreshToken: async () => {
          try {
            // Ví dụ API làm mới token
            const response = await fetch('/api/auth/refresh-token', {
              method: 'POST',
              credentials: 'include', // Để gửi cookie nếu cần
            });
            if (response.ok) {
              const data = await response.json();
              const { token, user } = data;
              set({ token, user, isAuthenticated: true });
            } else {
              console.error('Failed to refresh token');
              get().logout(); // Nếu làm mới thất bại, logout
            }
          } catch (error) {
            console.error('Error refreshing token:', error);
            get().logout();
          }
        },
      }),
      {
        name: 'token-store',
        // onRehydrateStorage: () => (state) => {
        //   console.log('Rehydrating state:', state);
        // },
        // Gọi hàm khi khôi phục trạng thái từ localStorage. Có thể thêm logic kiểm tra token đã hết hạn hay chưa.
      }
    )
  )
);
