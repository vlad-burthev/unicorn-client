import { useDispatch, useSelector } from "react-redux";
import { T_AppDispatch, T_RootState } from "../interfaces";

export const useAppDispatch = useDispatch.withTypes<T_AppDispatch>();
export const useAppSelector = useSelector.withTypes<T_RootState>();
