import React from 'react'
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';

const EmptyInvite = ({title, message, count, icon}) => {
    const navigate = useNavigate()

    const handleClick = () => {
        if (icon === 'pi pi-user-plus') {
            navigate('/invite')
        } else {
            navigate('/join')
        }
    }
    return (
    <div className="col-12 md:col-6 lg:col-3">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-1">
                <div>
                    <span className="block text-500 font-medium mb-1">{title}</span>
                    <div className="text-900 font-medium text-xl">{count}</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-primary-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className={`${icon} text-primary-500 text-xl`}></i>
                </div>
            </div>
            <div className="flex justify-content-between">
                <span className="text-primary-500 font-medium">{message}</span>
                <Tag className='cursor-pointer' icon="pi pi-plus" severity="primary" value="Create" onClick={handleClick}></Tag>
            </div>
        </div>
    </div>
  )
}

export default EmptyInvite
