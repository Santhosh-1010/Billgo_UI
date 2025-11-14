import { Container, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { flushDB } from "../actions/adminActions";
import edit from '../Assets/edit.svg'
import deleteicon from '../Assets/delete.svg'
import userApproveIcon from '../Assets/userApprove.svg'
import rejectIcon from '../Assets/rejectUser.svg'
import resetPass from '../Assets/resetPass.svg'
import { userList, pendingUserList, userApprove, userDelete, userReject, userRoleEdit, userResetPassword } from "../actions/userActions";
import Swal from "sweetalert2";
import { showConfirmAlert, showSuccessAlert, showErrorAlert } from "../utils/config";
import DynamicTable from "./DynamicTable";
export function AdminDashboard() {
    const activeadminTab = "adminUsers"
    const [userData, setUserData] = useState()
    const [modelFrom, setModelFrom] = useState("")
    const [modelHead, setModelHead] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [newPassword, setNewPassword] = useState('')
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("users");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [users, setUsers] = useState([]);
    const [pendingCurrentPage, setPendingCurrentPage] = useState(1);
    const [pendingTotalPages, setPendingTotalPages] = useState(1);
    const [pendingUsers, setPendingUsers] = useState([]);
    const pageSize = 10;
    let roles = [{ id: '2', rolename: "admin" }, { id: '4', rolename: "employee" },
    { id: '5', rolename: "manager" }, { id: '6', rolename: "leadership" }, { id: '7', rolename: "cxo" }
    ]
    const dispatch = useDispatch();

    const fetchUsers = async (page) => {
        setLoading(true);
        try {
            const response = await dispatch(userList({ page, page_size: pageSize }));
            const data = response?.data;

            setUsers(data.users || []);
            setTotalPages(data?.total_pages || 1);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPendingUsers = async (page) => {
        setLoading(true);
        try {
            const response = await dispatch(
                pendingUserList({ page, page_size: pageSize })
            );
            const data = response?.data;
            setPendingUsers(data?.pending_users || []);
            setPendingTotalPages(data?.total_pages || 1);
        } catch (error) {
            console.error("Error fetching pending users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === "users") {
            fetchUsers(currentPage);
        } else if (activeTab === "pendingUsers") {
            fetchPendingUsers(pendingCurrentPage);
        }
    }, [currentPage, pendingCurrentPage, activeTab]);

    const handlePageChange = (page) => {
        if (activeTab === "users" && page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        } else if (activeTab === "pendingUsers" && page >= 1 && page <= pendingTotalPages) {
            setPendingCurrentPage(page);
        }
    };

    const userColumns = users.length > 0
        ? Object.keys(users[0]).filter((key) => key !== "id" && key !== "fullname").map((key) => ({
            label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            accessor: key,
        }))
        : [];

    const pendingUserColumns = pendingUsers.length > 0
        ? Object.keys(pendingUsers[0]).filter((key) => key !== "id" && key !== "fullname").map((key) => ({
            label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            accessor: key,
        }))
        : [];

    const tabStyle = (tabName) => ({
        color: activeTab === tabName ? "#07439C" : "#666666",
    });
    const FullScreenLoader = () => (
        <div className="loader-overlay">
            <div className="spinner-border text-white" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
    const [formValues, setFormValues] = useState({ email: "", role: "", company_name: "" });
    const onRoleChange = (e) => {
        if (!selectedUser?.id) {
            showErrorAlert('Error', 'User ID is missing.');
            return;
        }
        const selectedProject = roles.find((role) => role.id === e.target.value);
        if (!selectedProject) {
            showErrorAlert('Error', 'Invalid role selected.');
            return;
        }
        setFormValues({ role: selectedProject.rolename });
        setUserData({
            role: selectedProject.rolename,
            roleId: e.target.value,
            userid: selectedUser.id,
        });
    }
    const onEditRole = (user) => {
        if (!user?.id) {
            showErrorAlert('Error', 'User ID is missing.');
            return;
        }
        setModelFrom("User");
        setModelHead("Edit Role");
        setSelectedUser(user);
        setShowModal(true);
    };
    const approveUser = (user) => {
        if (!user?.id) {
            showErrorAlert('Error', 'User ID is missing.');
            return;
        }
        dispatch(userApprove(user.id))
            .then((response) => {
                if (response?.status === 200) {
                    showSuccessAlert('Success', 'User approved successfully!');
                    dispatch(userList());
                    dispatch(pendingUserList());
                } else {
                    showErrorAlert('Error', 'Failed to approve user.');
                }
            })
            .catch(() => {
                showErrorAlert('Error', 'Something went wrong.');
            });
    };
    const submitEditedRole = (user) => {
        showConfirmAlert("Edit", "Do you want to edit this user's role?", "Yes, Edit it!")
            .then((result) => {
                if (result.isConfirmed) {
                    setLoading(true)
                    setShowModal(false);
                    dispatch(userRoleEdit(user))
                        .then((response) => {
                            setLoading(false)
                            if (response?.status === 200) {
                                showSuccessAlert('Success', 'User role has been edited successfully!');
                                dispatch(userList());
                            } else {
                                showErrorAlert('Error', 'Failed to edit user role.');
                            }
                        })
                        .catch(() => {
                            showErrorAlert('Error', 'Something went wrong while editing the user role.');
                        });
                } else {
                    Swal.close();
                }
            });
    };
    const deleteUser = (user) => {
        if (!user?.id) {
            showErrorAlert('Error', 'User ID is missing.');
            return;
        }
        showConfirmAlert('Delete', 'Do you want to delete this user?', 'Yes, delete it!')
            .then((result) => {
                if (result.isConfirmed) {
                    setLoading(true);
                    dispatch(userDelete(user.id))
                        .then((response) => {
                            setLoading(false);
                            if (response?.status === 200) {
                                showSuccessAlert('Deleted!', 'User has been deleted.');
                                dispatch(userList());
                            } else {
                                showErrorAlert('Error', 'Failed to delete user.');
                            }
                        })
                        .catch(() => {
                            setLoading(false);
                            showErrorAlert('Error', 'Something went wrong.');
                        });
                } else {
                    Swal.close();
                }
            });
    };
    const rejectUser = (user) => {
        showConfirmAlert('Reject', 'Do you want to reject this user?', 'Yes!')
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch(userReject(user.id))
                        .then((response) => {
                            if (response?.status === 200) {
                                showSuccessAlert('Rejected!', 'User has been rejected successfully.');
                                dispatch(userList());
                                dispatch(pendingUserList());
                            } else {
                                showErrorAlert('Error', 'Failed to reject user.');
                            }
                        })
                        .catch(() => {
                            showErrorAlert('Error', 'Something went wrong while rejecting the user.');
                        });
                } else {
                    Swal.close();
                }
            });
    };
    const onResetPass = (user) => {
        setSelectedUser(user);
        setModelFrom("Reset");
        setModelHead("Reset Password");
        setShowModal(true);
    };
    const onPasswordChange = (e) => {
        setNewPassword({ new_password: e.target.value })
    }
    const resetPassWord = () => {
        if (!selectedUser?.id) {
            showErrorAlert('Error', 'User ID is missing.');
            return;
        }
        setLoading(true);
        dispatch(userResetPassword(newPassword, selectedUser))
            .then((response) => {
                setLoading(false);
                setShowModal(false);
                if (response?.status === 200) {
                    showSuccessAlert('Reset Password', 'Password has been reset successfully!');
                } else {
                    showErrorAlert('Error', 'Failed to reset password.');
                }
            })
            .catch(() => {
                setLoading(false);
                setShowModal(false);
                showErrorAlert('Error', 'Failed to reset password.');
            });
    };
    const onFilter = (e) => {
        setShowModal(true);
        setModelFrom("Filter")
        setModelHead("Filter")
    }
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userList(formValues))
        setFormValues({ email: "", role: "", company_name: "" })
        setShowModal(false);
    };
    const handleFlushDB = () => {
        dispatch(flushDB())
            .then((response) => {
                if (response?.status === 200) {
                    showSuccessAlert('Ok!', response.message);
                } else {
                    showErrorAlert('Error', 'Memory released for all collections Failed');
                }
            }).catch(() => {
                setShowModal(false);
                showErrorAlert('Error', 'Memory released for all collections Failed');
            });
    };
    const handleReset = (e) => {
        setFormValues({ email: "", role: "", company_name: "" })
        dispatch(userList())
        setShowModal(false);

    }
    return (
        <Container fluid className="w-90">
            <div className="row">
                {loading && <FullScreenLoader />}
                <hr className="navBarAdmin"></hr>
                {activeadminTab === "adminUsers" ?
                    (<>
                        <ul className="nav gap-5 d-flex w-100 position-relative">
                            <li className="nav-item">
                                <button
                                    className="nav-link" style={tabStyle("users")}
                                    onClick={() => setActiveTab("users")}>
                                    Active Users
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="nav-link" style={tabStyle("pendingUsers")}
                                    onClick={() => setActiveTab("pendingUsers")}
                                >
                                    Pending Users
                                </button>
                            </li>
                            {activeTab === "users" && (
                                <div
                                    className="d-flex gap-2 position-absolute"
                                    style={{
                                        right: "5%",
                                        top: 0,
                                    }}
                                >
                                    <button
                                        className="custom-btn btn btn-outline-primary btn-sm"
                                        style={{
                                            padding: "6px 16px",
                                            fontWeight: "500",
                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                            transition: "all 0.3s ease-in-out",
                                        }}
                                        title="Filter"
                                        onClick={onFilter}
                                    >
                                        <i className="bi bi-funnel-fill me-1"></i> Filter
                                    </button>

                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        style={{
                                            padding: "6px 16px",
                                            fontWeight: "500",
                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                            transition: "all 0.3s ease-in-out",
                                        }}
                                        title="Export"
                                        onClick={handleFlushDB}
                                    >
                                        <i className="bi bi-download me-1"></i> Flush DB
                                    </button>
                                </div>
                            )}


                        </ul>
                        <hr className="navBarAdmin"></hr>
                        <div className="content">
                            {activeTab === "users" && (
                                <div className="table-container">
                                    <DynamicTable
                                        data={users}
                                        columns={userColumns}
                                        emptyMessage="No Users Found"
                                        actions={[
                                            { label: "Edit", icon: edit, onClick: onEditRole, title: "Edit Role" },
                                            { label: "Delete", icon: deleteicon, onClick: deleteUser, title: "Delete User" },
                                            { label: "Reset", icon: resetPass, onClick: onResetPass, title: "Reset Password" },
                                        ]}
                                    />
                                </div>
                            )}

                            {activeTab === "pendingUsers" && (
                                <div className="table-container">
                                    <DynamicTable
                                        data={pendingUsers}
                                        columns={pendingUserColumns}
                                        emptyMessage="No Pending Users"
                                        actions={[
                                            { label: "Approve", icon: userApproveIcon, onClick: approveUser, title: "Approve User" },
                                            { label: "Reject", icon: rejectIcon, onClick: rejectUser, title: "Reject User" },
                                        ]}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="pagination-controls fixed-pagination">
                            <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handlePageChange(activeTab === "users" ? currentPage - 1 : pendingCurrentPage - 1)}
                                disabled={activeTab === "users" ? currentPage === 1 : pendingCurrentPage === 1}
                            >
                                Previous
                            </button>
                            <span style={{ fontSize: "0.85rem" }}>
                                Page {activeTab === "users" ? currentPage : pendingCurrentPage} of{" "}
                                {activeTab === "users" ? totalPages : pendingTotalPages}
                            </span>
                            <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handlePageChange(activeTab === "users" ? currentPage + 1 : pendingCurrentPage + 1)}
                                disabled={activeTab === "users" ? currentPage === totalPages : pendingCurrentPage === pendingTotalPages}
                            >
                                Next
                            </button>
                        </div>
                        <Modal
                            show={showModal}
                            onHide={() => setShowModal(false)}
                            dialogClassName="custom-modal"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 1050,
                                margin: 0,
                            }}
                        >
                            <Modal.Header>
                                <Modal.Title>{modelHead}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {modelFrom === "Reset" ? (
                                    <>
                                        <p>User name : {selectedUser?.full_name}</p>
                                        <label>New Password: </label>
                                        <input type="password" style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc',
                                            fontSize: '14px',
                                        }}
                                            onChange={(e) => onPasswordChange(e, selectedUser)}></input>
                                    </>
                                ) : modelFrom === "User" ? (
                                    <>
                                        <p>User name : {selectedUser?.full_name}</p>
                                        <select
                                            id="roleSelect"
                                            name="role"
                                            onChange={onRoleChange} // Use the updated onRoleChange function
                                            style={{
                                                width: '100%',
                                                padding: '8px',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc',
                                                fontSize: '14px',
                                            }}
                                        >
                                            <option value="" hidden>Select a role</option>
                                            {roles?.map((role) => (
                                                <option key={role.id} value={role.id}>
                                                    {role.rolename}
                                                </option>
                                            ))}
                                        </select>
                                    </>
                                ) : modelFrom === "Filter" ? (
                                    <form className="filter-form" onSubmit={handleSubmit}>
                                        <label htmlFor="emailfilter">Email:</label>
                                        <input
                                            type="text"
                                            id="emailfilter"
                                            name="email"
                                            placeholder="Enter email"
                                            value={formValues.email}
                                            onChange={handleChange}
                                        />

                                        <label htmlFor="rolefilter">Role:</label>
                                        <input
                                            type="text"
                                            id="rolefilter"
                                            name="role"
                                            placeholder="Enter role"
                                            value={formValues.role}
                                            onChange={handleChange}
                                        />

                                        <label htmlFor="companyFilter">Company Name:</label>
                                        <input
                                            type="text"
                                            id="companyFilter"
                                            name="company_name"
                                            placeholder="Enter company name"
                                            value={formValues.company_name}
                                            onChange={handleChange}
                                        />
                                        <div className="d-flex gap-3 align-items-end">
                                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#135ae8", color: "#fff", width: '30%' }}>
                                                Submit
                                            </button>
                                            <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)} style={{ backgroundColor: "#135ae8", color: "#fff", width: '30%' }}>
                                                Close
                                            </button>
                                            <button type="button" className="btn btn-primary" onClick={handleReset} style={{ backgroundColor: "#135ae8", color: "#fff", width: '30%' }}
                                            >
                                                Reset
                                            </button>

                                        </div>
                                    </form>
                                ) : ''}
                            </Modal.Body>
                            <Modal.Footer>
                                {modelFrom === "Reset" ? (<Button
                                    variant="secondary"
                                    onClick={(e) => resetPassWord(e)}
                                    style={{
                                        backgroundColor: '#135ae8',
                                        borderColor: '#6c757d',
                                        color: '#fff',
                                    }}>
                                    Reset
                                </Button>) :
                                    modelFrom === "User" ? (
                                        <Button
                                            variant="secondary"
                                            onClick={(e) => submitEditedRole(userData)}
                                            style={{
                                                backgroundColor: '#135ae8',
                                                borderColor: '#6c757d',
                                                color: '#fff',
                                            }}>
                                            Submit
                                        </Button>
                                    ) : ''}
                                {modelFrom !== "Filter" ? (
                                    <Button
                                        variant="secondary"
                                        onClick={() => setShowModal(false)}
                                        style={{
                                            backgroundColor: '#6c757d',
                                            borderColor: '#6c757d',
                                            color: '#fff',
                                        }}>
                                        Close
                                    </Button>) : ''}
                            </Modal.Footer>
                        </Modal>
                    </>)
                    : ('')}
            </div></Container>
    )
}