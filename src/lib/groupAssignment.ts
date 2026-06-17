import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'groups.json')

interface Member {
  codename: string
  lc: string
  groupId: number
}

interface Store {
  members: Member[]
  nextGroupId: number
}

function read(): Store {
  try {
    if (!fs.existsSync(DATA_FILE)) return { members: [], nextGroupId: 1 }
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
  } catch {
    return { members: [], nextGroupId: 1 }
  }
}

function write(store: Store) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2))
}

export function assignGroup(codename: string, lc: string): number {
  const store = read()

  // Build group → members map
  const groupMap = new Map<number, Member[]>()
  for (const m of store.members) {
    if (!groupMap.has(m.groupId)) groupMap.set(m.groupId, [])
    groupMap.get(m.groupId)!.push(m)
  }

  // Shuffle groups for fairness before assigning
  const groupIds = Array.from(groupMap.keys()).sort(() => Math.random() - 0.5)

  let assignedGroupId: number | null = null
  for (const id of groupIds) {
    const members = groupMap.get(id)!
    if (members.length >= 6) continue
    if (members.some((m) => m.lc.toLowerCase() === lc.toLowerCase())) continue
    assignedGroupId = id
    break
  }

  // No valid group found — create a new one
  if (assignedGroupId === null) {
    assignedGroupId = store.nextGroupId
    store.nextGroupId++
  }

  store.members.push({ codename, lc, groupId: assignedGroupId })
  write(store)
  return assignedGroupId
}

export function getGroupMembers(groupId: number): Member[] {
  const store = read()
  return store.members.filter((m) => m.groupId === groupId)
}

export function getRegistrationCount(): number {
  return read().members.length
}
