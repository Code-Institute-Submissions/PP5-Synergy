import React, { useRef, useState } from 'react'
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';


const Workstream = (props) => {
    const currentUser = useCurrentUser()
    const [errors, setErrors] = useState({});
    const toast = useRef(null);
    
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
    const inputData = {default_workstream: id}

    const showError = () => {
        toast.current.show({
            severity:'error', 
            summary: 'Unauthorized Access', 
            content: (props) => (
                <div className="flex flex-column align-items-left" style={{ flex: '1' }}>
                    <div className="font-medium text-lg my-3 text-900">{props.message.summary}</div>
                    <div className="flex align-items-center gap-2">
                        <span className="font-bold text-900">You are not participating in "{name}"</span>
                    </div>
                    
                </div>
            ),
            life: 3000
        });
    }

    const handleSwitch = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosReq.put(`api/profiles/switch/${currentUser.pk}/`, inputData);
            navigate('/workstream/active')
        } catch (err) {
            setErrors(err.response?.data.default_workstream[0]);
            showError()
        }
    }
    
    return (
        <>
        <Toast ref={toast} />
        <Card className='mx-2' onClick={handleSwitch} title={name} subTitle={' Participants: '+ users.length } pt={{ title: { className: "text-sm" }, subTitle: { className: "text-xs" }, body: { className: "m-1" }}}>
        </Card>
        </>
    )
}

export default Workstream
