function importAll(r) {
    let images = {};
    r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
export const images = importAll(require.context('../../resource/images/cards', false, /\.(png|jpe?g|svg)$/));
  