import React from 'react'
import { Skeleton } from 'primereact/skeleton';

const ProfileSkeleton = () => {
  return (
    <div className={"col-12 md:col-6 lg:col-3"}>
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
          <div className="flex justify-content-between mb-1">
            <div>
                <Skeleton width="5rem" className="mb-2"></Skeleton>
                <Skeleton width="10rem" className="mb-2"></Skeleton>
            </div>
            <Skeleton size="2.5rem" className="mr-2"></Skeleton>
          </div>
          <div className="flex justify-content-between">
            <Skeleton width="10rem" height=".5rem"></Skeleton>
          </div>
        </div>
      </div>
  )
}

export default ProfileSkeleton
