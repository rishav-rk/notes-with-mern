import React, { useEffect, useState } from 'react'
import Background from '../components/Background';
import { useNavigate, useParams, Link } from 'react-router';
import { IoMdArrowRoundBack } from 'react-icons/io';
import api from '../lib/axios';
import toast, { LoaderIcon } from 'react-hot-toast';

const NoteDetails = () => {

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {

    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        setLoading(false);
      } catch (er) {
        console.error("Error in fetching note.");
        toast.error("Failed to fetch the note.");
      }finally{

      }
    }

    fetchNote();
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add a title or content"); return;
    }

    setSaving(true);
    try{
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    }catch(er){
      console.error("Error saving the notes: ", error);
      toast.error("Failded to update note");
    }finally{
      setSaving(false);
    }
  }


  if (loading) {
    return (
      <>
        <Background />
        <div className="min-h-screen flex items-center justify-center">
          <LoaderIcon className='z-5 animate-spin size-10' />
        </div>
      </>
    )
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
            <input type="text" name="title" id='title' placeholder='Note tile' value={note.title} onChange={(e) => setNote({...note, title:e.target.value})} className='text-sm border border-zinc-500 py-2 px-3 rounded-3xl w-full my-2' />
          </div>
          <div className="title-container flex flex-shrink-1 flex-col w-full">
            <label htmlFor="content" className='font-semibold tracking-wider mt-4'>Content</label>
            <textarea name="content" id="content" className='text-sm border border-zinc-500 p-3 rounded-3xl w-full my-2' placeholder='Write your note content here' value={note.content} onChange={(e) => setNote({...note, content:e.target.value})} rows={6}></textarea>
          </div>
          <div className="submit-button w-full flex justify-end h-full mt-4">
            <button type="submit" className={loading ? 'border text-zinc-500 px-3 py-1 rounded-full text-right' : 'border-2 border-zinc-500 px-3 py-1 rounded-full text-right hover:bg-zinc-800 hover:cursor-pointer'} disabled={saving}>
              {saving ? "Updating..." : "Update note"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NoteDetails;