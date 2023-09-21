import { MainLayout } from "@/components/Layout";
import { NavLink } from "react-router-dom";

type ProfileLayouProps = {
  children: React.ReactNode;
};

export const ProfileLayout = ({children}: ProfileLayouProps) => {
  return (
    <MainLayout showNav={false}>
      <div className="container mx-auto px-4">
        <div className="flex flex-1 items-start gap-4 font-extralight mb-16">
          <NavLink
            className={({ isActive }) =>
              `${isActive ? 'text-teal-500 underline underline-offset-4' : ''}`
            }
            to="/profile/followings"
          >
            Save & Follow
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? 'text-teal-500 underline underline-offset-4' : ''}`
            }
            to="/profile/orders"
          >
            Orders
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? 'text-teal-500 underline underline-offset-4' : ''}`
            }
            to="/profile/info"
          >
            Profile
          </NavLink>
        </div>
        {children}
      </div>
    </MainLayout>
  )
}