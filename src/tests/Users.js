import axios from 'axios';

class Users {
  static all() {
    return axios.get('http://mitraisserver-env.tecyp2skhk.us-east-2.elasticbeanstalk.com/users').then(resp => resp.data);
  }
}

export default Users;