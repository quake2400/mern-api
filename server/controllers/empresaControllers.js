const Empresa = require('../models/empresa');

exports.nuevaEmpresa = async (req, res) => {

    const empresa = new Empresa(req.body);
    try {
        await empresa.save();
        res.json({msg: 'Empresa registrada correctamente'});
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: error});
    }
}

exports.allEmpresas = async (req, res) => {
    try {
        const empresa = await Empresa.find({});
        res.json({empresa});
    } catch (error) {
        console.log(error);
    }
}

exports.actualizarEmpresa = async(req, res) => {

    const { nombre, pais, celular, direccion } = req.body;

    try {
    
        let empresa = await Empresa.findById(req.params.id);

        if(!empresa) {
            return res.status(404).json({msg: 'La empresa no existe'});
        }
        
        const nuevaEmpresa = {};
        nuevaEmpresa.nombre = nombre;
        nuevaEmpresa.pais = pais;
        nuevaEmpresa.celular = celular;
        nuevaEmpresa.direccion = direccion;

        actualiza = await Empresa.findOneAndUpdate({_id : req.params.id }, nuevaEmpresa, { new: true } );

         res.json({ actualiza });
    
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: error});
    }

}

exports.deleteEmpresa = async(req, res) => {
    try {
        
        let empresa = await Empresa.findById(req.params.id);

        if(!empresa){
            return res.status(404).json({msg: 'No existe la empresa'});
        }

        await Empresa.findByIdAndRemove({_id: req.params.id});

        res.json({msg: 'Empresa Eliminada'});
        
    } catch (error) {
        console.log(error);
    }
}