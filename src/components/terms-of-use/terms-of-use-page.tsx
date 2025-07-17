import { TermsOfUseInterface } from "@/types/terms-of-use";
import RichEditor from "../rich-editor";

export default function TermsOfUsePage({
  termsOfUseData,
}: {
  termsOfUseData: TermsOfUseInterface;
}) {
  return (
    <section className="max-w 2xl:mt-[17rem] md:mt-[16.8rem] mt-[8.2rem] mb-[15rem]">
      <h1 className="2xl:text-[4rem] lg:text-[3.85rem] text-[2.6rem]">
        {termsOfUseData.name}
      </h1>
      <div className="lg:mt-[2.2rem] mt-[3rem]">
        <RichEditor content={termsOfUseData.content} />
      </div>
    </section>
  );
}
