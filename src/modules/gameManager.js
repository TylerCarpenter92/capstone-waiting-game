import OtherAPIManager from "./OtherAPIManager";
import { apiKey } from "./apiKeys";

export default Object.create(OtherAPIManager, {
  get: {
    value: function(gameId) {
      return OtherAPIManager.getOne(
        `http://www.giantbomb.com/api/game/${gameId}/?format=json&api_key=${
          apiKey.apiGames
        }&field_list=genres,name,deck,description,image,id`
      );
    }
  },
  searchGame: {
    value: function(searchString, nmb) {
      return OtherAPIManager.getOne(
        `https://www.giantbomb.com/api/search/?api_key=${
          apiKey.apiGames
        }&page=${nmb}&format=json&resources=game&query=${searchString}`
      );
    }
  }
});
