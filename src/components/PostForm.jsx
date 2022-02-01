import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const PostForm = function ({create}) {
   const [post, setPost] = useState({ title: '', body: '' })


   const addNewPost = (e) => {
      e.preventDefault();
      const newPost= {
         ...post ,
         id: Date.now()
      }      
      create(newPost);
      setPost({ title: '', body: '' });
   }


   return (
      <form>
         {/* Управляемый компонент  */}
         <MyInput
            onChange={e => setPost({ ...post, title: e.target.value })}
            value={post.title}
            placeholder="Название поста"
            type='text' />
         {/* Неуправляемый/неконтролируемый компонент  */}
         <MyInput
            onChange={e => setPost({ ...post, body: e.target.value })}
            value={post.body}
            placeholder="Описание поста"
            type='text' />
         <MyButton onClick={addNewPost} >Создать</MyButton>
      </form>
   )
}

export default PostForm;