import { v4 as uiddV4 } from 'uuid';

class Band {
  id?: String;
  name: String;
  votes?: number;
  constructor(name: String) {
    this.id = uiddV4();
    this.name = name;
    this.votes = 0;
  }
}

export default Band;
