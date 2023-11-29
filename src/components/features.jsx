import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Contexts/AuthContext'
import './loader.css'

export const ProtestCard = (props) => {
    const [isVolunteer, setIsVolunteer] = useState(false)
    const { userData, isAuthenticated } = useContext(AppContext)

    const volunteerAsUsher = async (protest_id) => {
        if (!isVolunteer) {
            return
        }

        const url = `http://127.0.0.1:8000/api/volunteer/usher`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    volunteer_id: userData.user_token,
                    protest_id: protest_id
                })
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message)

            } else {
                console.log('Data could not be fetched.');
                return false;
            }
        } catch (error) {
            console.log('Error:', error);
            return false;
        }
    }

    useEffect(() => {
        (userData !== null && userData.user_privileges == 'volunteer') ? setIsVolunteer(true) : setIsVolunteer(false)
    }, [userData])

    return (
        <div className={`${props.selected == props.index ? 'w-100' : 'w-50'} p-3 d-flex flex-row`}>
            <div className={`btn rounded-1 bg-light border p-0 w-100 d-flex flex-row rounded`} >
                <img src="images/demos.jpg" alt="" className={`${props.selected == props.index ? 'w-25' : 'w-50'} rounded-1 img-cover `} />
                <div className="w-75 ais d-flex flex-column p-4">
                    <div className="w-100 d-flex flex-row border-0 border-bottom border-2 border-dark aic justify-content-between">
                        <h2 className="fs-2 text-uppercase text-bold p-0 m-0 tas">{props.title.toString().toLowerCase()}</h2>
                    </div>

                    <div className="d-flex flex-row w-100 pt-3">
                        <div className={`${props.selected == props.index ? 'w-25' : 'w-100'}  w-50 d-flex flex-column`}>
                            <h4 className='text-capitalize d-flex gap-1'>Venue <b className='font-primary text-primary text-bold'>:</b> <b className='text-primary'>{props.venue.toString().toLowerCase()}</b></h4>
                            <h4 className='text-capitalize d-flex gap-1'>Date <b className='font-primary text-primary text-bold'>:</b> <b className='text-primary justify-content-center d-flex'>{props.date}</b></h4>
                            <div className="w-100 d-flex gap-2 flex-row">
                                <button
                                    className={`btn gap-4 rounded-1 p-2 px-3 m-0 d-flex jcc aic ${props.selected == props.index ? 'w-50 btn-outline-secondary ' : 'w-50 btn-outline-success '} `}
                                    onClick={() => { props.method(props.index) }}
                                >
                                    {props.selected == props.index ? 'SHOW LESS' : 'SHOW MORE'}
                                    {props.selected == props.index ? <i className="fa-solid fa-angle-left fs-5"></i> : <i className="fa-solid fa-angle-right fs-5"></i>}

                                </button>
                                <button className="w-50 btn btn-outline-info"
                                    onClick={() => { props.postMethod() }}
                                >
                                    SHARE POST
                                    <i className="fa-solid fa-share ps-2"></i>
                                </button>
                            </div>

                            {
                                isVolunteer ? <button
                                    className={`btn my-2 gap-4 rounded-1 p-2 px-3 m-0 d-flex btn-outline-info jcc aic ${props.selected == props.index ? 'w-50 ' : 'w-75'} `}
                                    onClick={() => { volunteerAsUsher(props.protest_id) }}
                                >
                                    VOLUNTEER TO USHER
                                </button> : null
                            }


                        </div>
                        <div className="w-75 text-secondary tas animate-down" style={{ display: (props.selected == props.index) ? '' : 'none', overflow: 'hidden' }} >
                            <h3 className="fs-2 text-dark border-0 border-bottom">Event Description</h3>
                            <p className='tas m-0'>{props.description}</p>
                        </div>
                    </div>



                </div>

            </div>
        </div >
    )
}

export const Loader = () => {
    return (
        <div className="w-100 py-3 d-flex justify-content-center align-items-center">
            <div className="lds-facebook lds-facebook-white"><div></div><div></div><div></div></div></div >
    )
}

export const LoaderGreen = () => {
    return (
        <div className="w-100 py-3 d-flex justify-content-center align-items-center">
            <div className="lds-facebook lds-facebook-green"><div></div><div></div><div></div></div></div >
    )
}

