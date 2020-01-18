import axios from 'axios';

class Mobiles {
  static all() {
    return axios.get('http://mitraisserver-env.tecyp2skhk.us-east-2.elasticbeanstalk.com/mobiles').then(resp => resp.data);
  }
}

export default Mobiles;