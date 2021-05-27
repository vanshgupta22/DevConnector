import axios from 'axios';

const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token; // sends every request with header x-auth-token and token
    }else{
        delete axios.defaults.headers.common['x-auth-token'] ;
        
    }
}
export default setAuthToken;