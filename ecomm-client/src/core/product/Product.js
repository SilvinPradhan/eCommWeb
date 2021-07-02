import React, {useEffect, useState} from 'react'
import {Card, CardHeader, CardContent} from '@material-ui/core'
import Typography from "@material-ui/core/Typography";

const Product = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <Typography>Product Name Here</Typography>
                </CardHeader>
                <CardContent>
                    <span>Product Content here¬</span>
                </CardContent>
            </Card>
        </>
    )
}

export default Product
