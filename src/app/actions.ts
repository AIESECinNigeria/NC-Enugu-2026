'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

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

  const cookieStore = await cookies()
  cookieStore.set('step1_data', JSON.stringify(data), {
    maxAge: 3600,
    httpOnly: true,
    sameSite: 'lax',
  })

  redirect('/step2')
}

export async function registerAgentStep2(_prevState: unknown, formData: FormData) {
  const role = formData.get('role') as string
  const lc = formData.get('lc') as string
  const firstConference = formData.get('firstConference') as string

  if (!role || !lc || !firstConference) {
    return { message: 'All required fields must be completed, agent.', success: false }
  }

  const data = {
    role,
    lc,
    firstConference,
    purpose: formData.get('purpose') as string,
    notes: formData.get('notes') as string,
  }

  const cookieStore = await cookies()
  cookieStore.set('step2_data', JSON.stringify(data), {
    maxAge: 3600,
    httpOnly: true,
    sameSite: 'lax',
  })

  redirect('/step3')
}

export async function registerAgentStep3(_prevState: unknown, formData: FormData) {
  try {
    const cookieStore = await cookies()

    const step1Raw = cookieStore.get('step1_data')?.value
    const step2Raw = cookieStore.get('step2_data')?.value

    if (!step1Raw || !step2Raw) {
      return { message: 'Session expired. Please start over.', success: false }
    }

    const step1 = JSON.parse(step1Raw)
    const step2 = JSON.parse(step2Raw)

    const payloadData = {
      name: step1.codename,
      email: step1.email,
      date_of_birth: step1.birthYear,
      year_they_joined: step1.recruitmentYear,
      social_media: step1.instagram,
      role: step2.role,
      lc: step2.lc,
      first_conference: step2.firstConference === 'Yes',
      expectations: step2.purpose,
      allergies: formData.get('allergies') as string,
      allergy_treatment: formData.get('countermeasures') as string,
      can_stay_with_opposite_sex: formData.get('coEd') === 'Yes',
      emergency_contact: formData.get('purpose') as string,
      emergency_contact_relationship: formData.get('notes') as string,
      instructions: 'None',
    }

    const response = await fetch('https://ain-backend.fly.dev/api/nc-en/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payloadData),
    })

    if (!response.ok) {
      return { message: `Backend error: ${response.statusText}`, success: false }
    }

    // Clear cookies after successful submission
    cookieStore.delete('step1_data')
    cookieStore.delete('step2_data')

    redirect('/confirmation')
  } catch (error) {
    console.error('Registration error:', error)
    return { message: 'Failed to complete registration. Please try again.', success: false }
  }
}
