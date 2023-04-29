migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2okg8shpc8qjb27")

  collection.indexes = []

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2okg8shpc8qjb27")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_V2gAobP` ON `library` (`name`)"
  ]

  return dao.saveCollection(collection)
})
