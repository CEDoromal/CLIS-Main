migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("84iiosla6amm9uq")

  collection.updateRule = "@request.auth.role = \"full-admin\" || (@request.auth.role = \"local-admin\" && @request.auth.library = @request.data.library)"
  collection.deleteRule = "@request.auth.role = \"full-admin\" || (@request.auth.role = \"local-admin\" && @request.auth.library = @request.data.library)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("84iiosla6amm9uq")

  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
