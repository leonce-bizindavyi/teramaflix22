import React,{useState,useEffect,useContext} from 'react'
import Comment from './Comment'
import { SessionContext } from '../context/Auth'
import EmojiPicker from 'emoji-picker-react';
import InputEmoji from 'react-input-emoji';

function Comments({handleCmnt,video}) {
  const auto = useContext(SessionContext)
  const [comments, setComments] = useState()
  const [body, setBody] = useState('');
  
 
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

  const fetchComments = async (uuid) =>{
    const response = await fetch(`/api/comments/${uuid}`)
    const data = await response.json()
    setComments(data)
  }

useEffect(() => {
  if(auto.session){
    fetchComments(video.uniid)
  }
}, [auto,video])
  return (
    <>
        <div className="commentsContainer z-50 absolute bottom-2 left-2 h-max max-h-full w-[95%] rounded-lg bg-[rgba(255,255,255,0.5)] ">
            <div onClick={()=>handleCmnt(false)} className="closer ml-[90%]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                
            </div>
            <div className="comments p-4 overflow-y-auto  max-h-[400px]">
                {
                    comments?.map(comment =>{
                        return <Comment key={comment.ID} comment={comment} />
                    })
                }
            </div>
            {showEmojiPicker && (<EmojiPicker onEmojiClick={handleEmojiClick} />)} 
            <div className="inputBox flex justify-center mt-2">
                <div className="inputComment flex flex-row w-[80%]  h-10 border mb-3 rounded-full bg-gray-300">
                   <InputEmoji cleanOnEnter onEnter={handleSubmit} onChange={(e)=>setBody(e.target.value)} value={body} />
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default Comments