import {db} from './firebaseConfig';
import {collection, getDoc, getDocs} from 'firebase/firestore';

export const getProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    } catch (error) {
        throw new Error('Error al obtener los productos' + error.message);
    }
}