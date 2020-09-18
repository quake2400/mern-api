import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const TablaEmpresa = ({datos, updateReg, insertReg, deleteReg}) => {

    const [compania, setCompania] = useState({
        tipoModal: '',
        form: {
            id: null,
            nombre: null,
            pais: null,
            celular: null,
            direccion: null,
            creado: null,
            actualiza: null
        }
    });

    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);

    const seleccionarCompania = (data) => {

        setCompania({
            ...compania,
            tipoModal: 'actualizar',
            form:{
                id: data._id,
                nombre: data.nombre,
                pais: data.pais,
                celular: data.celular,
                direccion: data.direccion,
                creado: data.creado,
                actualiza: data.actualiza
            }
        })
    }

    const modalInsert = (modal) =>{
        setModalInsertar(!modal);
    }

    const handleChange=  e =>{
        e.persist();

        setCompania({
            ...compania,
            tipoModal: compania.tipoModal,
            form:{
                ...compania.form,
                [e.target.name]: e.target.value
            }
        }); 
    }

    const insertarRegitro = async () =>{
        
        insertReg(compania);

        setModalInsertar(false); 
    }

    const actualizarRegitro = async () =>{

        await updateReg(compania);

        setModalInsertar(false);  
    }

    const modalDelete = (modal) =>{
        setModalEliminar(!modal);
    }

    const eliminarRegistro = async () =>{

        await deleteReg(compania.form.id);

        setModalEliminar(false);  
    }

    return ( 
        <>
        <button 
            className="btn btn-success"
            onClick={()=>{setCompania({ ...compania, tipoModal: 'insertar', form: null}); modalInsert(modalInsertar)}}
        >Agregar Empresa</button>
        <br/> <br/>
        <table className="table ">
            <thead>
                <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>País</th>
                <th>Celular</th>
                <th>Direccion</th>
                <th>Creado</th>
                <th>Actualiza</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {
                datos && datos.map((empresa, index) =>(
                    <tr key={empresa._id}>
                        <td>{index + 1}</td>
                        <td>{empresa.nombre}</td>
                        <td>{empresa.pais}</td>
                        <td>{empresa.celular}</td>
                        <td>{empresa.direccion}</td>
                        <td>{empresa.creado}</td>
                        <td>{empresa.actualiza}</td>
                        <td>
                            <button 
                                className="btn btn-primary" 
                                onClick={() =>{seleccionarCompania(empresa); modalInsert(modalInsertar)}}
                            >
                                <FontAwesomeIcon icon={faEdit}/>
                            </button>
                            {"   "}
                            <button 
                                className="btn btn-danger" 
                                onClick={() =>{seleccionarCompania(empresa); modalDelete(modalEliminar)}}
                            ><FontAwesomeIcon icon={faTrashAlt}/></button>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>

        <Modal isOpen={modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>modalInsert(modalInsertar)}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="id" 
                        id="id" 
                        readOnly
                        onChange={handleChange}
                        value={compania.form? compania.form.id: null}
                    />
                    <br />
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="nombre" 
                        id="nombre" 
                        onChange={handleChange}
                        value={compania.form? compania.form.nombre: null}
                    />
                    <br />
                    <label htmlFor="pais">País</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="pais" 
                        id="pais" 
                        onChange={handleChange}
                        value={compania.form? compania.form.pais: null}
                    />
                    <br />
                    <label htmlFor="celular">Celular</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="celular" 
                        id="celular" 
                        onChange={handleChange}
                        value={compania.form? compania.form.celular: null}
                    />
                    <br />
                    <label htmlFor="direccion">Dirección</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="direccion" 
                        id="direccion" 
                        onChange={handleChange}
                        value={compania.form? compania.form.direccion: null}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                    {compania.tipoModal === 'insertar'? <button 
                        className="btn btn-primary"
                        onClick={()=>insertarRegitro()}>Insertar</button>
                        
                        :<button 
                        className="btn btn-primary"
                        onClick={()=>actualizarRegitro()}>Actualizar</button>
                    }
                        
                    <button className="btn btn-danger" onClick={()=>modalInsert(modalInsertar)}>Cancelar</button>

                </ModalFooter>
        </Modal>
        <Modal isOpen={modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar a la empresa {compania.form && compania.form.nombre}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>eliminarRegistro()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>modalDelete(modalEliminar)}>No</button>
            </ModalFooter>
        </Modal>
       </>
    );
}
 
export default TablaEmpresa;