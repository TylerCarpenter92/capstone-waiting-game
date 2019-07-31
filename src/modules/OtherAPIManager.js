export default Object.create(null, {
  getOne: {
    value: function(URL) {
      return fetch(`${URL}`).then(response => response.json())
    }
  }
})