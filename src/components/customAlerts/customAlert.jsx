import React from 'react'

export function CustomAlert({ alert }) {
    return (
        alert && alert.message &&
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role='alert'>
            {alert.message}
         </div>
    )
}
