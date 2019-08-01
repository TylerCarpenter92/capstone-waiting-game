import APIManager from "../APIManager";

const remoteURL = "http://localhost:5002";

export default Object.create(APIManager, {
  get: {
    value: function(id) {
      return APIManager.getOne("list_movies", id, remoteURL);
    }
  },
  getAll: {
    value: function(id) {
      return APIManager.getAll(`list_movies?listId=${id}`, remoteURL);
    }
  },
  delete: {
    value: function(id) {
      return APIManager.delete("list_movies", id, remoteURL);
    }
  },
  post: {
    value: function(newData) {
      return APIManager.post("list_movies", newData, remoteURL);
    }
  },
  put: {
    value: function(editData) {
      return APIManager.put("list_movies", editData, remoteURL);
    }
  }
});