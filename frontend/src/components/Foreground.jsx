import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosAddCircle } from "react-icons/io";
import { Link } from 'react-router';
import api from '../lib/axios.js'


import Card from './Card'
const Foreground = (props) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");   // shortend as prefixed by :- "http://localhost:5001/api"
        setNotes(res.data);
      } catch (error) {
        console.error("Error fetching Notes!", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  return (
    <div className="relative z-[3] flex gap-5 w-full h-screen">
      <aside className="side-menu border-r-[0.9px] border-zinc-700 shadow-md bg-zinc-750 w-25 flex flex-col p-5">
        <h1 className='h-10 w-full text-xl font-bold text-zinc-50'>Docs</h1>
        <Link to="/create">
        <IoIosAddCircle className='text-5xl hover:cursor-pointer' color='#fff'/>
        </Link>
        </aside>      
      <div className='top-0 left-0 w-full h-full grid md:grid-cols-1 lg:grid-cols-5 gap-2 p-5'>
        {!loading && notes.length > 0 && notes.map((item, index) => (
          <Card key={index} data={item} setNotes={setNotes}/>
        ))}
      </div>
    </div>
  )
}

export default Foreground