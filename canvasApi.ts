import CanvasApi from "@kth/canvas-api";

import { Context } from "@azure/functions"
import assert from "assert";

let _canvasApi: CanvasApi;
function getCanvasApi(){
  if (!process.env.CANVAS_API_URL) {
    throw new Error("Missing env-var CANVAS_API_URL");
  }
  _canvasApi = _canvasApi || new CanvasApi(
    process.env.CANVAS_API_URL,
    process.env.CANVAS_API_ADMIN_TOKEN
  );
  return _canvasApi
}

export async function sendEnrollments(filePath: string){
  return getCanvasApi().sisImport(filePath)
}

