migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("84iiosla6amm9uq")

  collection.createRule = "@request.auth.role = \"full-admin\" || (@request.auth.role = \"local-admin\" && @request.auth.library = @request.data.library)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("84iiosla6amm9uq")

  collection.createRule = null

  return dao.saveCollection(collection)
})
