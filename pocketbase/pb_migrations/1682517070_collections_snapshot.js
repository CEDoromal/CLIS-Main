migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2023-04-24 20:35:16.967Z",
      "updated": "2023-04-26 11:05:58.735Z",
      "name": "account",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
          "name": "name",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "h8awnbxu",
          "name": "library",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "2okg8shpc8qjb27",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "vqfymeqs",
          "name": "role",
          "type": "select",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "full-admin",
              "region-admin",
              "local-admin",
              "initializer"
            ]
          }
        }
      ],
      "indexes": [],
      "listRule": "@request.auth.role = \"initializer\" || @request.auth.id = id",
      "viewRule": "@request.auth.id = id",
      "createRule": "@request.auth.role = \"initializer\"",
      "updateRule": "@request.auth.role = id",
      "deleteRule": "@request.auth.id = id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "requireEmail": false
      }
    },
    {
      "id": "2okg8shpc8qjb27",
      "created": "2023-04-24 20:49:25.088Z",
      "updated": "2023-04-26 11:05:58.738Z",
      "name": "library",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "ss6emoae",
          "name": "name",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "qihr0bdi",
          "name": "region",
          "type": "select",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "Region I - Ilocos Region",
              "Region II - Cagayan Valley",
              "Region III - Central Luzon",
              "Region IV-A - CALABARZON",
              "MIMAROPA Region",
              "Region V - Bicol Region",
              "Region VI - Western Visayas",
              "Region VII - Central Visayas",
              "Region VIII - Eastern Visayas",
              "Region IX - Zamboanga Peninsula",
              "Region X - Northern Mindanao",
              "Region XI - Davao Region",
              "Region XII - SOCCSKSARGEN",
              "Region XIII - Caraga",
              "NCR - National Capital Region",
              "CAR - Cordillera Administrative Region",
              "BARMM - Bangsamoro Autonomous Region in Muslim Mindanao"
            ]
          }
        },
        {
          "system": false,
          "id": "a2bbm2px",
          "name": "province",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "fjutdjee",
          "name": "city",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "tmjbenzx",
          "name": "barangay",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_V2gAobP` ON `library` (`name`)"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.role = \"full-admin\" || @request.auth.role = \"initializer\"",
      "updateRule": "@request.auth.role = \"full-admin\"",
      "deleteRule": "@request.auth.role = \"full-admin\"",
      "options": {}
    },
    {
      "id": "i28rf02qcw4gyez",
      "created": "2023-04-24 20:56:18.766Z",
      "updated": "2023-04-26 11:05:58.738Z",
      "name": "book",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "y3hteuwn",
          "name": "title",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "niryux9h",
          "name": "author1",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "sjsjbi1e",
          "name": "author2",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "2gvoa3iu",
          "name": "author3",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "zxigokrc",
          "name": "edition",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "vk2fwxu6",
          "name": "publication_date",
          "type": "date",
          "required": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "31u6qg6q",
          "name": "publishing_company",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.role = \"full-admin\"",
      "updateRule": "@request.auth.role = \"full-admin\"",
      "deleteRule": "@request.auth.role = \"full-admin\"",
      "options": {}
    },
    {
      "id": "84iiosla6amm9uq",
      "created": "2023-04-24 20:58:40.582Z",
      "updated": "2023-04-26 11:05:58.738Z",
      "name": "book_catalog",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "zje4azri",
          "name": "book_number",
          "type": "number",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null
          }
        },
        {
          "system": false,
          "id": "nxztohn1",
          "name": "library",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "2okg8shpc8qjb27",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "0kws1eob",
          "name": "book",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "i28rf02qcw4gyez",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_T0beWJr` ON `book_catalog` (\n  `book_number`,\n  `library`\n)"
      ],
      "listRule": null,
      "viewRule": null,
      "createRule": "@request.auth.role = \"full-admin\"",
      "updateRule": "@request.auth.role = \"full-admin\"",
      "deleteRule": "@request.auth.role = \"full-admin\"",
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
