import APIManager from "../APIManager";

const remoteURL = "http://localhost:5002";

export default Object.create(APIManager, {
  get: {
    value: function(id) {
      return APIManager.getOne("lists", id, remoteURL);
    }
  },
  getAll: {
    value: function() {
      return APIManager.getAll("lists", remoteURL);
    }
  },
  delete: {
    value: function(id) {
      return APIManager.delete("lists", id, remoteURL);
    }
  },
  post: {
    value: function(newData) {
      return APIManager.post("lists", newData, remoteURL)
      .then(this.getAll)
    }
  },
  put: {
    value: function(editData) {
      return APIManager.put("lists", editData, remoteURL);
    }
  }
});
