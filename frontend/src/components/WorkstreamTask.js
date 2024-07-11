import React, { useRef, useState } from 'react'
import { Checkbox } from "primereact/checkbox";
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';

const WorkstreamTask = (props) => {
    const taskMenu = useRef(null);
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
            label: 'Edit',
            icon: 'pi pi-pencil',
        },
        {
            label: 'Unassign',
            icon: 'pi pi-user-minus',
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
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
            {is_owner && (<Checkbox onChange={handleCheckbox} checked={isCompleted}></Checkbox>)}
            <span className='ml-2'>{name}</span>
        </div>
        <div className='flex flex-1 gap-3 flex-column sm:flex-row sm:justify-content-between'>
            <div className='flex align-items-center'>
                {category && <Tag style={{background: 'transparent', color: '#4b5563'}} className='mx-1' value={category.name}></Tag>}
                {project && <Tag style={{background: 'transparent', color: '#4b5563'}} className='mx-1' value={project.title}></Tag>}
                {deadline && <Tag style={{background: 'transparent', color: '#4b5563'}} className="mx-1" icon="pi pi-clock" value={deadline}></Tag>}
            </div>
            <div className='flex align-items-center justify-content-between sm:justify-content-end'>
                <Avatar image={owner?.profile_avatar} size="small" shape="circle"/>
                <Menu model={items} popup ref={taskMenu} id="popup_menu_right" popupAlignment="right" />
                <Button icon="pi pi-ellipsis-v" rounded text size="small" onClick={(event) => taskMenu.current.toggle(event)} aria-controls="popup_task_menu" aria-haspopup />
            </div>
        </div>
        </>
    )
}

export default WorkstreamTask
