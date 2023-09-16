import { useUser } from "@/lib/auth"
import { useGetProfile } from "../api/getProfile"
import { ProfileForm, ProfileFormSkeleton } from "../components/ProfileForm";
import { useUpdateProfile } from "../api/updateProfile";

export const Profile = () => {
  const {data: user} = useUser();
  const {data, isLoading, error} = useGetProfile({
    id: user!.id
  }, { enabled: !!user });
  const { mutateAsync: updateProfile, isLoading: updateProfileLoading } = useUpdateProfile();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <ProfileFormSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl">
        <ProfileForm onSubmit={(v) => updateProfile({
          id: user!.id,
          data: v
        })} isLoading={updateProfileLoading} defaultValues={{
          address: data?.address || '',
          country: data?.country || '',
          province: data?.province || '',
          city: data?.city || '',
          email: data?.email || '',
          phoneNumber: data?.phoneNumber || '',
          postalCode: data?.postalCode || '',
        }}/>
      </div>
    </div>
  )
}