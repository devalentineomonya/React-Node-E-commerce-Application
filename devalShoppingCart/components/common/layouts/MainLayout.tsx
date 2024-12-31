interface MainLayoutProps {
    children: React.ReactNode;
    bg?:string;
    mt?:string;
    overflow?:boolean;
}
const MainLayout = ({
  children,
  bg = "bg-white",
  mt = "",
  overflow = false,
}: MainLayoutProps) => {
  return (
    <main
      className={`flex justify-center items-center w-full ${bg} ${mt} ${
        !overflow ? "overflow-hidden" : ""
      }`}
    >
      <div className="container max-w-[1400px] px-3">{children}</div>
    </main>
  );
};



export default MainLayout;
