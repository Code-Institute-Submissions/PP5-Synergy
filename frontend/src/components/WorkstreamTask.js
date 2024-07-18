import React, { useRef, useState } from 'react'
import { Checkbox } from "primereact/checkbox";
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import moment from 'moment';
import { axiosReq } from '../api/axiosDefaults';

const WorkstreamTask = ({props, setID, setVisible, setObject, resource, setResource, rerun, setRerun}) => {
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
            command: () => {
                setID(id);
                setVisible(true);
                setObject(props)
            }
        },
        {
            label: 'Unassign',
            icon: 'pi pi-user-minus',
            command: () => {
                handleRemove()
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
                handleDelete()
            }
        }
    ];
    
    const handleCheckbox = async (e) => {
        e.preventDefault();
        setIsCompleted(!isCompleted)
        console.log(id)
    }

    const handleDelete = async () => {
        try {
            const {data} = await axiosReq.delete(`/api/task/${id}/`)
            let taskList = resource.results.filter((item) => item.id !== id);
            setResource((prevState) => ({
            ...prevState,
            results: taskList,
            }));
        } catch (err) {

        }
    }

    const handleRemove = async () => {
        const formData = new FormData();
        formData.append("owner", 1);
        try {
            const {data} = await axiosReq.put(`/api/task/${id}/leave/`, formData)
            let taskList = resource.results.filter((item) => item.id !== id);
            setResource((prevState) => ({
            ...prevState,
            results: taskList,
            }));
            setRerun(!rerun)
        } catch (err) {
            console.log(err)
        }
    }

    const handleAccept = async () => {
        try {
            const {data} = await axiosReq.put(`/api/task/${id}/assign/`)
            setRerun(!rerun)
        } catch (err) {
            console.log(err)
        }

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
                {deadline && <Tag style={{background: 'transparent', color: '#4b5563'}} className="mx-1" icon="pi pi-clock" value={moment(deadline).format("Do, MMM")}></Tag>}
            </div>
            <div className='flex align-items-center justify-content-between sm:justify-content-end'>
                {owner
                ? <Avatar image={owner?.profile_avatar} size="small" shape="circle"/>
                : <Avatar icon='pi pi-download' size="small" shape="circle" onClick={handleAccept}/>
                }
                
                <Menu model={items} popup ref={taskMenu} id="popup_menu_right" popupAlignment="right" />
                {is_owner && <Button icon="pi pi-ellipsis-v" rounded text size="small" onClick={(event) => taskMenu.current.toggle(event)} aria-controls="popup_task_menu" aria-haspopup />}
            </div>
        </div>
        </>
    )
}

export default WorkstreamTask
