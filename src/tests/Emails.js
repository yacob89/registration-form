import axios from 'axios';

class Emails {
  static all() {
    return axios.get('http://mitraisserver-env.tecyp2skhk.us-east-2.elasticbeanstalk.com/emails').then(resp => resp.data);
  }
}

export default Emails;