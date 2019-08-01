import APIManager from "../APIManager";

const remoteURL = "http://localhost:5002";

export default Object.create(APIManager, {
  get: {
    value: function(id) {
      return APIManager.getOne("users", id, remoteURL);
    }
  },
  getAll: {
    value: function() {
      return APIManager.getAll("users", remoteURL);
    }
  },
  delete: {
    value: function(id) {
      return APIManager.delete("users", id, remoteURL);
    }
  },
  post: {
    value: function(newData) {
      return APIManager.post("users", newData, remoteURL);
    }
  },
  put: {
    value: function(editData) {
      return APIManager.put("users", editData, remoteURL);
    }
  }
});
