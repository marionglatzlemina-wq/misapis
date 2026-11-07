
import Ejemplo from "../models/ejemplo.model.js";
import mongoose from "mongoose";

// GET: Obtener todos los ejemplos
export const getAllEjemplos = async (req, res) => {
    try {
        const ejemplos = await Ejemplo.find({}, { __v: 0 });

        if (ejemplos.length === 0) {
            return res.status(404).json({
                msg: "No se encontraron ejemplos"
            });
        }

        return res.status(200).json({
            ejemplos
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Error al obtener los ejemplos"
        });
    }
};

// GET: Obtener un ejemplo por ID
export const getEjemploById = async (req, res) => {
    const id = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "ID no valido"
            });
        }

        const ejemplo = await Ejemplo.findById(id, { __v: 0 });

        if (!ejemplo) {
            return res.status(404).json({
                msg: "Ejemplo no encontrado"
            });
        }

        return res.status(200).json({
            ejemplo
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Error al obtener el ejemplo"
        });
    }
};

// POST: Registrar un ejemplo
export const postEjemplo = async (req, res) => {
    try {
        const ejemplo = new Ejemplo(req.body);

        await ejemplo.save();

        return res.status(201).json({
            ejemplo
        });

    } catch (error) {
        console.error(error);

        if (error.name === "ValidationError") {
            const errorMessages = Object.values(error.errors)
                .map(error => error.message);

            return res.status(400).json({
                msg: errorMessages
            });
        }

        return res.status(500).json({
            msg: "Error al guardar el ejemplo"
        });
    }
};

// PUT: Actualizar un ejemplo
export const putEjemplo = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "ID no valido"
            });
        }

        const ejemplo = await Ejemplo.findByIdAndUpdate(
            id,
            body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!ejemplo) {
            return res.status(404).json({
                msg: "Ejemplo no encontrado"
            });
        }

        return res.status(200).json({
            ejemplo
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Error al actualizar el ejemplo"
        });
    }
};

// DELETE: Eliminar un ejemplo
export const deleteEjemplo = async (req, res) => {
    const id = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "ID no valido"
            });
        }

        const ejemplo = await Ejemplo.findByIdAndDelete(id);

        if (!ejemplo) {
            return res.status(404).json({
                msg: "Ejemplo no encontrado"
            });
        }

        return res.status(200).json({
            msg: "Ejemplo eliminado correctamente",
            ejemplo
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Error al eliminar el ejemplo"
        });
    }
};
