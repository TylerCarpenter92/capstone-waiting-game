import OtherAPIManager from "./OtherAPIManager";
import { apiKey } from "./apiKeys";

export default Object.create(OtherAPIManager, {
  getBook: {
    value: function(volumeId) {
      return OtherAPIManager.getOne(
        `https://www.googleapis.com/books/v1/volumes/${volumeId}?key=${apiKey.apiBooks}`
      );
    }
  },
  searchBooks: {
    value: function (searchTerm) {
      return OtherAPIManager.getOne(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey.apiBooks}`
      )
    }
  }
});