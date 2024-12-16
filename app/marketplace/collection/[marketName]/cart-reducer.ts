import { INFT } from "@/lib/api/use-market-nfts";
import { add } from "safebase";

// export const CART_KEY = "cart";

export interface ICartState {
  cartItems: INFT[];
  count: number;
  total: string;
}

export type CartAction = {
  type: "ADD" | "REMOVE" | "CLEAR";
  payload: INFT;
};

const sumItems = (cartItems: INFT[]) => {
  const count = cartItems?.length || 0;
  const total = cartItems.reduce(
    (total, product) => add(total, product.price),
    "0",
  );
  return { count, total };
};

export function checkIsExist(cartItems: INFT[] | undefined, id: string) {
  if (!cartItems) return false;
  return cartItems.find((item) => item.token_id === id);
}

export const CartReducer = (state: ICartState, action: CartAction) => {
  switch (action.type) {
    case "ADD": {
      const newCartItems = checkIsExist(
        state.cartItems,
        action.payload.token_id,
      )
        ? state.cartItems
        : [...state.cartItems, action.payload];

      const { count, total } = sumItems(newCartItems);

      return {
        ...state,
        cartItems: newCartItems,
        count,
        total,
      };
    }

    case "REMOVE": {
      const newCartItems = state.cartItems.filter(
        (item) => item.token_id !== action.payload.token_id,
      );
      const { count, total } = sumItems(newCartItems);

      return {
        ...state,
        cartItems: newCartItems,
        count,
        total,
      };
    }

    case "CLEAR": {
      return {
        cartItems: [],
        ...sumItems([]),
      };
    }

    default:
      return state;
  }
};
