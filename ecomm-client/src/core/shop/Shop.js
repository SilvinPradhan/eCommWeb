import React, {useState, useEffect} from 'react'
import Layout from "../Layout";
import Card from "../cards/Card";
import {getCategories} from "../../admin/apiAdmin";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckBox from "../checkbox/CheckBox";

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [isfilter, setIsFilters] = useState({
        filters: {category: [], price: []}
    })

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
                toast.error('Categories has not been fetched!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                setCategories(data)
            }
        })
    }

    useEffect(() => {
        init()
    }, [])

    const handleFilters = (filters, filterBy) => {
        //    filter by price or categories
        // console.log('Shop', filters, filterBy)
        const newFilters = {...isfilter}
        newFilters.filters[filterBy] = filters
        setIsFilters(newFilters)
    }

    return (
        <>
            <Layout title="Shop Deals" description={"Search and find all of the new arrivals and products!"}
                    className={"container-fluid"}/>
            <ToastContainer/>
            <div className="row">
                <div className="col-4">
                    <h3>Categories</h3>
                    <ul>
                        <CheckBox handleFilters={filters => handleFilters(filters, 'category')}
                                  categories={categories}/>
                    </ul>
                </div>
                <div className="col-8">
                    {JSON.stringify(isfilter)}
                </div>
            </div>
        </>
    )
}

export default Shop
