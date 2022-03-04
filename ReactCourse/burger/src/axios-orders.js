import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'https://udemy-react-burger-ea0ed.firebaseio.com/'
});


export default instance;