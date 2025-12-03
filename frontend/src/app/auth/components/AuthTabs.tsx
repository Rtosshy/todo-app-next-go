'use client'

import { TabGroup, TabList, Tab } from '@headlessui/react'
import { useRouter } from 'next/navigation'

type AuthTabsProps = {
  activeTab: 'login' | 'signup'
}

export default function AuthTabs({ activeTab }: AuthTabsProps) {
  const router = useRouter()
  const selectedIndex = activeTab === 'signup' ? 0 : 1

  const handleTabChange = (index: number) => {
    const newTab = index === 0 ? 'signup' : 'login'
    router.push(`/auth?tab=${newTab}`)
  }

  return (
    <TabGroup selectedIndex={selectedIndex} onChange={handleTabChange}>
      <TabList className="flex gap-1">
        <Tab
          className={({ selected }) =>
            `px-4 py-2 transition-all outline-none ${
              selected
                ? 'text-white border-b-2 border-b-white'
                : 'text-white hover:bg-gray-800'
            }`
          }
        >
          Sign up
        </Tab>
        <Tab
          className={({ selected }) =>
            `px-4 py-2 transition-all outline-none ${
              selected
                ? 'text-white border-b-2 border-b-white'
                : 'text-white hover:bg-gray-800'
            }`
          }
        >
          Login
        </Tab>
      </TabList>
    </TabGroup>
  )
}
