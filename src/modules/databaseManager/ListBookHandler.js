import APIManager from "../APIManager";

const remoteURL = "http://localhost:5002";

export default Object.create(APIManager, {
  get: {
    value: function(id) {
      return APIManager.get("list_books", id, remoteURL);
    }
  },
  getAll: {
    value: function(id) {
      return APIManager.getAll(`list_books?listId=${id}`, remoteURL);
    }
  },
  delete: {
    value: function(id) {
      return APIManager.delete("list_books", id, remoteURL);
    }
  },
  post: {
    value: function(newData) {
      return APIManager.post("list_books", newData, remoteURL);
    }
  },
  put: {
    value: function(editData) {
      return APIManager.put("list_books", editData, remoteURL);
    }
  }
});