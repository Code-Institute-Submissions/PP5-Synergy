import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const InvitePage = () => {
    const [loaded, setLoaded] = useState(false)
    const [userList, setUserList] = useState({ results: [] });
    const navigate = useNavigate()
    
    return (
        <div>
            invite
        </div>
    )
}

export default InvitePage
