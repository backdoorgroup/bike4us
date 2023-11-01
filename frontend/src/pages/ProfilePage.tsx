import { useUserStore } from "@/stores"

export function ProfilePage() {
  const { user } = useUserStore()
  console.log(user)
  return (
    <div>
      <img src={user?.photoURL || ""}></img>
      <div>{user?.displayName}</div>
      <div>{user?.email}</div>
    </div>
  )
}
