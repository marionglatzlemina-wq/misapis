
import mongoose from 'mongoose';

let isConected = false;

const conectarMongoDB = async () => {
    if (isConected) {
        console.log('Ya estamos conectados'.green);
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);

        isConected = true;
        console.log('Conectado a MongoDB'.green);

    } catch (error) {
        isConected = false;
        console.error('Error al conectar a MongoDB:', error);
        throw error;
    }
};

const desconectarMongoDB = async () => {
    try {
        await mongoose.connection.close();
        isConected = false;
        console.log('Conexión a MongoDB cerrada'.yellow);

    } catch (error) {
        console.error('Error al cerrar MongoDB:', error);
        throw error;
    }
};

const db = mongoose.connection;

db.on('error', (error) => {
    isConected = false;
    console.error('Error de conexión:', error);
});

db.once('open', () => {
    isConected = true;
});

db.on('disconnected', () => {
    isConected = false;
    console.log('Desconectado de MongoDB'.yellow);
});

export {
    conectarMongoDB,
    desconectarMongoDB,
    isConected
};
