import React, { useState } from 'react'
import { Checkbox } from "primereact/checkbox";
import { SpeedDial } from 'primereact/speeddial';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';

const WorkstreamTask = (props) => {
    const {
        category,
        created_at,
        deadline,
        detail,
        id,
        is_completed,
        project,
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
        console.log(id)
    }


    return (
        <>
        <div className="flex align-items-center flex-1">
            {owner && (<Checkbox onChange={handleCheckbox} checked={isCompleted}></Checkbox>)}
            <span className='ml-2'>{name}</span>
        </div>
        <div className='flex flex-1 gap-3 flex-column sm:flex-row sm:justify-content-between'>
            <div className='flex align-items-center'>
                {category && <Tag style={{background: 'transparent', color: '#4b5563'}} className='mx-1' value={category.name}></Tag>}
                {project && <Tag style={{background: 'transparent', color: '#4b5563'}} className='mx-1' value={project.title}></Tag>}
                {deadline && <Tag style={{background: 'transparent', color: '#4b5563'}} className="mx-1" icon="pi pi-clock" value={deadline}></Tag>}
            </div>
            <div className='flex align-items-center sm:justify-content-end'>
                <Avatar image={owner?.profile_avatar} size="small" shape="circle"/>
                <SpeedDial className='relative' model={items} radius={80} type="semi-circle" direction="left" transitionDelay={80} showIcon="pi pi-ellipsis-v" hideIcon="pi pi-times" buttonClassName="p-button-text w-2rem h-1rem"/>
            </div>
        </div>
        </>
    )
}

export default WorkstreamTask
