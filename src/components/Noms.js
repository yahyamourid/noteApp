import React, { useState } from 'react';
import { FaTrash , FaPen} from "react-icons/fa";
const Noms = () => {
  const initialNoms = [
    { id: 1, nom: 'yahya' },
    { id: 2, nom: 'ibrahim' }
  ];

  const [noms, setNoms] = useState(initialNoms);
  const [nom, setNom] = useState('');
  const [modeAjout, setModeAjout] = useState(true);
  const [idModif, setIdModif] = useState(null);

  const handleInputNom = (event) => {
    setNom(event.target.value);
  };

  const ajouterNom = () => {
    if (nom.trim() !== '') {
      const newNom = { id: noms.length + 1, nom };
      setNoms((prevState) => [...prevState, newNom]);
      setNom('');
    }
  };

  const supprimerNom = (id) => {
    setNoms((prevState) => prevState.filter((n) => n.id !== id));
    setNom('')
    setModeAjout(true)
  };

  const modifierButton = (id) => {
    const nomAvantModif = noms.find(item => item.id === id).nom;
    setNom(nomAvantModif);
    setModeAjout(false);
    setIdModif(id);
  };

  const modifierNom = () => {
    if (idModif === null) return;

    setNoms((prevState) =>
      prevState.map((n) =>
        n.id === idModif ? { ...n, nom } : n
      )
    );

    setIdModif(null);
    setModeAjout(true);
    setNom('');
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-20 bg-gray-200'>
      <div className='w-2/5'>
        <ul className='flex flex-col  '>
          {noms.map((n) => (
            <li key={n.id} className='flex justify-between items-center bg-white my-5 mx-3  p-4 rounded-lg shadow-lg'>
              <div className='font-semibold text-xl'>{n.nom}</div>
              <div className="">
                <button className="mr-4 bg-sky-500  text-white text-xl p-3 rounded-xl font-medium hover:text-sky-500 hover:bg-white " onClick={() => modifierButton(n.id)}>
                <FaPen/>
                </button>
                <button className="bg-red-500 p-3  text-white rounded-xl font-medium text-xl hover:text-red-500 hover:bg-white" onClick={() => supprimerNom(n.id)}>
                < FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex mt-6 w-1/5 justify-center'>
        <input
        className='p-3 rounded-md outline-none '
          type='text'
          value={nom}
          placeholder='Entrer un nom'
          onChange={handleInputNom}
        />
        {modeAjout ? (
          <button className='ml-4 bg-green-500 text-base font-medium text-white rounded-xl p-4 hover:bg-green-700 hover:rounded-2xl' onClick={ajouterNom}>Ajouter</button>
        ) : (
          <button className='ml-4 bg-sky-500 text-base font-medium text-white rounded-xl p-4 hover:bg-sky-700 hover:rounded-2xl'  onClick={modifierNom}>Modifier</button>
        )}
      </div>
    </div>
    

  );
};

export default Noms;
