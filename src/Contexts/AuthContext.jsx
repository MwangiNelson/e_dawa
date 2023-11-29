// MyContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [protests, setProtests] = useState(null)
    const [visible, setVisible] = useState(false)
    const [cartData, setCartData] = useState(null)



    useEffect(() => {
        setIsAuthenticated(userData !== null);
    }, [userData]);

    useEffect(() => {
        const storedUserData = sessionStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (userData) {
            sessionStorage.setItem('userData', JSON.stringify(userData));
            setIsAuthenticated(true);
        } else {
            sessionStorage.removeItem('userData');
            setIsAuthenticated(false);
        }
    }, [userData]);


    useEffect(() => {
        const handleBeforeUnload = () => {
            if (userData) {
                sessionStorage.setItem('userData', userData);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    function getCartData() {
        const existingCartData = JSON.parse(sessionStorage.getItem('cartData')) || [];

        setCartData(existingCartData)
    }

    // useEffect(() => { getCartData() }, [cartData])

    function addToCart(item) {
        getCartData()

        // Retrieve existing cart data from sessionStorage
        const existingCartData = JSON.parse(sessionStorage.getItem('cartData')) || [];

        console.log(existingCartData);

        if (existingCartData[0] === null) {
            console.log('Cart is empty. Adding the first item to cart.');

            // Add the new item to the existing cart data
            const updatedCartData = [item];
            alert('Added to cart');

            // Save the updated cart data back to sessionStorage
            sessionStorage.setItem('cartData', JSON.stringify(updatedCartData));
            getCartData()

        } else {
            const isItemInCart = existingCartData.some(existingItem => existingItem.id === item.id);
            console.log('adding to cart....');
            if (isItemInCart) {
                alert('Item already exists in the cart');
                getCartData()

            } else {
                // Add the new item to the existing cart data
                const updatedCartData = [...existingCartData, item];
                alert('added to cart');

                // Save the updated cart data back to sessionStorage
                sessionStorage.setItem('cartData', JSON.stringify(updatedCartData));
                getCartData()

            }
        }
    }

    function updateCart(updatedQuantity, item) {
        // getCartData()
        const updatedTotalPrice = item.drug_price * updatedQuantity;

        // Retrieve existing cart data from sessionStorage
        const existingCartData = JSON.parse(sessionStorage.getItem('cartData')) || [];

        // Find the index of the item in the cart data
        const itemIndex = existingCartData.findIndex(existingItem => existingItem.id === item.id);

        if (itemIndex !== -1) {
            // Update the quantity and total_price for the specific item
            existingCartData[itemIndex] = {
                ...existingCartData[itemIndex],
                quantity: updatedQuantity,
                total_price: updatedTotalPrice
            };

            // Save the updated cart data back to sessionStorage
            sessionStorage.setItem('cartData', JSON.stringify(existingCartData));
            getCartData();
        }
    }


    function removeFromCart(itemId) {
        // Retrieve existing cart data from sessionStorage
        const existingCartData = JSON.parse(sessionStorage.getItem('cartData')) || [];

        // Check if the item with the specified itemId exists in the cart
        const updatedCartData = existingCartData.filter(item => item.id !== itemId);

        console.log('Item removed from the cart.');
        // Save the updated cart data back to sessionStorage
        sessionStorage.setItem('cartData', JSON.stringify(updatedCartData));
        getCartData()
    }

    const registerUser = async (username, email, password, user_role = null) => {
        const url = `http://127.0.0.1:8000/api/register`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    user_role,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data.data.user);
                alert(`Registration successful ${data.data.user.username}`);
                window.location.href = '/';

                return true;
            } else {
                console.log('Registration failed.');
                return false;
            }
        } catch (error) {
            console.log('Error:', error);
            return false;
        }
    };

    const registerUserAdmin = async (userData) => {
        const url = `http://127.0.0.1:8000/api/user/register`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data.user.username);

                return true
            } else {
                console.log('Registration failed.');
                return false
            }
        } catch (error) {
            console.log('Error:', error);
            return false
        }
    };

    const addDrugs = async (drugData) => {
        const url = `http://127.0.0.1:8000/api/add_drugs`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(drugData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Drug Added successfully');

                return true
            } else {
                console.log('Drug could not be added');
                return false
            }
        } catch (error) {
            console.log('Error:', error);
            return false
        }

    }

    const addCategory = async (categoryData) => {
        const url = `http://127.0.0.1:8000/api/add_category`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Category Added successfully');

                return true
            } else {
                alert('Category could not be added');
                return false
            }
        } catch (error) {
            console.log('Error:', error);
            return false
        }

    }

    const handlePurchase = async () => {
        if (userData == null) {
            alert('Please sign in first to complete this purchase')
            return
        }

        const url = `http://127.0.0.1:8000/api/add_order`;

        const existingCartData = JSON.parse(sessionStorage.getItem('cartData')) || [];

        const orderData = {
            order_details: existingCartData,
            user_token: userData.user_token
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Order Added successfully');

                return true
            } else {
                alert('Order could not be added');
                return false
            }
        } catch (error) {
            console.log('Error:', error);
            return false
        }

    }

    const loginUser = async (userData) => {
        const url = `http://127.0.0.1:8000/api/user/login`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data.data.user);
                console.log('Login successful:', data);
                alert('User login successfully')
                window.location.href = '/';
                return true
            } else {
                alert('Login failed.');
            }
        } catch (error) {
            console.log('Error:', error);
            alert(`Login failed with this error:${error}`)
        }
    };

    const fetchMyProtests = async (userToken) => {
        const url = `http://127.0.0.1:8000/api/protests/${userToken}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setProtests(data.data);
                console.log('Protest fetch successful:', data);

                return true
            } else {
                alert('Data could not be fetched.');
            }
        } catch (error) {
            alert('Error:', error);
        }
    };

    const postProtests = async (protestData) => {
        const url = `http://127.0.0.1:8000/api/protests`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(protestData),
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data.data.user);
                console.log('Post successful:', data);

                return true
            } else {
                console.log('Registration failed.');
                return false
            }
        } catch (error) {
            console.log('Error:', error);
            return false
        }
    };

    const updateUser = async (user_data, user_id) => {
        const url = `http://127.0.0.1:8000/api/update_user/${user_id}`;
        console.log(url)

        try {
            const response = await fetch(url, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user_data),
            });

            if (response.ok) {
                const data = await response.json();
                alert('User updated successfully');
                return true
            } else {
                alert('User could not be updated.');
                return false;
            }
        } catch (error) {
            console.log('Error:', error);
            return false;
        }
    }


    const logout = () => {
        setUserData(null)
        setIsAuthenticated(false)
        sessionStorage.removeItem('userData');
        window.location.href = '/';
    }

    const contextValue = {
        userData,
        isAuthenticated,
        registerUser,
        registerUserAdmin,
        loginUser,
        fetchMyProtests,
        visible,
        setVisible,
        postProtests,
        updateUser,
        logout,
        addDrugs,
        addCategory,
        removeFromCart,
        cartData,
        addToCart,
        updateCart,
        handlePurchase

    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
