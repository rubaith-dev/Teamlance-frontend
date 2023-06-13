import ACTIONS from "./Actions";

export const initialState = {
  showAddProductModal: false,
  showDeleteModal: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_ADD_PRODUCT_MODAL:
      return {
        ...state,
        showAddProductModal: action.payload,
      };
    case ACTIONS.TOGGLE_SIGNUP_MODAL:
      return {
        ...state,
        showDeleteModal: action.payload,
      };

    default:
      return state;
  }
};


