import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

//components
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";

const CheckoutButton: React.FC = () => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  // /detail/2342342 - pathname
  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button className="bg-orange-500 flex-1" onClick={onLogin}>
        Войдите, чтобы оформить заказ
      </Button>
    );
  }

  if (isAuthLoading) {
    return <LoadingButton />;
  }
};

export default CheckoutButton;
