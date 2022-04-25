
class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=5b25ac1acda703411c8d21f5cdae9352';
  getResource = async (url) => {
    let res = await fetch(url);

    if(!res.ok) {
      throw new Error(`Coould not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  getAllCharacters = () => {
    return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
  }

  getCharacters = (id) => {
    return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
}
}

export default MarvelService;
