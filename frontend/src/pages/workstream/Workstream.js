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


    const header = (
        <div className='px-4 pt-4'>
            <div className="p-card-title capitalize flex align-items-center" data-pc-section="title">
                <span className='pi pi-folder mr-2 text-4xl'/>{name} - Active
            </div>
            {/* <Avatar image={owner?.profile_avatar} shape="circle" size="large"/> */}
        </div>
    )
    return (
        <Card className='mx-2 mt-2' onClick={() => {navigate(`/workstream/${id}`)}} header={header} subTitle={'Author: ' + owner?.username } pt={{ body: { className: "pt-0" }}}>
            <span className='mx-2'>Paticipants</span>
            <span className='pi pi-users' />
            <div className="card flex justify-content-start">
                <AvatarGroup>
                {users?.map((user, idx) => (
                    <Avatar image={user?.profile_avatar} shape="circle" size="xlarge" key={idx}/>
                ))}
                </AvatarGroup>
            </div>
        </Card>
    )
}

export default Workstream
