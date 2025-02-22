/**
 * Checks if the token in the request exists and is valid in the database.
 * Also adds a user field to the query with the object of the user who launched the query.
 * 
 * @param req Request
 * @param res Response
 * @param next Next field
 */
export default function auth(req:any, res:any, next:any){

	const token = req.header('Authorization');
	if (!token) return res.status(401).json({ error: 'Access denied' });
	try {
	 const decoded = jwt.verify(token, 'your-secret-key');
	 req.userId = decoded.userId;
	 next();
	 } catch (error) {
	 res.status(401).json({ error: 'Invalid token' });
	 }

}