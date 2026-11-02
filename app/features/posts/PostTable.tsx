import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '~/hooks'; 
import { type Post, deletePost, fetchPosts, selectAllPosts, selectPostsFilter, selectPostsError, selectPostsStatus } from './postsSlice';


export function PostTable() {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectAllPosts);
    const filter = useAppSelector(selectPostsFilter);

    const postStatus = useAppSelector(selectPostsStatus);
    const postsError = useAppSelector(selectPostsError);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);
    
    const filteredPosts = posts.filter((post: Post) => 
        post.name.toLowerCase().includes(filter.toLowerCase())
    )

    const renderedPosts = filteredPosts.map((post: Post) => (
        <tr key={ post.id }>
            <td>{ post.name }</td>
            <td>{ post.description ?? '' }</td>
            <td>
                <button onClick={async () => await dispatch(deletePost(post.id))}>
                    Eliminar
                </button>
            </td>
        </tr>
    ));

    if (postStatus === 'pending') {
        return (<p>Loading...</p>);
    } else if (postStatus === 'succeeded') {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    { renderedPosts }
                </tbody>
            </table>
        );
    } else if (postStatus === 'rejected') {
        return (<p>{postsError}</p>);
    }
    
}