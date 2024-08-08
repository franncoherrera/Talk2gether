import { ROUTES_PATH } from './routes';

export const PAGE_TOUR = {
  [ROUTES_PATH.MAIN_PAGE]: [
    {
      element: '#general-buttons',
      popover: {
        title: 'common.tour.#general-buttons.title',
        description: 'common.tour.#general-buttons.description',
      },
    },
    {
      element: '#general-buttons-filter',
      popover: {
        title: 'common.tour.#general-buttons-filter.title',
        description: 'common.tour.#general-buttons-filter.description',
      },
    },
    {
      element: '#general-buttons-create',
      popover: {
        title: 'common.tour.#general-buttons-create.title',
        description: 'common.tour.#general-buttons-create.description',
      },
    },
    {
      element: '#general-buttons-toggle',
      popover: {
        title: 'common.tour.#general-buttons-toggle.title',
        description: 'common.tour.#general-buttons-toggle.description',
      },
    },
    {
      element: '#general-buttons-search',
      popover: {
        title: 'common.tour.#general-buttons-search.title',
        description: 'common.tour.#general-buttons-search.description',
      },
    },
    {
      element: '#general-card-container',
      popover: {
        title: 'common.tour.#general-card-container.title',
        description: 'common.tour.#general-card-container.description',
      },
    },
    {
      element: '#general-card-star',
      popover: {
        title: 'common.tour.#general-card-star.title',
        description: 'common.tour.#general-card-star.description',
      },
    },
    {
      element: '#general-card-info',
      popover: {
        title: 'common.tour.#general-card-info.title',
        description: 'common.tour.#general-card-info.description',
      },
    },
    {
      element: '#general-card-message',
      popover: {
        title: 'common.tour.#general-card-message.title',
        description: 'common.tour.#general-card-message.description',
      },
    },
    {
      element: '#general-card-call',
      popover: {
        title: 'common.tour.#general-card-call.title',
        description: 'common.tour.#general-card-call.description',
      },
    },
  ],
  [ROUTES_PATH.CONFIG_PAGE]: [
    {
      element: '#configuration-field',
      popover: {
        title: 'common.configuration.#configuration-field.title',
        description: 'common.configuration.#configuration-field.description',
      },
    },
    {
      element: '#configuration-card',
      popover: {
        title: 'common.configuration.#configuration-card.title',
        description: 'common.configuration.#configuration-card.description',
      },
    },
    {
      element: '#configuration-edit-save',
      popover: {
        title: 'common.configuration.#configuration-edit-save.title',
        description:
          'common.configuration.#configuration-edit-save.description',
      },
    },
    {
      element: '#configuration-bloqued-user',
      popover: {
        title: 'common.configuration.#configuration-bloqued-user.title',
        description:
          'common.configuration.#configuration-bloqued-user.description',
      },
    },
    {
      element: '#configuration-button-pass',
      popover: {
        title: 'common.configuration.#configuration-button-pass.title',
        description:
          'common.configuration.#configuration-button-pass.description',
      },
    },
    {
      element: '#configuration-button-delete',
      popover: {
        title: 'common.configuration.#configuration-button-delete.title',
        description:
          'common.configuration.#configuration-button-delete.description',
      },
    },
  ],
};

export const ALLOW_PAGE = [ROUTES_PATH.MAIN_PAGE, ROUTES_PATH.CONFIG_PAGE];
