'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { API_BASE_URL } from '@/lib/config'

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
    path: '/',
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
    path: '/',
  })

  redirect('/step3')
}

export async function registerAgentStep3(_prevState: unknown, formData: FormData) {
  const cookieStore = await cookies()

  const step1 = JSON.parse(cookieStore.get('step1_data')?.value || '{}')
  const step2 = JSON.parse(cookieStore.get('step2_data')?.value || '{}')
  const quizId = cookieStore.get('quiz_id')?.value || ''

  let crewType = ''
  try {
    const raw = cookieStore.get('quiz_result')?.value || ''
    if (raw) {
      const parsed = JSON.parse(decodeURIComponent(raw))
      crewType = parsed.name || ''
    }
  } catch {
    crewType = ''
  }

  const step3Raw = {
    allergies:        formData.get('allergies')        as string,
    countermeasures:  formData.get('countermeasures')  as string,
    coEd:             formData.get('coEd')             as string,
    emergencyContact: formData.get('purpose')          as string,
    relationship:     formData.get('notes')            as string,
    directLine:       formData.get('directLine')       as string,
  }

  // Save step3 to cookie so going back restores it
  cookieStore.set('step3_data', JSON.stringify(step3Raw), {
    maxAge: 3600,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  })

  const mappedPayload = {
    name:                           step1.codename                      as string,
    email:                          step1.email                         as string,
    date_of_birth:                  step1.birthYear                     as string,
    phone:                          (step1.phone || '')                 as string,
    lc:                             step2.lc                            as string,
    year_they_joined:               step1.recruitmentYear               as string,
    role:                           step2.role                          as string,
    first_conference:               (step2.firstConference === 'Yes'),
    expectations:                   (step2.purpose || '')               as string,
    social_media:                   (step1.instagram || '')             as string,
    allergies:                      (step3Raw.allergies || '')          as string,
    allergy_treatment:              (step3Raw.countermeasures || '')    as string,
    can_stay_with_opposite_sex:     (step3Raw.coEd === 'Yes'),
    emergency_contact:              (step3Raw.emergencyContact || '')   as string,
    emergency_contact_relationship: (step3Raw.relationship || '')      as string,
    instructions:                   (step2.notes || '')                 as string,
    quiz_id:                        quizId,
    crew_type:                      crewType,
  }

  let res: Response
  try {
    res = await fetch(`${API_BASE_URL}/api/nc-en/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mappedPayload),
    })
  } catch {
    return { message: 'Connection to headquarters failed. Check your signal and try again.', success: false }
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error('Backend rejected registration:', res.status, detail)
    return { message: 'Headquarters rejected the dossier. Try again or contact your handler.', success: false }
  }

  let backendRole = ''
  let backendClearance = ''
  try {
    const resData = await res.json() as { delegate?: { role?: string }, clearance?: string }
    backendRole = resData.delegate?.role || ''
    backendClearance = resData.clearance || ''
  } catch {
    console.error('Failed to parse backend response')
  }

  cookieStore.set('agent_profile', JSON.stringify({
    codename:       step1.codename,
    lc:             step2.lc,
    role:           backendRole,
    clearanceLevel: step2.role,
    clearance:      backendClearance,
    crewName:       crewType,
  }), {
    maxAge:   3600,
    httpOnly: false,
    sameSite: 'lax',
    path:     '/',
  })

  redirect('/confirmation')
}