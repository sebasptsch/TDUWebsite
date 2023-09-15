import { OpenAPI } from "tba-api-v3client-ts";

/**
 *  './services/DistrictService';
export { EventService } from './services/EventService';
export { ListService } from './services/ListService';
export { MatchService } from './services/MatchService';
export { TbaService } from './services/TbaService';
export { TeamService } from './services/TeamService';
 */

if (typeof process.env["TBA_KEY"] === "string") {
  OpenAPI.HEADERS = {
    "X-TBA-Auth-Key": process.env["TBA_KEY"],
  };
}