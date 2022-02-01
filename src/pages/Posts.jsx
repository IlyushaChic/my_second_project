import React, { useEffect, useRef, useState } from "react";
import { usePosts } from "../components/hooks/usePosts";
import PostFilter from "../components/PostFilter";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/myModal/Mymodal";
import '../styles/App.css';
import PostService from "../API/PostServise";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../components/hooks/useFetching";
import { getPageCount } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../components/hooks/useObserver";

function Posts() {
   const [posts, setPosts] = useState([]);
   const [filter, setFilter] = useState({ sort: '', query: '' });
   const [modal, setModal] = useState(false);
   const [totalPages, setTotalPages] = useState(0)
   const [limit, setLimit] = useState(10)
   const [page, setPage] = useState(1)
   const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
   const lastElement = useRef()
   
      const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit));
   });

  
   useObserver(lastElement,page<totalPages,isPostsLoading,()=>{
      setPage(page+1);
   })

   useEffect(() => {
      fetchPosts(limit, page)
   }, [page])

   const createPost = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)
   }

   const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
   }

   const changePage = (page) => {
      setPage(page)
   }

   return (
      <div className="app">
         <MyButton style={{ marginTop: '15px' }} onClick={() => setModal(true)}>
            Создать пост
         </MyButton>
         <MyModal visible={modal} setVisible={setModal} >
            <PostForm create={createPost} />
         </MyModal>
         <hr style={{ margin: '15px 0 ' }} />
         <PostFilter
            filter={filter}
            setFilter={setFilter} />
         {postError &&
            <h1>Произошла ошибка ${postError}</h1>}

         <PostList remove={removePost} posts={sortedAndSearchPosts} title="посты про JS" />
         <div ref ={lastElement} style={{height:'20px', background:'blue'}}/>

         {isPostsLoading && <Loader />
         }
         <Pagination page={page} changePage={changePage} totalPages={totalPages} />

      </div>
   );
}

export default Posts;
