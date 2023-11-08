import { useAuthStore } from "@/stores"

export function ProfilePage() {
  const { user } = useAuthStore()
  console.log(user)
  return (
    <div>
      <img src={user?.photoURL || ""}></img>
      <div>{user?.displayName}</div>
      <div>{user?.email}</div>
    </div>
  )
}
