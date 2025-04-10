/**
 * The pagination for queries.
 */
export interface PaginationInterface {

	/**
	 * Amount of data objects to return.
	 */
	limit: number;

	/**
	 * Amount of data objects to skip.
	 */
	offset: number;

}