import React from 'react'
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstName2, setFirstName2] = useState('')
    const [lastName2, setLastName2] = useState('')
    const [userId, setUserId] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState([])

    //Get all users
    const fetchUsers = async () => {
        const rep = await fetch('http://localhost:3001/user')
        const data = await rep.json()
        setUsers(data)
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    //Add user
    const addUser = async () => {
        const requestOption = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "firstName": firstName,
                "lastName": lastName
            })
        }
        const res = await fetch('http://localhost:3001/user', requestOption)
        if (res.ok) {
            setFirstName('')
            setLastName('')
            fetchUsers()
        }
    }

    //Update user
    const updateUser = async () => {
        const requestOption = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "firstName": firstName2,
                "lastName": lastName2
            })
        }
        const rep = await fetch(`http://localhost:3001/user/${userId}`,requestOption)
        if (rep.ok) {
            fetchUsers()
            closeModal()
        }
    }

    //Delete user 
    const deleteUser = async (id) => {
        const requestOption = {
            method: "DELETE"
        }
        const rep = await fetch(`http://localhost:3001/user/${id}`, requestOption)
        console.log(await rep.json())
        if (rep.ok) {
            fetchUsers()
        }
    }
    const selectUser = (id, fn, ln) => {
        setUserId(id)
        setFirstName2(fn)
        setLastName2(ln)
        openModal()
        console.log(selectedUser)
    }

    //handle input
    const handleInputFirst = (event) => {
        setFirstName(event.target.value)
    }
    const handleInputLast = (event) => {
        setLastName(event.target.value)
    }
    const handleInputFirst2 = (event) => {
        setFirstName2(event.target.value)
    }
    const handleInputLast2 = (event) => {
        setLastName2(event.target.value)
    }

    //Handle modal
    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div>
            {users.map((user, index) => (
                <p>{user.firstName}    ****
                    <button onClick={() => deleteUser(user._id)}>delete </button>****
                    <button onClick={() => selectUser(user._id, user.firstName, user.lastName)}>  edit</button>

                </p>
            ))
            }
            <input value={firstName} placeholder='FirstName' onChange={handleInputFirst} />
            <input value={lastName} placeholder='LastName' onChange={handleInputLast} />
            <button onClick={addUser}>
                ajouter
            </button>

            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                >
                    <button onClick={closeModal}>close</button>
                    <input value={firstName2} onChange={handleInputFirst2} />
                    <input value={lastName2} onChange={handleInputLast2} />
                    <button onClick={() => updateUser()}> edit</button>
                </Modal>
            </div>
        </div>
    )
}

export default UsersTable
