import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8083/api";

export default function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({title: "",author: "",price: 0,publicationYear: 2000,});
  const [editingId, setEditingId] = useState(null);
  const [id, setId] = useState("");
  const [search, setSearch] = useState(null);

  const loadBooks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/books`);
      setBooks(res.data);
    } catch (e) {
      console.error("Fail to load books", e);
    }
  };

  const loadBooksbyID = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/books/${id}`);
      setSearch(res.data);
    } catch (e) {
      console.error("Fail to load book by ID", e);
    }
  };

  // useEffect(() => {
  //   loadBooks();
  // }, []);

  const saveBook = async (e) => {
    e.preventDefault();
    try {
      if (editingId == null) {
        await axios.post(`${BASE_URL}/books`, form);
      } else {
        await axios.put(`${BASE_URL}/books/${editingId}`, form);
      }
      setForm({ title: "", author: "", price: 0, publicationYear: 2000 });
      setEditingId(null);
      loadBooks(); 
    } catch (e) {
      console.error("Save failed", e);
    }
  };

  const editBook = (book) => {
    setEditingId(book.id);
    setForm({
      title: book.title,
      author: book.author,
      price: book.price,
      publicationYear: book.publicationYear,
    });
  };

  const deleteBook = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await axios.delete(`${BASE_URL}/books/${id}`);
      loadBooks();
    } catch (e) {
      console.error("Delete failed", e);
    }
  };


  const deleteallBook = async () => {
    if (!window.confirm("Delete all books?")) return;
    try {
      await axios.delete(`${BASE_URL}/books`);
      loadBooks();
    } catch (e) {
      console.error("Delete all failed", e);
    }
  };

  const resetSearch = () => {
    setId("");
    setSearch(null);
    loadBooks();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Book Manager</h1>

      <form onSubmit={saveBook} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Year"
          value={form.publicationYear}
          onChange={(e) =>
            setForm({ ...form, publicationYear: Number(e.target.value) })
          }
        />
        <button type="submit">{editingId == null ? "Add" : "Update"}</button>

        {editingId != null && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ title: "", author: "", price: 0, publicationYear: 2000 });
            }}
          >
            Cancel
          </button>
        )}

        <button type="button" onClick={deleteallBook}>
          DELETE All
        </button>

        <input
          type="number"
          placeholder="enter id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button type="button" onClick={() => loadBooksbyID(id)}>
          Search
        </button>
        <button type="button" onClick={resetSearch}>
          Reset
        </button>
      </form>

      {search ? (
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{search.id}</td>
              <td>{search.title}</td>
              <td>{search.author}</td>
              <td>{search.price}</td>
              <td>{search.publicationYear}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.price}</td>
                <td>{b.publicationYear}</td>
                <td>
                  <button onClick={() => editBook(b)}>Edit</button>
                  <button onClick={() => deleteBook(b.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
