import MainLayout from "../../layouts/MainLayout/MainLayout"

const HomeHero = () => {
  return (
    <MainLayout>
       <div className="grid grid-cols-12 h-[700px]">
        <div className="bg-red-500 col-span-4"></div>
        <div className="bg-green-500 col-span-8"></div>

       </div>
    </MainLayout>
  )
}

export default HomeHero
