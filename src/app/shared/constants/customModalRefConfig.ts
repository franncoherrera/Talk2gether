import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

/**
 * Configuration options for the custom modal.
 *
 * This configuration is used to set the options for the modal, including
 * whether the backdrop should be static, whether the modal should be centered,
 * and whether the keyboard interactions are enabled.
 *
 * @constant
 * @type {NgbModalOptions}
 *
 * @property {string} backdrop - Defines the backdrop behavior. Set to 'static' to prevent closing the modal when clicking outside of it.
 * @property {boolean} centered - Determines if the modal should be centered on the screen. Set to `true` to center the modal.
 * @property {boolean} keyboard - Specifies whether keyboard interactions are enabled. Set to `false` to disable closing the modal with keyboard actions.
 */
export const CUSTOM_MODAL_CONFIG: NgbModalOptions = {
  backdrop: 'static',
  centered: true,
  keyboard: false,
};
