import React, { useContext, useEffect, useState } from 'react'
import { Loader, DrugCard } from '../components/features'
import axios from 'axios';
import { AppContext } from '../Contexts/AuthContext';

function Store() {
    const [loading, setLoading] = useState(true)
    const [drugs, setDrugs] = useState(null)
    const [selected, setSelected] = useState(null)
    const [sharePost, setSharePost] = useState(false)

    const { addToCart } = useContext(AppContext)

    const toggleDescription = (index) => {
        (index == selected) ? setSelected(null) : setSelected(index)
    }

    const toggleSet = () => {
        console.log('toggled')
        setSharePost(!sharePost)
        console.log(sharePost)
    }

    const fetchDrugs = async () => {
        const url = 'http://127.0.0.1:8000/api/all_drugs';
        try {
            const response = await axios.get(url);
            const drug_data = response.data.data;
            setDrugs(drug_data);
            console.log(drug_data)
        } catch (error) {
            console.log('Error:', error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        setTimeout(() => {
            fetchDrugs()
        }, 2000)
    }, []);

    return (
        <div className="w-100 d-flex flex-row justify-content-center bg-primary-green vh-100-min animate-in">

            <div className="w-75 d-flex flex-column align-items-start pt-4">
                <h1 className="display-4 text-dark text-bold mt-4">e-Store <b className='text-success'>.</b></h1>
                <div className="d-flex w-100 flex-row py-4 flex-wrap border-0 border-top border-1 gap-3">
                    {
                        (loading) ?
                            <Loader /> :
                            drugs ?
                                drugs.map((drug, index) => {
                                    return (
                                        <DrugCard
                                            key={index}
                                            index={index}
                                            image={drug.drug_image}
                                            drug={drug}
                                            method={() => setSelected(drug)}
                                            addToCart={() => addToCart({ ...drug, 'quantity': 1, 'total_price': drug.drug_price })}
                                            selected={selected ? selected.id == drug.id ? true : false : false}
                                        />
                                    )
                                }) : <div className='w-100 p-2 border tac text-secondary rounded-1'>
                                    No available drugs at the moment
                                </div>

                    }
                </div>

            </div>
        </div>
    )
}

export default Store