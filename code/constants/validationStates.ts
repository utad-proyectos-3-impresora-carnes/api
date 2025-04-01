/**
 * States the validation process can have.
 */
export enum ValidationStates {

	/**
	 * No validated yet
	 */
	TO_VALIDATE = "to_validate",
	/**
	 * Validated
	 */
	VALIDATED = "validated",
	/**
	 * Rejected
	 */
	REJECTED = "rejected"
}