import React from 'react'

const AuxiliaryContainerWithClass = (WrapperComponent, className) => {

    return (props) => (
        <div className={className}>
            <WrapperComponent {...props}/>
        </div>
    )
}

export default AuxiliaryContainerWithClass