// export const ProtestPost = (props) => {
//     return (
//         <div className="w-100 position-fixed bg-blur vh-100 top-0 start-0 d-flex jcc aic">
//             <div className="p-4 d-flex flex-column gap-2 w-25 shadow-lg animate-in bg-light rounded-1 border-1">
//                 <div className="d-flex jsb aic w-100 border-0 border-bottom border-dark flex-row">
//                     <h1 className="text-dark fs-2 ">
//                         COMMENT & POST
//                     </h1>
//                     <button className="btn btn-dark px-2 p-0"
//                         onClick={() => { props.closeMethod() }}
//                     >
//                         <i className="fa-solid fa-xmark fs-2"></i>
//                     </button>
//                 </div>
//                 <div className="w-100 border border-dashed border-primary rounded-1 p-2 vh-25 d-flex flex-column jcc aic">
//                     <i className="fa-solid fa-plus text-primary fs-2"></i>
//                     <h3 className="fs-3 text-primary">Post a photo</h3>
//                 </div>
//                 <div className="w-100 d-flex flex-column">
//                     <label htmlFor="" className="font-tertiary text-secondary">Post your comment on the protest below</label>
//                     <textarea id="" cols="30" rows="3" className='form-control'></textarea>
//                 </div>
//                 <button className="btn btn-primary w-50">POST</button>

//             </div>
//         </div>
//     )
// }
export const DrugCard = (props) => {

    const { userData } = useContext(AppContext)

    return (
        <div className={`d-flex rounded ${props.selected ? 'flex-row w-50vw shadow-lg' : 'flex-column w-50min'}  bg-light aie`}>
            <img src={props.image} alt="" className={`object-cover ${props.selected ? 'w-50 h-100' : 'w-100  vh-25'}`} />
            {props.selected ?
                <div className="w-50 h-100 bg-secondary-green py-4 px-3 d-flex flex-column jsb">
                    <div className="d-flex flex-column">
                        <h3 className='text-bold pb-4 border-bottom '>{props.drug.drug_name}</h3>
                        <div className="d-flex flex-row">
                            <h3 className="text-bold py-4  fs-5 gap-2 d-flex ais flex-row">KES.{props.drug.drug_price}.00</h3>
                        </div>
                        <div className="d-flex flex-column pb-3">
                            <h4 className='fs-6 text-bold'>Category:</h4>
                            <span className='bg-primary text-light px-3 pill w-fit h-fit py-1'>{props.drug.drug_category}</span>

                        </div>
                        <div className="d-flex flex-column pb-3">
                            <h4 className='fs-6 text-bold'>Description:</h4>
                            <p className="text-secondary m-0">{props.drug.drug_description}</p>
                        </div>
                    </div>
                    <button
                        onClick={(userData !== null && userData.role !== 'administrator') ? props.addToCart : () => { alert('Login as a user to use this feature') }}
                        className="btn btn-dark w-50">Buy</button>
                </div>
                : <div className="d-flex bg-secondary-green flex-column w-100 px-4 py-2">
                    <h3 className='text-bold fs-5'>{props.drug.drug_name}</h3>
                    <div className="d-flex flex-row">
                        <h3 className="pb-2 fs-5 font-mono gap-2 d-flex ais flex-row">KES {props.drug.drug_price}.00</h3>
                    </div>
                    <div className="d-flex flex-row jcc aic pb-3">
                        <p className="text-secondary fs-sm m-0  y-ellipsis">{props.drug.drug_description}</p>
                        <button
                            onClick={props.method}
                            className='btn btn-text fs-sm w-50 p-0 m-0  text-primary'>Learn more</button>
                    </div>

                    <button
                        onClick={(userData !== null && userData.role !== 'administrator') ? props.addToCart : () => { alert('Login as a user to use this feature') }}
                        className="btn btn-dark w-50">Buy</button>
                </div>}
        </div>
    )
}


