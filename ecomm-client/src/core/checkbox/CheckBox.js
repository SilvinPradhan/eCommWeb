import React, {useEffect, useState} from 'react'

const CheckBox = ({categories, handleFilters}) => {
    const [checked, setChecked] = useState([])
    const handleToggle = category => () => {
        const initialCategoryId = checked.indexOf(category) // Return 1st index or -1
        const newCheckedCategoryId = [...checked]
        //    If currently checked was not already in the checked state, then push
        if (initialCategoryId === -1) {
            newCheckedCategoryId.push(category)
        } else {
            //    Else pop/splice
            newCheckedCategoryId.splice(initialCategoryId, 1)
        }
        // console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }
    return (
        <>
            {
                categories.map((category, index) => {
                    return <li key={index} className="list-unstyled"><input type="checkbox"
                                                                            onChange={handleToggle(category._id)}
                                                                            value={checked.indexOf(category._id === -1)}
                                                                            className="form-check-input"/>
                        <label className="form-check-label">{category.name}</label>
                    </li>
                })
            }
        </>
    )

}

export default CheckBox
