import React from 'react';
import { CardContent, CardHeader, Card } from "@material-ui/core";

const CardComponent = ({text, component}) => (
    <Card>
        <CardHeader text={text}/>
        <CardContent component={component}/>
    </Card>
)

export default CardComponent