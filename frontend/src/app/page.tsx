import LinkButton from './ui/link-button'
import PageName from './ui/page-name'

export default function Home() {
  return (
    <div>
      <PageName pageName="Todo App"></PageName>
      <div className="flex flex-col gap-4 w-fit">
        <LinkButton href="/signup" label="Go to Sign Up"></LinkButton>
        <LinkButton href="/login" label="Go to Login"></LinkButton>
      </div>
    </div>
  )
}
