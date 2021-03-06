import APIManager from "../APIManager";

const remoteURL = "http://localhost:5002";

export default Object.create(APIManager, {
  get: {
    value: function(id) {
      return APIManager.getOne("list_games", id, remoteURL);
    }
  },
  getAll: {
    value: function(id) {
      return APIManager.getAll(`list_games?listId=${id}`, remoteURL);
    }
  },
  delete: {
    value: function(id) {
      return APIManager.delete("list_games", id, remoteURL);
    }
  },
  post: {
    value: function(newData) {
      return APIManager.post("list_games", newData, remoteURL);
    }
  },
  put: {
    value: function(editData) {
      return APIManager.put("list_games", editData, remoteURL);
    }
  }
});