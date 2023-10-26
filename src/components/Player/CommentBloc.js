import React, { useState, useContext } from 'react';
import Comments from './Comments';
import { SessionContext } from '../context/Auth';
import EmojiPicker from 'emoji-picker-react';

function CommentBloc({ video }) {
  const auto = useContext(SessionContext);
  const [block, setBlock] = useState(false);
  const [body, setBody] = useState('');

  const handleBlock = (etat) => {
    setBlock(etat);
  };

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = ({ emoji }) => {
    setBody(prevBody => prevBody + emoji);
  };
  

  const handleSubmit = async () => {
    const user = auto.session;
    // Send data to the API to insert into the database
    if (body) {
      const response = await fetch('/api/comments/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: body, user: user.ID, post: video.ID }),
      });
      // Check if comment creation was successful
      if (response.ok) {
        setBody('');
      } else {
        console.error(`Failed to create comment: ${response.status} ${response.statusText}`);
      }
    }
  };


  

  return (
    <div className="">
      {block ? (
        <>
          <div className="commentBox relative lg:flex flex-col justify-end space-y-4 overflow-auto px-3 pt-4 bg-gray-50 lg:rounded-md shadow-[inset_0px_2px_20px_8px_rgb(0,0,0,0.2)]">
            <div className="min-h-[50px] max-h-[450px] overflow-auto">
              <Comments video={video} />
            </div>
            <div className="inputBox  flex justify-center">
              <div className="inputComment flex flex-row w-[80%]  h-10 border mb-3 rounded-full bg-gray-300">
                <input
                  type="text"
                  onChange={(e) => setBody(e.target.value)}
                  value={body}
                  id=""
                  placeholder="Enter Your comment"
                  className="Commentinput w-[83%] pl-2 rounded-l-full bg-gray-300"
                />
                <svg onClick={handleEmojiPickerClick}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 m-[1%] text-slate-800 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  />
                </svg>
                <svg
                  onClick={handleSubmit}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="sendButton w-6 h-6 m-[1%] text-slate-800 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </div>
            </div>
            {showEmojiPicker && (<EmojiPicker onEmojiClick={handleEmojiClick} />)} 
          </div>
          <div onClick={()=>handleBlock(false)} className="hideComment absolute top-4 left-2   flex flex-row space-x-1 items-center bg-[rgba(30,41,59,0.6)] p-2 rounded-full cursor-pointer  ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 commentButton text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
                  <span className="text-[15px] text-white">commentaires</span>
            </div>
        </>
      ) : 
      <div onClick={()=>handleBlock(true)} className=" OpenComment  absolute top-4 left-2    flex flex-row  space-x-1 items-center bg-[rgba(30,41,59,0.6)] p-2 rounded-full cursor-pointer ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 commentButton text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-[15px] text-white">commentaires</span>
          </div>}
    </div>
  );
}

export default CommentBloc