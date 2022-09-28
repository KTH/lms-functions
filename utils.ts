import { XMLParser } from "fast-xml-parser";

export function getMembership(message:string): any{
  const parser = new XMLParser();
  const jsonObj = parser.parse(message);
  return  jsonObj?.["ns0:membershipRecord"]?.["ns0:membership"]; 
}
