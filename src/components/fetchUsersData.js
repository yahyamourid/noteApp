import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
const FetchUsersData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState(0);

  const fetchData = async () => {
    if (number === 0) {
      setUsers([]);
      setLoading(false);
    } else {
      setLoading(true);
      const rep = await fetch(`https://randomuser.me/api/?results=${number}`);
      const data = await rep.json();
      setUsers(data.results);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeNumber = (event) => {
    setNumber(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center  bg-cyan-500 ">
      <div className="flex my-10 items-center justify-center bg-gray-100 p-6 rounded-2xl w-1/8 text-cyan-500 font-semibold text-lg">
        <p>Choisir le nombre des personnes <input 
        className="text-cyan-500 w-16 rounded text-center outline-none mx-4"
        type='number' value={number} onChange={handleChangeNumber} /> </p>

        <button className="text-xl hover:scale-125" onClick={fetchData}>
          <FaSearch />
        </button>
      </div>

      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <div className=" bg-gray-100 flex flex-col  items-center rounded-2xl w-11/12 mx-10 min-h-screen mb-10 shadow px-4">
          {users.length > 0 ? (
            <>
              <h1 className="font-bold text-4xl pt-8 text-cyan-500">Users</h1>
              <div className="grid   2xl:grid-cols-5  md:grid-cols-2">
              {users.map((user, index) => (
                <div key={index} className="flex bg-white mx-3 my-5  py-3 shadow-lg shadow-gray-300 rounded-lg h-35">
                  <img src={user.picture.medium} alt="user" className="rounded-full pl-1 mr-3 w-18 h-18" />
                  <div className="flex flex-col justify-start ">
                  <p className="font-bold text-xl">{user.name.first} {user.name.last}</p>
                  <p className="pr-2 my-1 text-gray-500">{user.email}</p>
                  <p className="font-semibold text-gray-700 pr-1"><span className="text-cyan-500">{user.location.city} </span>{user.location.country}</p>
                  </div>
                
                  
                </div>
              ))}
              </div>
            </>
          ) : (
            <p>Aucun utilisateur trouvé.</p>
          )}
        </div>
      )}
    </div>
  );

}

export default FetchUsersData
