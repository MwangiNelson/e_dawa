import React, { useRef, useContext, useState, useEffect } from 'react'
import { AppContext } from '../../Contexts/AuthContext';


function NewCategory() {
    const inputcss = 'input-wrapper d-flex flex-row align-items-center border rounded px-3 py-2'


    const categoryNameRef = useRef(null)

    const { addCategory } = useContext(AppContext)

    function handleSubmit(e) {
        e.preventDefault();

        const categoryData = {
            category_name: categoryNameRef.current.value,
        }

        addCategory(categoryData)

        categoryNameRef.current.value = ''

    }

    const [categories, setCategories] = useState([])

    const getCategories = async () => {
        const url = `http://127.0.0.1:8000/api/all_categories`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCategories(data.data);
                console.log('Data fetch successful:', data);

                return true
            } else {
                alert('Data could not be fetched.');
            }
        } catch (error) {
            alert('Error:', error);
        }
    }

    useEffect(() => { getCategories() }, [])

    return (
        <div className="w-100 d-flex flex-column p-2 rounded-2">
            <div className="border shadow-lg rounded-2  bg-light">
                <div className="p-3 border-bottom">
                    <h2 className='fs-2 text-bold'>Add new category</h2>

                </div>
                <div className="w-100 d-flex flex-column px-3">
                    <form
                        onSubmit={handleSubmit}
                        className='d-flex flex-row w-100 gap-4 vh-50 p-2'>
                        <div className="w-50 d-flex flex-column gap-2">
                            <h5 className='fs-3'>Fill In Category Details</h5>
                            <div className={inputcss}>
                                <i className="fa-solid text-secondary fa-notes-medical"></i>
                                <input type="text" ref={categoryNameRef} className="app-input bg-light w-100 text-dark text-bold fs-6" placeholder='Category Name *' />
                            </div>

                            <small id="textHelp" class="form-text text-muted">Please make sure to fill in all the fields above.</small>
                            <button className="btn btn-primary w-25 text-bold" type='submit'>
                                Add Category
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewCategory