'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { assignGroup } from '@/lib/groupAssignment'

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
  const cookieStore = await cookies()

  const step1 = JSON.parse(cookieStore.get('step1_data')?.value || '{}')
  const step2 = JSON.parse(cookieStore.get('step2_data')?.value || '{}')

  const step3Data = {
    allergies:        formData.get('allergies')        as string,
    countermeasures:  formData.get('countermeasures')  as string,
    coEd:             formData.get('coEd')             as string,
    emergencyContact: formData.get('purpose')          as string,
    relationship:     formData.get('notes')            as string,
    directLine:       formData.get('directLine')       as string,
  }

  // Assign to an LC-diverse group of 6
  const groupId = assignGroup(step1.codename ?? 'unknown', step2.lc ?? 'unknown')

  const fullPayload = { ...step1, ...step2, ...step3Data, groupId }

  // Submit to backend (fire-and-forget; don't block redirect on backend failure)
  try {
    await fetch('https://ain-backend.fly.dev/api/nc-en/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullPayload),
    })
  } catch (err) {
    console.error('Backend submission error:', err)
  }

  // Store ID-relevant data in a readable cookie for the ID page
  cookieStore.set('agent_profile', JSON.stringify({
    codename: step1.codename,
    lc:       step2.lc,
    role:     step2.role,
    groupId,
  }), {
    maxAge:   3600,
    httpOnly: false,
    sameSite: 'lax',
    path:     '/',
  })

  redirect('/confirmation')
}
