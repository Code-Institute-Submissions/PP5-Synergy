import React, { useState } from 'react'
import { InputSwitch } from "primereact/inputswitch";
import { axiosReq } from '../../api/axiosDefaults';

const Staff = ({props, rerun, setRerun}) => {
    const {
        id,
        owner,
        is_staff,
    } = props
    const [isStaff, setIsStaff] = useState(is_staff)

    const handlePermission = async () => {
        const formData = new FormData()
        formData.append("is_staff", !isStaff)
        try {
            const {data} = await axiosReq.put(`/api/workstream/participant/${id}/`, formData)
            setRerun(!rerun)
        } catch (err) {
        }
    }

    return (
        <>
        <div className="flex align-items-center flex-1">
            <span>{owner}</span>
        </div>
        <div className="flex align-items-center flex-1 justify-content-between md:justify-content-evenly">
            <span>Staff Privileges</span>
            <InputSwitch checked={isStaff} onChange={() => {setIsStaff(!isStaff); handlePermission()}} />
        </div>
        </>
    )
}

export default Staff
