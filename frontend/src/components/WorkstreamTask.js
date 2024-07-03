import React, { useState } from 'react'
import { Chip } from 'primereact/chip';
import { Checkbox } from "primereact/checkbox";

const WorkstreamTask = (props) => {
    const {
        category,
        created_at,
        deadline,
        detail,
        id,
        is_completed,
        is_owner,
        name,
        owner,
        priority,
        updated_at,
    } = props

    const [isCompleted, setIsCompleted] = useState(is_completed)
    
    const handleCheckbox = async (e) => {
        e.preventDefault();
        setIsCompleted(!isCompleted)
        console.log('clicked')
    }


    return (
        <div className="card flex justify-content-center">
            {owner && (<Checkbox onChange={handleCheckbox} checked={isCompleted}></Checkbox>)}
            <Chip label={name} image={owner?.profile_avatar}/>
        </div>
        
    )
}

export default WorkstreamTask
