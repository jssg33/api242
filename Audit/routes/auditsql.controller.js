// Audit/routes/auditsql.controller.js — port of auditsql.controller.cs's MapAuditSqlEndpoints, "/api/AuditSql".
// Seven CRUD resources under one group; nested child routes (e.g. "/Servers/:serverId/Tables") always have a
// different segment count than their resource's own "/:id" route, so there's no literal-vs-wildcard collision
// to order around here (unlike several other Audit routes).
const express = require("express");
const router = express.Router();
const { objectIdParam, numberParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/auditsql.controller");

router.param("id", objectIdParam);
router.param("serverId", numberParam);
router.param("tableId", numberParam);
router.param("principalId", numberParam);

const GROUP = "/api/AuditSql";

function resource(path, handlers, { nested } = {}) {
  router.get(secure(`/${path}`), fusionAuth, handlers.getAll);
  credentialHint(router, GROUP, "GET", `/${path}`);
  router.post(secure(`/${path}`), fusionAuth, handlers.create);
  credentialHint(router, GROUP, "POST", `/${path}`);
  router.get(secure(`/${path}/:id`), fusionAuth, handlers.getById);
  credentialHint(router, GROUP, "GET", `/${path}/:id`);
  router.put(secure(`/${path}/:id`), fusionAuth, handlers.update);
  credentialHint(router, GROUP, "PUT", `/${path}/:id`);
  router.delete(secure(`/${path}/:id`), fusionAuth, handlers.remove);
  credentialHint(router, GROUP, "DELETE", `/${path}/:id`);

  if (nested) {
    router.get(secure(nested.path), fusionAuth, nested.handler);
    credentialHint(router, GROUP, "GET", nested.path);
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     AuditSqlServer:
 *       type: object
 *       description: Full field list ported from Enterprise.Models.AuditSqlServer; see Audit/models/auditsqlserver.model.js.
 *       properties: { _id: { type: string }, serverName: { type: string }, databaseName: { type: string }, databaseType: { type: string }, active: { type: boolean } }
 *     AuditSqlTable:
 *       type: object
 *       description: Full field list ported from Enterprise.Models.AuditSqlTable; see Audit/models/auditsqltables.model.js.
 *       properties: { _id: { type: string }, sqlServerId: { type: number }, schemaName: { type: string }, tableName: { type: string } }
 *     AuditSqlField:
 *       type: object
 *       description: Full field list ported from Enterprise.Models.AuditSqlField; see Audit/models/auditsqlfields.model.js.
 *       properties: { _id: { type: string }, sqlTableId: { type: number }, columnName: { type: string }, dataType: { type: string } }
 *     AuditPrincipal:
 *       type: object
 *       properties: { _id: { type: string }, principalType: { type: string }, userName: { type: string }, displayName: { type: string }, active: { type: boolean } }
 *     AuditServerPermission:
 *       type: object
 *       properties: { _id: { type: string }, principalId: { type: number }, sqlServerId: { type: number }, permissionLevel: { type: string } }
 *     AuditTablePermission:
 *       type: object
 *       properties: { _id: { type: string }, principalId: { type: number }, sqlTableId: { type: number }, canSelect: { type: boolean }, canInsert: { type: boolean }, canUpdate: { type: boolean }, canDelete: { type: boolean } }
 *     AuditFieldPermission:
 *       type: object
 *       properties: { _id: { type: string }, principalId: { type: number }, sqlFieldId: { type: number }, canRead: { type: boolean }, canUpdate: { type: boolean }, canMask: { type: boolean }, canDecrypt: { type: boolean } }
 * /api/AuditSql/Servers/{apiusername}/{apipassword}/{token}:
 *   get: { summary: "Get all SQL servers (port of IAuditSqlServerService30.GetAll30)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 *   post: { summary: "Create a SQL server (port of IAuditSqlServerService30.Create30)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditSqlServer' } } } }, responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 * /api/AuditSql/Servers/{id}/{apiusername}/{apipassword}/{token}:
 *   get: { summary: "Get a SQL server by id (port of IAuditSqlServerService30.GetById30)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 *   put: { summary: "Update a SQL server (port of IAuditSqlServerService30.Update30)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditSqlServer' } } } }, responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 *   delete: { summary: "Delete a SQL server (port of IAuditSqlServerService30.Delete30)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 * /api/AuditSql/Tables/{apiusername}/{apipassword}/{token}:
 *   get: { summary: "Get all SQL tables (port of IAuditSqlTableService31.GetAll31)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 *   post: { summary: "Create a SQL table (port of IAuditSqlTableService31.Create31)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditSqlTable' } } } }, responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 * /api/AuditSql/Tables/{id}/{apiusername}/{apipassword}/{token}:
 *   get: { summary: "Get a SQL table by id (port of IAuditSqlTableService31.GetById31)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 *   put: { summary: "Update a SQL table (port of IAuditSqlTableService31.Update31)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditSqlTable' } } } }, responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 *   delete: { summary: "Delete a SQL table (port of IAuditSqlTableService31.Delete31)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 * /api/AuditSql/Servers/{serverId}/Tables/{apiusername}/{apipassword}/{token}:
 *   get: { summary: "Tables on one SQL server (port of IAuditSqlTableService31.GetByServer31)", tags: [AuditSql], parameters: [{ in: path, name: serverId, required: true, schema: { type: integer } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 * /api/AuditSql/Fields/{apiusername}/{apipassword}/{token}:
 *   get: { summary: "Get all SQL fields (port of IAuditSqlFieldService32.GetAll32)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 *   post: { summary: "Create a SQL field (port of IAuditSqlFieldService32.Create32)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditSqlField' } } } }, responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 * /api/AuditSql/Fields/{id}/{apiusername}/{apipassword}/{token}:
 *   get: { summary: "Get a SQL field by id (port of IAuditSqlFieldService32.GetById32)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 *   put: { summary: "Update a SQL field (port of IAuditSqlFieldService32.Update32)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditSqlField' } } } }, responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 *   delete: { summary: "Delete a SQL field (port of IAuditSqlFieldService32.Delete32)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 * /api/AuditSql/Tables/{tableId}/Fields/{apiusername}/{apipassword}/{token}:
 *   get: { summary: "Fields on one SQL table (port of IAuditSqlFieldService32.GetByTable32)", tags: [AuditSql], parameters: [{ in: path, name: tableId, required: true, schema: { type: integer } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 * /api/AuditSql/Principals/{apiusername}/{apipassword}/{token}:
 *   get: { summary: "Get all audit principals (port of IAuditPrincipalService33.GetAll33)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 *   post: { summary: "Create an audit principal (port of IAuditPrincipalService33.Create33)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditPrincipal' } } } }, responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 * /api/AuditSql/Principals/{id}/{apiusername}/{apipassword}/{token}:
 *   get: { summary: "Get an audit principal by id (port of IAuditPrincipalService33.GetById33)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 *   put: { summary: "Update an audit principal (port of IAuditPrincipalService33.Update33)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditPrincipal' } } } }, responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 *   delete: { summary: "Delete an audit principal (port of IAuditPrincipalService33.Delete33)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 * /api/AuditSql/ServerPermissions/{apiusername}/{apipassword}/{token}:
 *   get: { summary: "Get all server permissions (port of IAuditServerPermissionService34.GetAll34)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 *   post: { summary: "Create a server permission (port of IAuditServerPermissionService34.Create34)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditServerPermission' } } } }, responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 * /api/AuditSql/ServerPermissions/{id}/{apiusername}/{apipassword}/{token}:
 *   put: { summary: "Update a server permission (port of IAuditServerPermissionService34.Update34)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditServerPermission' } } } }, responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 *   delete: { summary: "Delete a server permission (port of IAuditServerPermissionService34.Delete34)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 * /api/AuditSql/Principals/{principalId}/ServerPermissions/{apiusername}/{apipassword}/{token}:
 *   get: { summary: "Server permissions for one principal (port of IAuditServerPermissionService34.GetByPrincipal34)", tags: [AuditSql], parameters: [{ in: path, name: principalId, required: true, schema: { type: integer } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 * /api/AuditSql/TablePermissions/{apiusername}/{apipassword}/{token}:
 *   get: { summary: "Get all table permissions (port of IAuditTablePermissionService35.GetAll35)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 *   post: { summary: "Create a table permission (port of IAuditTablePermissionService35.Create35)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditTablePermission' } } } }, responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 * /api/AuditSql/TablePermissions/{id}/{apiusername}/{apipassword}/{token}:
 *   put: { summary: "Update a table permission (port of IAuditTablePermissionService35.Update35)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditTablePermission' } } } }, responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 *   delete: { summary: "Delete a table permission (port of IAuditTablePermissionService35.Delete35)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 * /api/AuditSql/Principals/{principalId}/TablePermissions/{apiusername}/{apipassword}/{token}:
 *   get: { summary: "Table permissions for one principal (port of IAuditTablePermissionService35.GetByPrincipal35)", tags: [AuditSql], parameters: [{ in: path, name: principalId, required: true, schema: { type: integer } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 * /api/AuditSql/FieldPermissions/{apiusername}/{apipassword}/{token}:
 *   get: { summary: "Get all field permissions (port of IAuditFieldPermissionService36.GetAll36)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 *   post: { summary: "Create a field permission (port of IAuditFieldPermissionService36.Create36)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditFieldPermission' } } } }, responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 * /api/AuditSql/FieldPermissions/{id}/{apiusername}/{apipassword}/{token}:
 *   put: { summary: "Update a field permission (port of IAuditFieldPermissionService36.Update36)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditFieldPermission' } } } }, responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 *   delete: { summary: "Delete a field permission (port of IAuditFieldPermissionService36.Delete36)", tags: [AuditSql], parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 * /api/AuditSql/Principals/{principalId}/FieldPermissions/{apiusername}/{apipassword}/{token}:
 *   get: { summary: "Field permissions for one principal (port of IAuditFieldPermissionService36.GetByPrincipal36)", tags: [AuditSql], parameters: [{ in: path, name: principalId, required: true, schema: { type: integer } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken'], responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } } }
 */
resource("Servers", controller.servers, { nested: { path: "/Servers/:serverId/Tables", handler: controller.tables.getByServer } });
resource("Tables", controller.tables, { nested: { path: "/Tables/:tableId/Fields", handler: controller.fields.getByTable } });
resource("Fields", controller.fields);
resource("Principals", controller.principals);
resource("ServerPermissions", controller.serverPermissions, { nested: { path: "/Principals/:principalId/ServerPermissions", handler: controller.serverPermissions.getByPrincipal } });
resource("TablePermissions", controller.tablePermissions, { nested: { path: "/Principals/:principalId/TablePermissions", handler: controller.tablePermissions.getByPrincipal } });
resource("FieldPermissions", controller.fieldPermissions, { nested: { path: "/Principals/:principalId/FieldPermissions", handler: controller.fieldPermissions.getByPrincipal } });

module.exports = router;
