const URL = 'http://localhost:8080';
const options = data => ({
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify(data)
});

export const queryBooks = () => fetch(`${URL}/getBooks`);

export const createBookRequest = newBookDetails => fetch(`${URL}/createBook`, options(newBookDetails));

export const deleteBookRequest = bookDetails => fetch(`${URL}/deleteBook`, options(bookDetails));
