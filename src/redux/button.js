const APP_DISABLE_REVERT_BUTTON = Symbol('APP_DISABLE_REVERT_BUTTON'),
      APP_ENABLE_REVERT_BUTTON = Symbol('APP_ENABLE_REVERT_BUTTON');

const APP_DISABLE_SAVE_BUTTON = Symbol('APP_DISABLE_SAVE_BUTTON'),
      APP_ENABLE_SAVE_BUTTON = Symbol('APP_ENABLE_SAVE_BUTTON');

export function disableRevertButton() {
  return { type: APP_DISABLE_REVERT_BUTTON };
}

export function enableRevertButton() {
  return { type: APP_ENABLE_REVERT_BUTTON };
}

export function disableSaveButton() {
  return { type: APP_DISABLE_SAVE_BUTTON };
}

export function enableSaveButton() {
  return { type: APP_ENABLE_SAVE_BUTTON };
}

const initialState = {
  disableRevert: false,
  disableSave: false,
};

/**
 *  reducer
 *
 * @param {Object} state
 * @param {Object} action
 */
export function reducer(state = initialState, action) {
  switch (action.type) {
    case APP_DISABLE_REVERT_BUTTON:
      return Object.assign({}, state, { disableRevert: true });
    case APP_ENABLE_REVERT_BUTTON:
      return Object.assign({}, state, { disableRevert: false });
    case APP_DISABLE_SAVE_BUTTON:
      return Object.assign({}, state, { disableSave: true });
    case APP_ENABLE_SAVE_BUTTON:
      return Object.assign({}, state, { disableSave: false });
    default:
      return state;
  }
}
