import { cookies } from 'next/headers'
import RegistrationStep3 from '@/components/RegistrationStep3'

export default async function Step3Page() {
  const cookieStore = await cookies()
  const step3Raw = cookieStore.get('step3_data')?.value
  const step3 = step3Raw ? JSON.parse(step3Raw) : {}
  return <RegistrationStep3 initialData={step3} />
}