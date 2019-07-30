

export default Object.create(null, {
  getAll: {
    value: function(element, remoteURL) {
      return fetch(`${remoteURL}/${element}`).then(response => response.json());
    }
  },
  getOne: {
    value: function(element, id, remoteURL) {
      return fetch(`${remoteURL}/${element}/${id}`).then(response =>
        response.json()
      );
    }
  },
  delete: {
    value: function(element, id, remoteURL) {
      return fetch(`${remoteURL}/${element}/${id}`, {
        method: "DELETE"
      });
    }
  },
  post: {
    value: function(element, object, remoteURL) {
      return fetch(`${remoteURL}/${element}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
      }).then(data => data.json());
    }
  },
  put: {
    value: function(element, editedObject, remoteURL) {
      return fetch(`${remoteURL}/${element}/${editedObject.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedObject)
      }).then(data => data.json());
    }
  }
});