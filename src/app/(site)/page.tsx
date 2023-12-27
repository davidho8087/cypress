import TitleSection from '@/components/landing-page/title-section'
import { Button } from '@/components/ui/button'

const HomePage = () => {
  return (
    <>
      <section
        className="mt-10
      gap-4
      overflow-hidden
      px-4
      sm:flex
      sm:flex-col
      sm:px-6
      md:items-center
      md:justify-center"
      >
        <TitleSection
          pill="✨ Your Workspace, Perfected"
          title="Collaboration and Productivity Workspace"
        />

        <div className="to-brand-primaryBlue mt-6 rounded-xl bg-gradient-to-r from-primary p-[2px] sm:w-[300px]">
          <Button className="w-full rounded-[10px] bg-background p-6 text-2xl">
            Get Things Free
          </Button>
        </div>
      </section>
    </>
  )
}

export default HomePage
