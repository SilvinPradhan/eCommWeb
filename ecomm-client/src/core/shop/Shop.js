import React, {useState, useEffect} from 'react'
import Layout from "../Layout";
import Card from "../cards/Card";
import {getCategories} from "../../admin/apiAdmin";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckBox from "../checkbox/CheckBox";
import {prices} from "../price/FixedPrice";
import RadioBox from "../radiobox/RadioBox";

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
        if (filterBy == "price") {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }
        loadFilteredResults(isfilter.filters)
        setIsFilters(newFilters)
    }

    const handlePrice = (value) => {
        const data = prices
        let array = []
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array
    }

    const loadFilteredResults = (newFilters) => {
        console.log(newFilters)
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
                    <h3>Filter by price range</h3>
                    <div>
                        <RadioBox handleFilters={filters => handleFilters(filters, 'price')}
                                  prices={prices}/>
                    </div>
                </div>


                <div className="col-8">
                    {JSON.stringify(isfilter)}
                </div>
            </div>
        </>
    )
}

export default Shop