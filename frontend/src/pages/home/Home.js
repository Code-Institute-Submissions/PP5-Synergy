import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'

const Home = () => {
    const navigate = useNavigate()

    return (
        <>
        <div className="grid grid-nogutter surface-0 text-800">
            <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                <section>
                    <span className="block text-6xl font-bold mb-1">Start Managing</span>
                    <div className="text-6xl text-primary font-bold mb-3">Your Tasks</div>
                    <p className="mt-0 mb-4 text-700 line-height-3">Collaborate with other user to complete your goals</p>

                    <Button label="Get Started" onClick={() => {navigate('/signup')}} type="button" className="mr-3 p-button-raised" />
                </section>
            </div>
            <div className="col-12 md:col-6 overflow-hidden">
                <img src="/demo/images/blocks/hero/hero-1.png" alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
            </div>
        </div>
        <div className="surface-0 text-center">
            <div className="mb-3 font-bold text-3xl">
                <span className="text-900">One Product, </span>
                <span className="text-blue-600">Many Solutions</span>
            </div>
            <div className="text-700 mb-6">Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.</div>
            <div className="grid">
                <div className="col-12 md:col-4 mb-4 px-5">
                    <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                        <i className="pi pi-users text-4xl text-blue-500"></i>
                    </span>
                    <div className="text-900 text-xl mb-3 font-medium">Work as a Team</div>
                    <span className="text-700 line-height-3">Allow other users to join to complete tasks</span>
                </div>
                <div className="col-12 md:col-4 mb-4 px-5">
                    <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                        <i className="pi pi-folder text-4xl text-blue-500"></i>
                    </span>
                    <div className="text-900 text-xl mb-3 font-medium">Categorize Task</div>
                    <span className="text-700 line-height-3">Create your own Categories for tasks</span>
                </div>
                <div className="col-12 md:col-4 mb-4 px-5">
                    <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                        <i className="pi pi-check-circle text-4xl text-blue-500"></i>
                    </span>
                    <div className="text-900 text-xl mb-3 font-medium">Easy to Use</div>
                    <span className="text-700 line-height-3">Simple interface for creating and managing tasks</span>
                </div>
            </div>
        </div>
        </>
    
  )
}

export default Home
