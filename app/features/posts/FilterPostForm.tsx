import { useAppDispatch } from '~/hooks';
import React from 'react';
import { setFilter } from './postsSlice';

interface FilterPostFormFields extends HTMLFormControlsCollection {
    postFilter: HTMLInputElement
}

interface FilterPostFormElements extends HTMLFormElement {
    readonly elements: FilterPostFormFields
}

export const FilterPostForm = () => {
    const dispatch = useAppDispatch();
    
    const handleSubmit = async (e: React.SubmitEvent<FilterPostFormElements>) => {
        e.preventDefault();
        const { elements } = e.currentTarget;
        const filter = elements.postFilter.value;
        dispatch(setFilter(filter));
    }

    return (
        <section>
            <form onSubmit={handleSubmit} className='input-form'>
                <input
                    type='text'
                    id='postFilter'
                    name='postFilter'
                    defaultValue=''
                    placeholder='Filtro de nombre'
                    maxLength={128}
                />
                <button>Buscar</button>
            </form>
        </section>
    )
}