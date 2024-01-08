import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Books() {
     const [books, setBooks]= useState([])

     useEffect(()=>{
        const fetchAllBooks = async ()=> {
            try {
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data);
                
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllBooks()
     },[]);

     const handleDelete = async(id)=>{
        try {
            await axios.delete("http://localhost:8800/books/"+id)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
     }
  return (
    <div>
      <h1>Pb book shop</h1>
      <div className="books flex gap-3">
        {books.map(book=> (
            <div className="book flex-1 flex-col gap-4 " key={book.id}>
                {book.cover && <img className=' w-[200px] h-[300px] object-cover bg-slate-400' src={book.cover} alt=' '/>}
                <h2 className=' text-2xl font-bold'>{book.title}</h2>
                <p>{book.desc}</p>
                <p className=' text-red-600'>book price is {book.price}</p>
                <button className="delete p-2 text-white bg-black rounded-md mr-2" onClick={()=> handleDelete(book.id)}>delete</button>
                <button className="update p-2 text-white bg-black rounded-md">update</button>
            </div>
        ))}
      </div>
      <button className='p-2 text-white bg-black rounded-md mt-10'> <Link to={"/add"}>add new book</Link> </button>
    </div>
  )
}

export default Books
