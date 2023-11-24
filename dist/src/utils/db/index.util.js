"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeQuery = void 0;
// Function to execute dynamic queries with a dynamic return type
function executeQuery(query) {
    return __awaiter(this, void 0, void 0, function* () {
        let client;
        try {
            // Acquire a connection from the pool
            client = yield pool.connect();
            // Perform the dynamic query with optional parameters
            const result = yield client.query(query.query, query.params);
            // Log the query result
            return { data: result.rows, error: null };
        }
        catch (error) {
            console.error('Error executing the query:', error);
            return { data: null, error };
        }
        finally {
            // Release the connection back to the pool
            if (client) {
                client.release();
            }
        }
    });
}
exports.executeQuery = executeQuery;
