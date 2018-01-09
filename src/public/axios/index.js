import axios from 'axios';
// here, you can config the axios
axios.defaults.baseURL = "http://192.168.74.166:8160/";
axios.create({
  timeout: 5000
});

export default axios;