import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true,
        minlength: 2
    },

    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        trim: true
    },

    precioVenta: {
        type: Number,
        required: [true, 'El precio de venta es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },

    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        min: [0, 'El stock no puede ser negativo'],
        validate: {
            validator: Number.isInteger,
            message: 'El stock debe ser un número entero'
        }
    },

    marca: {
        type: String,
        default: 'Sin marca',
        trim: true
    },

    descripcion: {
        type: String,
        trim: true,
        maxlength: 200
    },

    stockMinimo: {
        type: Number,
        default: 5,
        min: 0
    },

    activo: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

const Producto = mongoose.model('Producto', productoSchema);

export default Producto;