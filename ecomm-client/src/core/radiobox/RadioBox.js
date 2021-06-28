import React, {useState, useEffect, Fragment} from 'react'

const RadioBox = ({prices, handleFilters}) => {
    const [value, setValue] = useState(0)

    const handleChange = (event) => {
        handleFilters(event.target.value)
        setValue(event.target.value)
    }

    return (
        <Fragment>
            {
                prices.map((price, index) => {
                    return <div key={index}><input type="radio"
                                                   onChange={handleChange}
                                                   name={price}
                                                   value={`${price._id}`}
                                                   className="mr-2 ml-4"/>
                        <label className="form-check-label">{price.name}</label>
                    </div>
                })
            }
        </Fragment>
    )
}

export default RadioBox
