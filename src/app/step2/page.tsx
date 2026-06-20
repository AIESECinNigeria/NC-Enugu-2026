import { cookies } from 'next/headers'
import RegistrationStep2 from '@/components/RegistrationStep2'

export default async function Step2Page() {
  const cookieStore = await cookies()
  const step2Raw = cookieStore.get('step2_data')?.value
  const step2 = step2Raw ? JSON.parse(step2Raw) : {}
  return <RegistrationStep2 initialData={step2} />
}