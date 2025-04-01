/**
 * States the validation process can have.
 */
export enum ValidationStates {

	/**
	 * No validated yet
	 */
	TO_VALIDATE = "to_valdiate",
	/**
	 * Validated
	 */
	VALIDATED = "valdiated",
	/**
	 * Rejected
	 */
	REJECTED = "rejected"
}