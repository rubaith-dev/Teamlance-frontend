import ACTIONS from "./Actions";

export const initialState = {
  showAddProductModal: false,
  showEditProductModal: false,
  showManageCategoryModal: false,
  showSigninOption: true,
  userInfo: null,
  selectedDeleteProductsId: new Set(),
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
        selectedProduct: initialState.selectedProduct
      };
    case ACTIONS.TOGGLE_EDIT_PRODUCT_MODAL:
      return {
        ...state,
        showEditProductModal: action.payload,
        selectedProduct: initialState.selectedProduct,
      };

    case ACTIONS.TOGGLE_MANAGE_CATEGORY_MODAL:
      return {
        ...state,
        showManageCategoryModal: action.payload,
      };

    case ACTIONS.TOGGLE_AUTH_MODAL:
      return {
        ...state,
        showSigninOption: action.payload,
      };

    case ACTIONS.SET_SELECTED_PRODUCTED:
      return {
        ...state,
        selectedProduct: action.payload,
        showEditProductModal: true,
      };

    case ACTIONS.SET_DELETED_PRODUCT_ID:
      const productId = action.payload;
      const updatedSelectedProductsId = new Set(state.selectedDeleteProductsId);

      if (updatedSelectedProductsId.has(productId)) {
        updatedSelectedProductsId.delete(productId);
      } else {
        updatedSelectedProductsId.add(productId);
      }

      return {
        ...state,
        selectedDeleteProductsId: updatedSelectedProductsId,
      };

    case ACTIONS.SELECT_ALL_PRODUCTS_ID:
      const allProductIds = action.payload;
      return {
        ...state,
        selectedDeleteProductsId: new Set(allProductIds),
      };

    case ACTIONS.CLEAR_SELECTED_PRODUCTS:
      return {
        ...state,
        selectedDeleteProductsId: new Set(),
      };

    case ACTIONS.SET_USER_INFO:
      return { ...state, userInfo: action.payload };

    case ACTIONS.RESET:
      return initialState;

    default:
      return state;
  }
};
