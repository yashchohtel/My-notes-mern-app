import React from 'react'
import './cardSkletenLoading.css'

const CardSkletenLoading = () => {
    return (
        <>
            <div className="note-card-skeleton">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-line"></div>
                <div className="skeleton skeleton-line short"></div>
                <div className="skeleton skeleton-line shorter"></div>
                <div className="skeleton skeleton-line tiny"></div>

                <div className="skeleton-footer">
                    <div className="skeleton-icon-group">
                        <div className="skeleton skeleton-icon"></div>
                        <div className="skeleton skeleton-icon"></div>
                        <div className="skeleton skeleton-icon"></div>
                        <div className="skeleton skeleton-icon"></div>
                    </div>
                    <div className="skeleton skeleton-date"></div>
                </div>
            </div>
        </>
    )
}

export default CardSkletenLoading