import React, { useState, useEffect, useRef } from 'react'
import { LoaderGreen } from '../../components/features';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DrugsListing(props) {
  const [tabIndex, setTabIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [drugs, setDrugs] = useState(null)
  const [selectedDrug, setSelectedDrug] = useState(null)
  const [drugCount, setDrugCount] = useState(0)
  const [categories, setCategories] = useState([])
  const [selected, setSelected] = useState(null)
  const [selectedDrugDelete, setDeletedDrug] = useState(null)

  const drugNameRef = useRef(null)
  const drugCategoryRef = useRef(null)
  const drugPriceRef = useRef(null)
  const drugQuantityRef = useRef(null)
  const unitDescriptionRef = useRef(null)
  const drugDescriptionRef = useRef(null)

  const fetchDrugs = async () => {
    const url = 'http://127.0.0.1:8000/api/all_drugs';
    try {
      const response = await axios.get(url);
      const data = response.data.data;
      setDrugs(data);

    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false)
    }
  };
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
  const editDrug = async (e) => {
    e.preventDefault();

    const url = `http://127.0.0.1:8000/api/edit_drug/${selectedDrug.id}`;

    console.log(url)
    const drugData = {
      drug_category: drugCategoryRef.current.value || selectedDrug.drug_category,
      drug_name: drugNameRef.current.value || selectedDrug.drug_name,
      drug_image: 'https://source.unsplash.com/random/200x200?sig=1',
      drug_price: drugPriceRef.current.value || selectedDrug.drug_price,
      drug_description: drugDescriptionRef.current.value || selectedDrug.drug_description,
      unit_quantity: drugQuantityRef.current.value || selectedDrug.unit_quantity,
      unit_description: unitDescriptionRef.current.value || selectedDrug.unit_description,
    };


    console.log(drugData)

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(drugData),
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedDrug(null)
        alert('Drug Modified successfully');

        fetchDrugs()
        return true;
      } else {
        const errorMessage = await response.text();
        alert(`Modification failed: ${errorMessage}`);
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while modifying the drug.');
      return false;
    }

  }
  useEffect(() => {
    getCategories()
  }, [])
  const toggleDescription = (index) => {
    (index == selected) ? setSelected(null) : setSelected(index)
  }
  useEffect(() => {
    fetchDrugs()
  }, []);

  useEffect(() => {
    setDrugCount(drugs ? drugs.length : 0)
  }, [drugs])

  async function deleteDrug() {
    const url = `http://127.0.0.1:8000/api/delete_drug/${selectedDrugDelete.id}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();

        setDeletedDrug(null)
        alert('Drug deleted successfully');
        fetchDrugs()
        return true
      } else {
        alert('Drug could not be deleted');
        return false
      }
    } catch (error) {
      console.log('Error:', error);
      return false
    }
  }

  const ConfirmDeleteCard = () => {
    console.log('Deleted drug :', selectedDrugDelete)
    return (
      <div className="w-100 vh-100 d-flex bg-blur flex-column jcc aic position-absolute">
        <div className="w-25 bg-dark p-3 rounded d-flex flex-column jcc aic gap-3">
          <h4 className='text-light tac'>Are you sure you want to delete <span className='fs-5 text-bold underline px-2 m-0 py-0'>{selectedDrugDelete.drug_name}</span> from the database?</h4>
          <small className='text-light'>This action is irreversible.</small>
          <div className="d-flex flex-row gap-2">
            <button
              onClick={deleteDrug}
              className="btn btn-danger">Delete</button>
            <button
              onClick={() => { setDeletedDrug(null) }}
              className='btn btn-primary'>Cancel</button>
          </div>

        </div>
      </div>
    )
  }

  const DrugCard = (props) => {
    console.log(props)
    return (
      <div className="w-100 vh-100 d-flex flex-column jcc aic bg-blur">
        <div className="w-50 bg-dark rounded">
          <div className="d-flex flex-row-reverse w-100 p-2">
            <button
              onClick={() => { setSelectedDrug(null) }}
              className='btn btn-danger rounded-circle'>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <form onSubmit={editDrug} className='pb-3 d-flex flex-column jcc aic gap-2'>
            <div className="d-flex flex-row w-100 ps-4 border-bottom py-3">
              <input type="text" className='display-4 text-light form-control bg-transparent placeholder-light border-0 rounded-0 ps-4 py-0 fs-2' ref={drugNameRef} placeholder={props.drug.drug_name} />
              <i className="fa-solid fa-pen text-light w-25 jcc aic d-flex"></i>
            </div>
            <div
              style={{ background: `url(${props.drug.drug_image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
              className="w-50 vh-15 border rounded border-2  border-primary border-dashed">

            </div>
            <div className="d-flex flex-column w-75">
              <div className="d-flex flex-row aic w-100">
                <h3 className='text-light w-25 fs-6 text-bold m-0 p-0'>Category :</h3>
                <select placeholder='Drug Category *' className='form-control bg-transparent border-1 text-light' ref={drugCategoryRef} id="">
                  {
                    categories.length > 0 ?
                      categories.map(item => (
                        <option selected={props.drug.drug_category == item.category_name ? true : false} value={item.category_name.toString().toLowerCase()} className='text-capitalize'>{item.category_name.toString().toLowerCase()}</option>
                      )) :
                      null
                  }
                </select>
              </div>
              <div className="d-flex flex-row aic w-100 py-3">
                <h3 className='text-light w-25 fs-6 text-bold m-0 p-0'>Price :</h3>
                <input type="number" className='form-control bg-transparent text-light placeholder-light placeholder-light' ref={drugPriceRef} placeholder={props.drug.drug_price} />
              </div>
              <div className="d-flex flex-row aic w-100 py-2">
                <h3 className='text-light w-25 fs-6 text-bold m-0 p-0'>Quantity :</h3>
                <input type="number" className='form-control bg-transparent text-light placeholder-light' ref={drugQuantityRef} placeholder={props.drug.unit_quantity} />
              </div>
              <div className="d-flex flex-row aic w-100 py-2">
                <h3 className='text-light w-25 fs-6 text-bold m-0 p-0'>Unit description :</h3>
                <input type="text" className='form-control bg-transparent text-light placeholder-light' ref={unitDescriptionRef} placeholder={props.drug.unit_description} />
              </div>
              <div className="d-flex flex-row aic w-100 py-2">
                <h3 className='text-light w-25 fs-6 text-bold m-0 p-0'>Description:</h3>
                <textarea className='form-control bg-transparent text-light placeholder-light' ref={drugDescriptionRef} placeholder={props.drug.drug_description} />
              </div>
              <button className="btn btn-primary w-50">
                Make Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  function getRandomColor() {
    // Generate random values for RGB
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Convert RGB to hexadecimal
    const hexColor = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;

    return hexColor;
  }

  return (
    <div className="w-100 d-flex jcc aic flex-column">
      <div className="w-100 position-relative">
        <div className="position-absolute w-100">
          {
            selectedDrug ? <DrugCard
              drug={selectedDrug}
            /> :
              null}
          {
            selectedDrugDelete ? <ConfirmDeleteCard /> : null
          }

        </div>
        <div className="w-100 d-flex gap-4 flex-row py-2">
          <div className={`w-50 px-4 d-flex shadow-lg ais flex-column rounded py-4 btn btn-light border ${tabIndex == 0 ? 'bg-primary-green' : ''} `}
            onClick={() => { setSelectedDrug(null) }}
          >
            <h2 className="fs-3 text-bold border-bottom w-100 text-start pb-2">
              Total drug count:
            </h2>
            <p className={`font-mono display-3 p-0 m-0 ${tabIndex == 0 ? 'text-dark' : 'text-dark'}`}>
              {drugCount < 10 ? 0 : null}{drugCount} <small className='fs-6'>discovered drugs</small>
            </p>

          </div>
        </div>
        <div className="w-100 border-0 border-top">
          <div className="w-100 d-flex flex-row aic jsb">
            <h2 className="fs-1 pt-3">ALL DRUGS</h2>
            <button
              onClick={props.method}
              className="btn btn-outline-dark rounded-1">ADD NEW DRUG</button>
          </div>
          <div className="w-100 d-flex flex-row flex-wrap">
            <div className='p-4 w-100 d-flex flex-column rounded border min-height-100'>
              <h3 className='fs-3'>Administrator table view</h3>
              <p className='text-secondary font-primary'>
                Please operate carefully, our user data is sensitive
              </p>
              <div className="d-flex flex-row gap-1">
                {
                  categories ? categories.map((category) => (
                    <span
                      style={{ backgroundColor: getRandomColor() }}
                      className={`text-light px-3 pill w-fit h-fit py-1 cursor-pointer hover:shadow-lg`} >{category.category_name}</span>
                  )) : null
                }
              </div>

              <table className='table pt-4 font-primary'>
                <thead>
                  <tr>
                    <th scope='col'>#</th>
                    <th scope='col' className=''>
                      Drug Name
                    </th>
                    <th scope='col' className='w-25 tac'>
                      Drug Category
                    </th>

                    <th scope='col' className='tac'>
                      Drug Price
                    </th>
                    <th scope='col' className='tac'>
                      Drug Quantity
                    </th>

                    <th scope='col' className='tac'>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {drugs && drugs.map((drug, index) => {
                    return (
                      <tr key={index}>
                        <th scope='row' className='fs-6 text-center'>
                          {index + 1}
                        </th>
                        <td className='fs-6 text-center text-bold'>{drug.drug_name}</td>
                        <td className='fs-6 text-center'>{drug.drug_category}</td>
                        <td className='fs-6 text-center tac'>{drug.drug_price}</td>
                        <td className='fs-6 text-center tac'>{drug.unit_quantity}</td>


                        <td>
                          <div className='d-flex flex-row jcc aic gap-4'>

                            <button
                              className='btn btn-warning gap-3 fs-6 py-1 px-3 d-flex jcc aic flex-row'
                              onClick={() => {
                                console.log('clicked')
                                setSelectedDrug(drug)
                                console.log(selectedDrug)
                              }}
                            >
                              Edit
                              <i className='fa-solid fa-pen fs-6'></i>
                            </button>

                            <button
                              onClick={() => { setDeletedDrug(drug) }}
                              className="btn btn-danger">
                              <i className="fa-solid fa-trash-can py-1"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrugsListing