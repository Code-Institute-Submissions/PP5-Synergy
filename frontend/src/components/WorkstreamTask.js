import React, { useState } from 'react'
import { Chip } from 'primereact/chip';
import { Checkbox } from "primereact/checkbox";
import { SpeedDial } from 'primereact/speeddial';

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

    const items = [
        {
            label: 'Add',
            icon: 'pi pi-pencil',
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh',
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
        },
        {
            label: 'Upload',
            icon: 'pi pi-upload',
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: () => {
                window.location.href = 'https://react.dev/';
            }
        }
    ];
    
    const handleCheckbox = async (e) => {
        e.preventDefault();
        setIsCompleted(!isCompleted)
        console.log('clicked')
    }


    return (
        <div className="card flex justify-content-center">
            <Chip label={name} image={owner?.profile_avatar}/>
            <span className='pi pi-clock'></span>
            <span>{deadline}</span>
            {owner && (<Checkbox onChange={handleCheckbox} checked={isCompleted}></Checkbox>)}
            <SpeedDial className='relative' model={items} radius={80} type="semi-circle" direction="left" transitionDelay={80} showIcon="pi pi-ellipsis-v" hideIcon="pi pi-times" buttonClassName="p-button-text w-2rem h-1rem"/>
        </div>
        
    )
}

export default WorkstreamTask
