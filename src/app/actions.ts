'use server'

import { redirect } from 'next/navigation'

export async function registerAgentStep2(_prevState: unknown, formData: FormData) {
  const role = formData.get('role') as string
  const lc = formData.get('lc') as string
  const firstConference = formData.get('firstConference') as string

  if (!role || !lc || !firstConference) {
    return { message: 'All required fields must be completed, agent.', success: false }
  }

  // TODO: persist step 2 data
  redirect('/step3')
}

export async function registerAgentStep3(_prevState: unknown, formData: FormData) {
  // TODO: persist step 3 data
  redirect('/confirmation')
}

export async function registerAgent(_prevState: unknown, formData: FormData) {
  const data = {
    codename: formData.get('codename') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    birthYear: formData.get('birthYear') as string,
    recruitmentYear: formData.get('recruitmentYear') as string,
    instagram: formData.get('instagram') as string,
  }

  if (!data.codename || !data.phone || !data.email || !data.birthYear || !data.recruitmentYear) {
    return { message: 'All required fields must be completed, agent.', success: false }
  }

  // TODO: persist to database or send to Google Sheets
  redirect('/step2')
}
