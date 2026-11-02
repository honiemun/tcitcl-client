import { useAppDispatch } from '~/hooks';
import React, { useState } from 'react';
import { addNewPost } from './postsSlice';

interface AddPostFormFields extends HTMLFormControlsCollection {
    postName: HTMLInputElement,
    postDescription: HTMLTextAreaElement
}

interface AddPostFormElements extends HTMLFormElement {
    readonly elements: AddPostFormFields
}

export const AddPostForm = () => {
    const [ addRequestStatus, setAddRequestStatus ] = useState<'idle' | 'pending'>('idle');

    const dispatch = useAppDispatch();
    
    const handleSubmit = async (e: React.SubmitEvent<AddPostFormElements>) => {
        e.preventDefault();

        const { elements } = e.currentTarget;
        const name = elements.postName.value;
        const description = elements.postDescription.value;
        const form = e.currentTarget;

        try {
            setAddRequestStatus('pending');
            await dispatch(addNewPost({name, description})).unwrap();
            form.reset();
        } catch (err) {
            console.error('Could not create new post: ', err);
        } finally {
            setAddRequestStatus('idle');
        }
    }

    return (
        <section>
            <form onSubmit={handleSubmit} className='input-form'>
                <input
                    type='text'
                    id='postName'
                    name='postName'
                    defaultValue=''
                    placeholder='Nombre'
                    maxLength={128}
                    required
                />
                <textarea
                    id='postDescription'
                    name='postDescription'
                    placeholder='Descripción'
                    defaultValue=''
                    rows={1}
                />
                <button>Crear</button>
            </form>
        </section>
    )
}