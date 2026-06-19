import { cookies } from 'next/headers'
import AgentID from '@/components/AgentID'

export default async function AgentIDPage() {
  const cookieStore = await cookies()

  const profileRaw = cookieStore.get('agent_profile')?.value
  const quizRaw    = cookieStore.get('quiz_result')?.value

  const profile = profileRaw ? JSON.parse(profileRaw) : { codename: 'UNKNOWN', lc: 'UNKNOWN', role: '', clearance: 'PENDING' }
  const quiz    = quizRaw    ? JSON.parse(decodeURIComponent(quizRaw)) : { name: 'UNCLASSIFIED' }

  return (
    <AgentID
      codename={profile.codename}
      lc={profile.lc}
      role={profile.role}
      crewName={quiz.name}
      clearance={profile.clearance}
      clearanceLevel={profile.clearanceLevel}
    />
  )
}
