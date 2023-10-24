import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import adresseIp from './constantes/AdresseIp';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const validationSchema = Yup.object().shape({
    titre: Yup.string().required("le titre est obligatoire"),
  });
  const initialValues = {
    titre: "",
    etattache: true,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: inserttache,
    // validate,
    validationSchema
  });

 
  function inserttache() {
    axios.post("http://localhost:5000/api/postAddtache", {
      titre,
      etattache,
    }).then((Response) => {

      if (Response.status === 200) {
       toast.success("La tache est ajoutée")
        Afficher()
      } else {
        toast.error("erreur d'enregistrement")
      }
    })
  }

  function modiftache(Tacheid) {
    axios.put(`${adresseIp}/api/putModifTache/${Tacheid}`, {
      etattache: false
    }).then((response) => {
      if (!response.status === 200) {
        toast.error("erreur de Modification");
       } else {
         toast.success('Fait')
         Afficher()
       }
    }).catch((err) => {
       console.log("pas de reponse")
   });
  }
  function annultache(Tacheid) {
    axios.put(`${adresseIp}/api/putModifTache/${Tacheid}`, {
      etattache: true
    }).then((response) => {
      if (!response.status === 200) {
        toast.error("erreur de Modification");
       } else {
         toast.success('Annulé')
         Afficher()
       }
    }).catch((err) => {
       console.log("pas de reponse")
   });
  }
  const { titre, etattache } = formik.values;

  useEffect(() => {
    Afficher()

  }, []);

  async function removeTache(Tacheid){
    axios.delete(`${adresseIp}/api/delSupprTache/${parseInt(Tacheid)}`)
    .then((Response) => {
      if (!Response.status === 200) {
        toast.error("erreur de Suppression");
       } else {
         toast.success("Tache supprimée");
         Afficher()
       }
    });
  
  };
  
  const [DataTache, setDataTache] = useState()
  async function Afficher() {
    axios.get("http://localhost:5000/api/getAlltache")
      .then((Response) => {
        setDataTache(Response.data)
        formik.values.titre = ""
      })
  }
  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-200 font-sans">
     
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <form onSubmit={formik.handleSubmit}>
            <div className="flex mt-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Ajouter une nouvelle tâche"
                id="titre"
                name='titre'
                type="text"
                value={titre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <button type="submit" className="flex-no-shrink p-2 border-2 rounded text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500">
                Ajouter
              </button>
            </div>
            {formik.errors.titre && formik.touched.titre && <span className='text-red-700'>{formik.errors.titre}</span>}
            </form>
          </div>

          <div>

            {
              DataTache ?
                DataTache.map((item, index) => {

                  return (
                    <div key={item.idtache} className="flex mb-4 items-center">
                      {
                        (item.etattache === 0 ?
                   <>
                   <p className="w-full line-through text-grey-darkest">
                        {item.titre}
                      </p>
                      <button onClick={()=>{
                        annultache(item.idtache)
                      }}  className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-500 border-gray-500 hover:bg-gray-500">
          Annuler
        </button>
                   </>
                         :
                        <>
                        <p className="w-full text-grey-darkest">
                        {item.titre}
                      </p>
                      <button onClick={()=>{
                        modiftache(item.idtache)
                      }} className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green hover:bg-green-500">
                        Fait
                      </button>
                        </>
                      
                      )
                      }
                      
                      <button onClick={()=>{removeTache(item.idtache)}} className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red hover:text-white hover:bg-red-500">
                        Supprimer
                      </button>
                    </div>
                  )
                })
                :
                <p>Aucune tache disponible</p>
            }

            {/* <div className="flex mb-4 items-center">
        <p className="w-full line-through text-green-500">
        Tâche 2
        </p>
        <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-500 border-gray-500 hover:bg-gray-500">
          Annuler
        </button>
        <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500">
        Supprimer
        </button>
      </div> */}
          </div>
        </div>
      
      <ToastContainer />
    </div>

  );
}

export default App;
