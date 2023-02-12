import Band from './band';

class Bands {
  bands: Band[];
  constructor() {
    this.bands = [];
  }

  getBands() {
    return this.bands;
  }

  addBand(name: String) {
    let newBand = new Band(name);
    this.bands.push(newBand);
  }

  deleteBand(id: String) {
    this.bands = this.bands.filter((band) => band.id !== id);

    return this.bands;
  }

  voteBand(id: String) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.votes++;
      }
      return band;
    });
  }
}

export default Bands;
