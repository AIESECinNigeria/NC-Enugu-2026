import { cookies } from 'next/headers'
import AgentID from '@/components/AgentID'
import { getRegistrationCount } from '@/lib/groupAssignment'

export default async function AgentIDPage() {
  const cookieStore = await cookies()

  const profileRaw = cookieStore.get('agent_profile')?.value
  const quizRaw    = cookieStore.get('quiz_result')?.value

  const profile = profileRaw ? JSON.parse(profileRaw) : { codename: 'UNKNOWN', lc: 'UNKNOWN', role: '', groupId: 0 }
  const quiz    = quizRaw    ? JSON.parse(decodeURIComponent(quizRaw)) : { name: 'UNCLASSIFIED', clearance: 'PENDING' }

  const serialNo = String(getRegistrationCount()).padStart(6, '0')

  return (
    <AgentID
      codename={profile.codename}
      lc={profile.lc}
      role={profile.role}
      groupId={profile.groupId}
      crewName={quiz.name}
      clearance={quiz.clearance}
      serialNo={serialNo}
    />
  )
}
