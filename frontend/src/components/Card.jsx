import React from 'react';
import { Link } from 'react-router';
import { TbEdit } from 'react-icons/tb';
import { IoMdCloseCircleOutline } from "react-icons/io";
import api from '../lib/axios.js';
import toast from 'react-hot-toast';

const Card = ({ data, setNotes }) => {

    const dateUpdated = new Date("2025-09-14T18:13:47.275Z".trim().slice(0, 10));
    const date = dateUpdated.toDateString();

    const handleDelete = async (e, id) => {
        e.preventDefault();
        if(!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note deleted successfully");
            setNotes((prev)=> prev.filter(note => note._id !== id));
        } catch (error) {
            console.error(error);
            toast.error("Error in Deletion");
        }
    }

    return (
        <div className="w-65 h-65 rounded-[30px] bg-zinc-900 text-zinc-300 overflow-hidden">
            <div className="editOptions pt-5 pb-3 px-4 mb-4 flex justify-between bg-zinc-500">
                <button className="hover:cursor-pointer">
                    <Link to={`/notes/${data._id}`}>
                <TbEdit size="1.4em" color='#000' className='hover:scale-105'/>
                    </Link>
                </button>
                <button onClick={(e)=>handleDelete(e, data._id)} className="hover:cursor-pointer">
                <IoMdCloseCircleOutline size="1.4em" color="#000" className='hover:scale-105'/>
                </button>
            </div>
            <div className="h-[60%] px-6 flex flex-shrink-0 flex-col justify-between">
                <div className="note-content">
                    <h1 className="text-zinc-200 capitalize leading-[20px] ">{data.title}</h1>
                    <h1 className="text-zinc-400 leading-[20px] text-xs">{data.content}</h1>
                </div>
                    <h2 className='text-xs text-right'>{date}</h2>
                </div>
            </div>
    )
}

export default Card