import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'
import { 
    useFriends,
    useAddFriend,
    useDeleteFriend
 } from './database/profile';

 import {
    useAddPost,
    useGetAllPostsForUser,
    useGetPostForUser
 } from './database/posts'

function Test() {

    const [prompt, setPrompt] = useState('')
    const [amount, setAmount] = useState('')
    const {data: session, status} = useSession()
    
    let user_id = status === 'authenticated'? (session.user as any).id : "";

    const [postCreatedSuccess, postCreatedLoading, createPost] = useAddPost(user_id, 12345, "test");
    const [posts, getPostsSuccess, getPostsLoading, getAllPostsForUser] = useGetAllPostsForUser(user_id);
    const [post, getPostSuccess, getPostLoading, getPostForUser] = useGetPostForUser(user_id, "2023_2_1")
    const [deleteFriendsSuccess, loading, removeFriend] = useDeleteFriend(user_id, "1000");
    const [friends, friendsLoading, getFriends] = useFriends(user_id)
    const [addFriendsSuccess, addFriendsLoading, addFriend] = useAddFriend(user_id, "8e08b18e-c0b0-4293-ad99-b2e63c5fcaf7")

    /* Update friends list on frontend if friend added or remoed */
    useEffect(() => {
        getFriends()
    }, [addFriendsSuccess, deleteFriendsSuccess, getFriends])

    return (
        <>
            <p>Testing Page</p>

            <br></br>
            <br></br>

            <input type={'button'} onClick={createPost} value={'Add Post'} />
            <input type={'button'} onClick={getAllPostsForUser} value={'Get posts'} />
            <input type={'button'} onClick={getPostForUser} value={'Get post for 2023-2-1'} />
            <input type={'button'} onClick={getFriends} value={'Get Friends'} />
            <input type={'button'} onClick={addFriend} value={'Add friend'} />
            <input type={'button'} onClick={removeFriend} value={'Remove friend'} />

        </>
    )
}

export default Test;