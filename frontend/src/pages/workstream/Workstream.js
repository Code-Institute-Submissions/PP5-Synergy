import React from 'react'
import { Card } from 'primereact/card';

const Workstream = (props) => {
    const {
        id,
        owner,
        created_at,
        updated_at,
        name,
        users,
        is_owner,
    } = props;


    return (
        <Card title={name} subTitle={owner.username}>
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
        </Card>
    )
}

export default Workstream
