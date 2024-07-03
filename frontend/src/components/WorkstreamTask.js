import React from 'react'
import { Chip } from 'primereact/chip';

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
    
    return (
        <Chip label={name} image={owner?.profile_avatar}/>
    )
}

export default WorkstreamTask
