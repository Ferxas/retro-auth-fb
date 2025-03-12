import {db} from './firebaseConfig'
import {collection, addDoc, serverTimestamp} from 'firebase/firestore'

export const createOrder = async (userId, cart, total) => {
    try {
        const orderRef = collection(db, "orders");
        const newOrder = {
            userId,
            products: cart.map(({id, name, price, quantity}) => ({ id, name, price, quantity })), total, date: serverTimestamp(), status: "pendiente",
        };
        const docRef = await addDoc(orderRef, newOrder);
        return docRef.id;
    } catch (error) {
        throw new Error("Error al crear la orden:", error.message);
    }
}