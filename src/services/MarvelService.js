
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

  getAllCharacters = async () => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    return res.data.results.map(this._transformCharater);
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharater(res.data.results[0]);
  }

  _transformCharater = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url
    }
  }
}

export default MarvelService;