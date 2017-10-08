const USER_CONFIG_WILL_UPDATE = Symbol('USER_CONFIG_WILL_UPDATE');

/**
 * update action creator
 *
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.value
 */
export function update({ name, value }) {
  return {
    payload: {
      name,
      value,
    },
    type: USER_CONFIG_WILL_UPDATE,
  };
}

const initialState = {
  account: '',
  branch: '',
  path: '',
  repository: '',
  template: '',
};

/**
 * config reducer
 *
 * @param {Object} state
 * @param {Object} action
 */
export function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_CONFIG_WILL_UPDATE:
      return Object.assign({}, state, {
        [action.payload.name]: action.payload.value,
      });
    default:
      return state;
  }
}
