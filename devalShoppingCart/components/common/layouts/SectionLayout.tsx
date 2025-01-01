"use client"
import MainLayout from "./MainLayout";
import { motion } from "framer-motion";

interface SectionLayoutProps {
  children: React.ReactNode;
  title: string;
  overflow?: boolean;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({
  children,
  title,
  overflow = false,
}) => {
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MainLayout className={overflow ? "overflow-visible" : ""}>
      <section className="mt-14  w-full">
        <motion.div
          className="font-bold text-3xl text-gray-800 "
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          transition={{ duration: 1, delay: 0 }}
        >
          {title}
        </motion.div>
        <motion.div
          className="mt-10"
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </section>
    </MainLayout>
  );
};

export default SectionLayout;
