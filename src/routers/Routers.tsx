import { lazy, type FC, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
//components

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const Layout = lazy(() => import("../layout/Layout"));
const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage"));
const RegistrationPage = lazy(
  () => import("../pages/RegistrationPage/RegistrationPage")
);
const ElectricityProvidersPage = lazy(
  () => import("../pages/ElectricityProvidersPage/ElectricityProvidersPage")
);

//hooks
import { useAppSelector } from "../hooks/storeHooks";
import GetProviderPage from "../pages/ElectricityProvidersPage/pages/GetProviderPage/GetProviderPage";
import CreateProviderPage from "../pages/ElectricityProvidersPage/pages/CreateProviderPage/CreateProviderPage";

interface RoutersProps {}

const Routers: FC<RoutersProps> = () => {
  const { isLogin } = useAppSelector((state) => state.user);
  return (
    <Suspense fallback={false}>
      <Routes>
        {isLogin ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="electricity_providers"
              element={<ElectricityProvidersPage />}
            >
              <Route index element={<GetProviderPage />} />
              <Route path="create" element={<CreateProviderPage />} />
            </Route>
          </Route>
        ) : (
          <>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
          </>
        )}
      </Routes>
    </Suspense>
  );
};

export default Routers;
