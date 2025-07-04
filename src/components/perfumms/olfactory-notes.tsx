import { OlfactoryNote } from "@/types/perfume";

export default function OlfactoryNotes({
  olfactoryNotes,
}: {
  olfactoryNotes: OlfactoryNote[];
}) {
  return (
    <div className="flex flex-col gap-[2rem]">
      <h2 className="text-[2rem] font-[400] leading-[2.5rem] text-pretty">
        Olfactory Notes
      </h2>
    </div>
  );
}