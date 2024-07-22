import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

//components
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  UserFormData,
  UserProfileForm,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

// types
type TProps = {
  onCheckout: (UserFormData: UserFormData) => void;
  disabled: boolean;
};

const CheckoutButton: React.FC<TProps> = ({ onCheckout, disabled }) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  // /detail/2342342 - pathname
  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <Button className="bg-orange-500 flex-1" onClick={onLogin}>
        Войдите, чтобы оформить заказ
      </Button>
    );
  }

  if (isAuthLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 flex-1">
          Перейти к оформлению заказа
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[425px] md:min-w-[700px] bg-gray-50"
        aria-labelledby="dialog-title"
      >
        <DialogHeader>
          {/* <DialogTitle>Перейти к оформлению заказа</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}

          <UserProfileForm
            currentUser={currentUser}
            onSave={onCheckout}
            isLoading={isGetUserLoading}
            title="Подтвердить детали"
            buttonText="Продолжить оплату"
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
