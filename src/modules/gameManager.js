import OtherAPIManager from "./OtherAPIManager";
import { apiKey } from "./apiKeys";

export default Object.create(OtherAPIManager, {
  get: {
    value: function(gameId) {
      return OtherAPIManager.getOne(
        `http://www.giantbomb.com/api/game/${gameId}/?format=json&api_key=${apiKey.apiGames}`,
      );
    }
  }
});
