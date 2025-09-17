import { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import Background from '../components/Background'
import { IoMdArrowRoundBack } from "react-icons/io";
import toast from 'react-hot-toast';
import api from '../lib/axios.js';

const CreatePage = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const[loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!title.trim() || !content.trim()){
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes",{
        title,
        content
      })
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.error("Error creating Note")
      toast.error("Failed to create note.");
    }finally{
      setLoading(false);
    }
  }

  return (
    <>
      <Background />
      <div className="relative z-[5] p-5 main-content w-full min-h-screen">
        <Link to='/'>
          <button className="relative bg-amber-500 flex back-button z-[5] items-center w-fit rounded-2xl px-2 py-1 text-zinc-50 hover:cursor-pointer hover:bg-amber-700">
            <IoMdArrowRoundBack size='1.1em' /> <p className='px-2'>Back to Notes</p>
          </button>
        </Link>
        <form onSubmit={handleSubmit} className='fixed w-[30%] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]  bg-zinc-900 rounded-2xl p-10 text-zinc-50'>
          <h1 className='font-bold mb-5 text-2xl'>Create New Note</h1>
          <div className="title-container flex flex-shrink-1 flex-col w-full">
            <label htmlFor="title" className='font-semibold tracking-wider '>Title</label>
            <input type="text" name="title" id='title' placeholder='Note tile' value={title} onChange={(e)=>setTitle(e.target.value)} className='text-sm border border-zinc-500 py-2 px-3 rounded-3xl w-full my-2' />
          </div>
          <div className="title-container flex flex-shrink-1 flex-col w-full">
            <label htmlFor="content" className='font-semibold tracking-wider mt-4'>Content</label>
            <textarea name="content" id="content" className='text-sm border border-zinc-500 p-3 rounded-3xl w-full my-2' placeholder='Write your note content here' value={content} onChange={(e)=>setContent(e.target.value)} rows={6}></textarea>
          </div>
          <div className="submit-button w-full flex justify-end h-full mt-4">
            <button type="submit" className={loading ? 'bg-zinc-500 px-3 py-1 rounded-full text-right' : 'bg-amber-500 px-3 py-1 rounded-full text-right hover:bg-amber-300 hover:cursor-pointer'} disabled={loading}>
              {loading ? "Creating..." : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreatePage