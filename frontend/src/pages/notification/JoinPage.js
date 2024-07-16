import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const JoinPage = () => {
    const [loaded, setLoaded] = useState(false)
    const [workstreamList, setWorkstreamList] = useState({ results: [] });
    const navigate = useNavigate()
    
    return (
        <div>
            join
        </div>
    )
}

export default JoinPage
