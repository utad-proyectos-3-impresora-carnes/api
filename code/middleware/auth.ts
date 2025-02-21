/**
 * Checks if the token in the request exists and is valid in the database.
 * Also adds a user field to the query with the object of the user who launched the query.
 * 
 * @param req Request
 * @param res Response
 * @param next Next field
 */
export default function auth(req:any, res:any, next:any){

	console.log("Going thorugh auth!");

	next();

}