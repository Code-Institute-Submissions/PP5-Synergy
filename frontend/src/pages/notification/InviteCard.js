import React from 'react'
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import { axiosReq } from '../../api/axiosDefaults';

const InviteCard = ({title, message, count, icon, display, id}) => {
    const navigate = useNavigate()

    const handleClick = () => {
        if (icon === 'pi pi-user-plus') {
            navigate('/invite')
        } else {
            navigate('/join')
        }
    }

    const handleJoin = async () => {
        const formData = new FormData();
        formData.append("workstream", id);
        try {
            const { data } = await axiosReq.post("/api/join/", formData);
            console.log(data)
            navigate('/notification')
        } catch (err) {
            console.log(err)
        }
    }

    return (
    <div className={display ? "col-12 md:col-6 lg:col-3 cursor-pointer" : "col-12 md:col-6 lg:col-3"}>
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-1">
                <div>
                    <span className="block text-500 font-medium mb-1">{title}</span>
                    <div className="text-900 font-medium text-xl">{count}</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-primary-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    {display
                    ? <Avatar image={icon} /> 
                    : <i className={`${icon} text-primary-500 text-xl`}></i>
                    }
                </div>
            </div>
            <div className="flex justify-content-between">
                <span className="text-primary-500 font-medium">{message}</span>
                {display 
                ? title !== '0' && <Tag className='cursor-pointer' icon="pi pi-plus" severity="primary" value="Join" onClick={handleJoin}></Tag> 
                : <Tag className='cursor-pointer' icon="pi pi-plus" severity="primary" value="Create" onClick={handleClick}></Tag>
                }
            </div>
        </div>
    </div>
  )
}

export default InviteCard