export const CartCard = (props) => {
    const { cartData, handlePurchase } = useContext(AppContext)
    const [cartItems, setCartItems] = useState(null)
    const [totals, setTotals] = useState(0)

    function getCartData() {
        if (cartData !== null) {
            setCartItems(cartData)
            setTotals(cartData.reduce((total, item) => total + item.total_price, 0));
            // console.log(true)   
        }
    }



    console.log('CART DATA', cartData)
    useEffect(() => {
        getCartData()
    }, [cartData])



    return (
        <div className="d-flex p-3 rounded bg-light shadow-lg w-50vw position-fixed right-0 cart-card h-fit">
            {
                true ?
                    <div className="d-flex flex-column w-100">
                        <div className="d-flex flex-row aic jsb border-bottom">
                            <h3 className='text-bold display-6'>Cart</h3>
                            <button
                                onClick={props.toggleMethod}
                                className="btn round-btn btn-danger rounded-circle d-flex jcc aic p-0 m-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="d-flex flex-column py-3 max-h-75">
                            {
                                cartItems !== null ? cartItems.map((item) => <CartItem
                                    item={item}
                                    method={getCartData}
                                />) : <div className="shadow-lg rounded w-100 p-2">
                                    You have no items in cart at the moment.
                                </div>
                            }
                        </div>
                        <div className="d-flex border-top flex-column py-3 gap-2">
                            <div className="d-flex flex-column py-3">
                                <div className="d-flex jsb flex-row aie gap-3">
                                    <p className='m-0'>TOTAL :</p>
                                    <h4 className="text-bold  font-mono m-0 fs-3">KES. {totals}.00</h4>
                                </div>
                                <div className="d-flex flex-row jsb aie gap-3">
                                    <p className='m-0'>DELIVERY FEE :</p>
                                    <h4 className="text-bold font-mono m-0 fs-3">KES. {totals == 0 ? '0' : 100}.00</h4>
                                </div>
                                <div className="d-flex flex-row jsb aie gap-3 border-top border-bottom">
                                    <p className='m-0'>TOTAL PAYABLE :</p>
                                    <h4 className="text-bold font-mono m-0 fs-3">KES. {totals == 0 ? 0 : totals + 100}.00</h4>
                                </div>


                            </div>
                            <small>By proceeding with this purchase means you agree with our <span className='text-info'>terms & conditions</span></small>
                            <button
                                onClick={handlePurchase}
                                className="btn btn-warning gap-3 fs-sm py-2 text-bold d-flex flex-row jcc aic rounded-full w-50">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                </svg>

                                COMPLETE PURCHASE
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    : <div className="d-flex flex-row jsb aic">
                        <p className='p-0 m-0'>Please create an account to continue purchasing.</p>
                        <Link to='/auth'><button
                            onClick={props.toggleMethod}
                            className="btn btn-text text-primary w-fit">Create an account.</button></Link>
                    </div>
            }
        </div>
    )
}

export const CartItem = (props) => {

    const { removeFromCart, updateCart } = useContext(AppContext)

    const [quantity, setQuantity] = useState(1)


    function increment() {
        setQuantity(quantity + 1);
        updateCart(quantity, props.item)
    }

    function decrement() {
        // Ensure that quantity does not go below 1
        if (quantity > 1) {
            setQuantity(quantity - 1);
            updateCart(quantity, props.item)

        }
    }




    return (
        <div className="shadow-lg rounded w-100 p-2 my-2">
            <div className="d-flex flex-row">
                <img src={props.item.drug_image} className='img-cart' alt="" />
                <div className="d-flex flex-column jsb pb-3 px-4 w-100">
                    <div className="d-flex flex-row border-bottom">
                        <h3 className='text-bold fs-4 pb-2  w-100'> {props.item.drug_name}</h3>
                        <span className='bg-primary text-light px-3 pill w-fit h-fit py-1'>Antibiotic</span>

                    </div>
                    <div className="d-flex flex-column gap-2">
                        <div className="d-flex flex-column pb-2">
                            <div className="d-flex flex-row aie jsb gap-2">
                                <small className='m-0'>UNIT PRICE:</small>
                                <h3 className='m-0 fs-4'>KES {props.item.drug_price}.00</h3>
                            </div>
                            <div className="d-flex flex-row aie jsb gap-2">
                                <small className='m-0'>TOTAL PRICE:</small>
                                <h3 className='m-0 fs-4'>KES {props.item.drug_price * quantity}.00</h3>
                            </div>

                        </div>
                        <div className="d-flex flex-row jsb">
                            <div className="d-flex flex-row gap-2 shadow-lg w-fit jcc aic">

                                <button
                                    onClick={increment}
                                    className="btn btn-secondary">+</button>
                                <h4 className='m-0 p-0'>{quantity}</h4>
                                <button
                                    onClick={decrement}
                                    className="btn btn-secondary">-</button>

                            </div>
                            <button
                                onClick={() => removeFromCart(props.item.id)}
                                className="btn btn-outline-danger d-flex jcc aic fs-xsm gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>

                                REMOVE FROM CART
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}