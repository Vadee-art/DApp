import { useUser } from "@/lib/auth"
import { useGetProfile } from "../api/getProfile"
import { ProfileForm, ProfileFormSkeleton } from "../components/ProfileForm";

export const Profile = () => {
  const {data: user} = useUser();
  const {data, isLoading, error} = useGetProfile({
    id: user!.id
  }, { enabled: !!user });

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
        <ProfileForm onSubmit={(v) => {console.log(v)}} isLoading={false} defaultValues={{
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