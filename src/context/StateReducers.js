import ACTIONS from "./Actions";

export const initialState = {
  showAddProductModal: false,
  showEditProductModal: false,
  selectedProduct: {
    productName: "",
    price: "",
    category: "",
    availability: "",
    availableSince: new Date(),
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_ADD_PRODUCT_MODAL:
      return {
        ...state,
        showAddProductModal: action.payload,
      };
    case ACTIONS.TOGGLE_EDIT_PRODUCT_MODAL:
      return {
        ...state,
        showEditProductModal: action.payload,
      };

    case ACTIONS.SET_SELECTED_PRODUCTED:
      return {
        ...state,
        selectedProduct: action.payload,
        showEditProductModal: true,
      };

    case ACTIONS.RESET:
      return initialState;

    default:
      return state;
  }
};
