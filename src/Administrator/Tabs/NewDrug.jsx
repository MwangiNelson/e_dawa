import React, { useRef, useContext, useState, useEffect } from 'react'
import { AppContext } from '../../Contexts/AuthContext';
import uploadPhotoSyntax from '../../modules/upload';


function NewItem() {
    const inputcss = 'input-wrapper d-flex flex-row align-items-center border rounded px-3 py-2'



    const drugNameRef = useRef(null)
    const drugCategoryRef = useRef(null)
    const drugPriceRef = useRef(null)
    const drugQuantityRef = useRef(null)
    const unitDescriptionRef = useRef(null)
    const drugDescriptionRef = useRef(null)

    const [categories, setCategories] = useState([])

    const { addDrugs } = useContext(AppContext)

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);

            // Display the selected image as background
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageUrl(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    const handleImageUpload = async (name) => {
        return new Promise((resolve, reject) => {
            if (image) {
                uploadPhotoSyntax(image, name)
                    .then((imgUrl) => {
                        setImageUrl(imgUrl);
                        console.log('Success uploading photo:', imgUrl);
                        resolve(imgUrl); // Resolve the promise with the image URL
                    })
                    .catch((err) => {
                        console.error('Error uploading photo:', err);
                        reject(err); // Reject the promise with the error
                    });
            } else {
                console.log('No image selected');
                reject('No image selected'); // Reject the promise if no image is selected
            }
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const uploadedImageUrl = await handleImageUpload(drugNameRef.current.value);

            console.log(uploadedImageUrl);

            const drugData = {
                drug_category: drugCategoryRef.current.value,
                drug_name: drugNameRef.current.value,
                drug_image: uploadedImageUrl,
                drug_price: drugPriceRef.current.value,
                drug_description: drugDescriptionRef.current.value,
                unit_quantity: drugQuantityRef.current.value,
                unit_description: unitDescriptionRef.current.value,
            };

            console.log(drugData);

            // Assuming addDrugs returns a promise, wait for it to complete
            await addDrugs(drugData);

            // Clear form fields
            drugCategoryRef.current.value = '';
            drugDescriptionRef.current.value = '';
            unitDescriptionRef.current.value = '';
            drugQuantityRef.current.value = '';
            drugPriceRef.current.value = '';
            drugNameRef.current.value = '';
        } catch (error) {
            // Handle errors here
            console.error('Error:', error);
        }
    }






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
                // console.log('Data fetch successful:', data);

                return true
            } else {
                alert('Data could not be fetched.');
            }
        } catch (error) {
            alert('Error:', error);
        }
    }

    const openFileInput = () => {
        // Trigger the file input click
        document.getElementById('fileInput').click();
    };


    useEffect(() => {
        getCategories()
    }, [])


    return (
        <div className="w-100 d-flex flex-column p-2 rounded-2">
            <div className="border shadow-lg rounded-2  bg-light">
                <div className="p-3 border-bottom">
                    <h2 className='fs-2 text-bold'>Add medications</h2>

                </div>
                <div className="w-100 d-flex flex-column px-3">
                    <form
                        onSubmit={handleSubmit}
                        className='d-flex flex-row-reverse w-100 gap-4 p-2'>

                        <div
                            style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }}
                            onClick={openFileInput}
                            className="d-flex bg-trans jcc aic flex-column w-50 ms-4 position-relative border border-primary border-dashed rounded-4 border-3 vh-50">
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            <div className="d-flex flex-column jcc aic">
                                <h3 className='text-bold fs-5 '>Upload Image Here</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                                </svg>
                            </div>
                        </div>



                        <div className="w-50 d-flex flex-column gap-2">
                            <h5 className='fs-3'>Fill In Drug Details</h5>
                            <div className={inputcss}>
                                <i className="fa-solid text-dark fa-notes-medical"></i>
                                <input type="text" ref={drugNameRef} className="app-input bg-light w-100 text-dark text-bold fs-6" placeholder='Drug Name *' />
                            </div>
                            <div className={inputcss}>
                                <i className="fa-solid fa-list"></i>
                                <select placeholder='Drug Category *' className='form-control bg-transparent border-0' ref={drugCategoryRef} id="">
                                    {
                                        categories.length > 0 ?
                                            categories.map(item => (
                                                <option value={item.category_name.toString().toLowerCase()} className='text-capitalize'>{item.category_name.toString().toLowerCase()}</option>
                                            )) :
                                            null
                                    }
                                </select>
                            </div>
                            <div className={inputcss}>
                                <i className="fa-solid fa-tag"></i>
                                <input type="number" ref={drugPriceRef} className="app-input bg-light w-100 text-dark text-bold fs-6" placeholder='Drug Pricing *' />
                            </div>
                            <div className="d-flex flex-row gap-2">
                                <div className={inputcss + ' w-100'}>
                                    <i className="fa-solid fa-warehouse"></i>
                                    <input type="number" ref={drugQuantityRef} className="app-input bg-light w-100 text-dark text-bold fs-6" placeholder='Quanity in stock *' />
                                </div>
                                <div className={inputcss + ' w-100'}>
                                    <i class="fa-regular fa-file"></i>
                                    <input type="text" ref={unitDescriptionRef} className="app-input bg-light w-100 text-dark text-bold fs-6" placeholder='Unit description *' />
                                </div>
                            </div>
                            <div className="d-flex">
                                <textarea ref={drugDescriptionRef} className='form-control bg-transparent border w-100 text-bold' placeholder='Drug description * ' id="" rows="6"></textarea>
                            </div>

                            <small id="emailHelp" class="form-text text-muted">Please make sure to fill in all the fields above.</small>
                            <button className="btn btn-primary w-25 text-bold" type='submit'>
                                Add Drug
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewItem