import React, {useState, useEffect} from 'react'
import {getCategories} from "../../admin/apiAdmin";

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    })

    const {categories, category, search, results, searched} = data

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setData({...data, categories: data})
            }
        })
    }

    useEffect(() => {
        loadCategories()
    })

    return (
        <div>
            <h1>Search Bar {JSON.stringify(categories)}</h1>
        </div>
    )
}

export default Search
