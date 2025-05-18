import React from 'react'
import './tableSkletenLoading.css'
import { useSelector } from 'react-redux';

const SkeletonRow = () => {

    // getting required Data from global store using useSelector
    const { user: logedUser } = useSelector((state) => state.auth);

    return (
        <tr className="skeleton-row">
            <td><div className="skeleton-box small" /></td>
            <td><div className="skeleton-box" /></td>
            <td><div className="skeleton-box" /></td>
            <td><div className="skeleton-box large" /></td>
            <td><div className="skeleton-box" /></td>
            <td><div className="skeleton-box small" /></td>
            <td><div className="skeleton-box small" /></td>
            {logedUser?.role.includes("superadmin") && <td><div className="skeleton-btn" /></td> }
        </tr>
    );
};

const TableSkletenLoading = () => {
    return (
        <>
            {Array(10).fill().map((_, i) => (
                <SkeletonRow key={i} />
            ))}
        </>
    )
}

export default TableSkletenLoading