import OtherAPIManager from "./OtherAPIManager";
import { apiKey } from "./apiKeys";

export default Object.create(OtherAPIManager, {
  get: {
    value: function(gameId) {
      return OtherAPIManager.getOne(
        `http://www.giantbomb.com/api/game/${gameId}/?format=json&api_key=${
          apiKey.apiGames
        }`
      );
    }
  },
  getGameById: {
    value: function(gameId) {
      return OtherAPIManager.getOne(
        `https://www.giantbomb.com/api/games/?format=json&filter=id:${gameId}&api_key=${
          apiKey.apiGames
        }`
      );
    }
  },
  grabGames: {
    value: function() {
      return OtherAPIManager.getOne(
        `https://www.giantbomb.com/api/games/?format=json&api_key=${apiKey.apiGames}&filter=expected_release_year:2018`
      )
    }

  },
  searchGame: {
    value: function(searchString, nmb) {
      return OtherAPIManager.getOne(
        `https://www.giantbomb.com/api/search/?api_key=${
          apiKey.apiGames
        }&page=${nmb}&format=json&resources=game,concept&query=${searchString}`
      );
    }
  }
});


// &field_list=genres,name,deck,description,image,id