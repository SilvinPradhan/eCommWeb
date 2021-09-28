import React, {useState, useEffect} from 'react'
import Layout from "../Layout";
import Card from "../cards/Card";
import {getCategories} from "../../admin/apiAdmin";
import {getFilterProducts} from "../apiCore";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckBox from "../checkbox/CheckBox";
import {prices} from "../price/FixedPrice";
import RadioBox from "../radiobox/RadioBox";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretSquareDown} from "@fortawesome/free-solid-svg-icons/faCaretSquareDown";

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])
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
        loadFilteredResults(skip, limit, isfilter.filters)
    }, [])

    const handleFilters = (filters, filterBy) => {
        //    filter by price or categories
        // console.log('Shop', filters, filterBy)
        const newFilters = {...isfilter}
        newFilters.filters[filterBy] = filters
        if (filterBy === "price") {
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
        return getFilterProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
    }

    const loadMoreFilters = (newFilters) => {
        const toSkip = limit + skip
        return getFilterProducts(toSkip, limit, isfilter.filters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults([...filteredResults, ...data.data])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMoreFilters} className="btn btn-warning mb-5">Load More Products<FontAwesomeIcon
                    icon={faCaretSquareDown}/>
                </button>
            )
        )
    }

    return (
        <>
            <Layout title="Shop Deals" description={"Search and find all of the new arrivals and products!"}
                    className={"container-fluid"}/>
            <ToastContainer/>
            <div className="row mt-2">
                <div className="col-4">
                    <h4>Categories</h4>
                    <ul>
                        <CheckBox handleFilters={filters => handleFilters(filters, 'category')}
                                  categories={categories}/>
                    </ul>
                    <h4>Filter by price range</h4>
                    <div>
                        <RadioBox handleFilters={filters => handleFilters(filters, 'price')}
                                  prices={prices}/>
                    </div>
                </div>


                <div className="col-8">
                    <h4 className={"mb-4"}> All Products</h4>
                    <div className={"row"}>
                        {
                            filteredResults.map((product, index) => (
                                <Card key={index} product={product}/>
                            ))
                        }
                    </div>
                    <hr/>
                    {loadMoreButton()}
                </div>
            </div>
        </>
    )
}

export default Shop
