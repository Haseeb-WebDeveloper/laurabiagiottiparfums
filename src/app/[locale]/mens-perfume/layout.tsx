import Navbar from "@/components/layout/navbar";

export default function MensPerfumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
