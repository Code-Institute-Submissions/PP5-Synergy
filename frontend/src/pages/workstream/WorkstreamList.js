import React from 'react'
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import { useNavigate } from 'react-router-dom';


const Workstream = (props) => {
    const navigate = useNavigate()
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
        <Card className='mx-2' onClick={() => {navigate(`/workstream/${id}`)}} title={name} subTitle={' Participants: '+ users.length } pt={{ title: { className: "text-sm" }, subTitle: { className: "text-xs" }, body: { className: "m-1" }}}>
        </Card>
    )
}

export default Workstream
