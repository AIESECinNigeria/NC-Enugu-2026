import { cookies } from 'next/headers'
import Registration from '@/components/Registration'

export default async function RegistrationPage() {
  const cookieStore = await cookies()

  const step1Raw = cookieStore.get('step1_data')?.value
  const step1 = step1Raw ? JSON.parse(step1Raw) : {}

  return <Registration initialData={step1} />
}