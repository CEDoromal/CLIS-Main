migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i28rf02qcw4gyez")

  collection.createRule = "@request.auth.role = \"full-admin\" || @request.auth.role = \"local-admin\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i28rf02qcw4gyez")

  collection.createRule = null

  return dao.saveCollection(collection)
})
