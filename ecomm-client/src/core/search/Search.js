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

    const submitForm = () => {

    }

    const handleChange = () => {

    }

    const searchForm = () =>
        (<form onSubmit={submitForm}>
           <span className={"input-group-text"}>
                <div className={"input-group input-group-lg"}>
                    <div className={"input-group-prepend"}>
                        <select className={"btn mr-2"} onChange={handleChange("category")}>
                            <option value={"All"}>Pick Category</option>
                            {
                                categories.map((c, i) => {
                                    return <option key={i} value={c._id}>
                                        {c.name}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <input type={"search"} className={"form-control"} onChange={handleChange("search")}
                           placeholder={"search by name"}/>
                </div>
           </span>
            </form>
        )


    return (
        <div>
            <div className={"container"}>
                {searchForm()}
            </div>
        </div>
    )
}

export default Search
