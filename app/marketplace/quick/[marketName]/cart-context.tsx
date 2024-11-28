"use client";
import React, {
  createContext,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { INFT } from "@/lib/api/use-market-nfts";
import { CartAction, CartReducer, ICartState } from "./cart-reducer";
import { cloneDeep } from "lodash";

export const CartContext = createContext<
  | ({
      removeProduct: (payload: INFT) => void;
      addProduct: (payload: INFT) => void;
      clearCart: () => void;
    } & ICartState)
  | undefined
>(undefined);

const DefaultCartState: ICartState = {
  cartItems: [],
  count: 0,
  total: "0",
} as const;

// function saveToStorage(
//   walletAddress: string,
//   marketName: string,
//   cartObj: ICartState,
// ) {
//   const cartStorage = localStorage.getItem(CART_KEY);
//   const cartStorageObj = cartStorage ? JSON.parse(cartStorage) : {};
//   const saveCart = {
//     ...cartStorageObj,
//     [walletAddress]: {
//       ...cartStorageObj[walletAddress],
//       [marketName]: cartObj,
//     },
//   };

//   localStorage.setItem(CART_KEY, JSON.stringify(saveCart));
// }

// function getFromStorage(
//   walletAddress: string | undefined,
//   marketName: string | undefined,
// ) {
//   if (!walletAddress || !marketName) return cloneDeep(DefaultCartState);

//   const cartStorage = localStorage.getItem(CART_KEY);
//   const cartStorageObj = cartStorage
//     ? JSON.parse(cartStorage)
//     : {
//         [walletAddress]: {
//           [marketName]: cloneDeep(DefaultCartState),
//         },
//       };
//   return (
//     cartStorageObj[walletAddress]?.[marketName] || cloneDeep(DefaultCartState)
//   );
// }

export const CartContextProvider = ({
  marketName,
  children,
}: {
  marketName: string;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    clearCart();
  }, [marketName]);

  const [state, dispatch] = useReducer<Reducer<ICartState, any>>(
    CartReducer,
    cloneDeep(DefaultCartState),
  );

  const addProduct = (payload: INFT) => {
    dispatch({ type: "ADD", payload } as CartAction);
  };

  const removeProduct = (payload: INFT) => {
    dispatch({ type: "REMOVE", payload } as CartAction);
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" } as CartAction);
  };

  const contextValues = {
    removeProduct,
    addProduct,
    clearCart,
    ...state,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export function useCartContext() {
  if (!CartContext) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }

  return useContext(CartContext);
}
