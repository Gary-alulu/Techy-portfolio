import { WorkContent } from "@/components/work/WorkContent";

export const metadata = {
  title: "Work",
  description: "Explore my portfolio of premium digital products, UI/UX designs, and brand identities.",
};

export default function WorkPage() {
  return <WorkContent activeCategory="All" />;
}
