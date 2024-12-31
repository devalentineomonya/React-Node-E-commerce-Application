import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout = ({ children, className }: MainLayoutProps) => {
  return (
    <main
      className={cn(
        "flex justify-center items-center w-full overflow-hidden",
        className
      )}
    >
      <div className="container max-w-[1400px] px-3">{children}</div>
    </main>
  );
};

export default MainLayout;
