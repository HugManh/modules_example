// import { bookStore } from '@/store';
// import { useState } from 'react';
// import { Button } from '../ui/button';
// import { Input } from '../ui/input';
// import { Label } from '../ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

// function BookForm() {
//   const addBook = bookStore((state) => state.addBook);
//   const [bookDetails, setBookDetails] = useState({
//     id: '',
//     name: '',
//     author: '',
//   });

//   const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setBookDetails({ ...bookDetails, [name]: value });
//   };

//   const handleAddBook = () => {
//     if (!Object.keys(bookDetails).length)
//       return alert('Please enter book details!');
//     addBook({
//       ...bookDetails,
//       status: 'available',
//     });
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle className="text-center font-mono text-3xl">
//           My Library Store
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="space-y-2">
//           <Label htmlFor="bookId" className="font-mono font-bold text-xl">
//             Book ID
//           </Label>
//           <Input
//             id="bookId"
//             name="id"
//             placeholder="Enter book ID"
//             className="font-mono text-lg"
//             onChange={handleOnChange}
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="bookName" className="font-mono font-bold text-xl">
//             Book Name
//           </Label>
//           <Input
//             id="bookName"
//             name="name"
//             placeholder="Enter book name"
//             className="font-mono text-lg"
//             onChange={handleOnChange}
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="author" className="font-mono font-bold text-xl">
//             Author
//           </Label>
//           <Input
//             id="author"
//             name="author"
//             placeholder="Enter author name"
//             className="font-mono text-lg"
//             onChange={handleOnChange}
//           />
//         </div>

//         <Button
//           className="w-full bg-blue-500 hover:bg-blue-600 font-mono text-lg h-12"
//           onClick={handleAddBook}
//         >
//           Add
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

// export default BookForm;
