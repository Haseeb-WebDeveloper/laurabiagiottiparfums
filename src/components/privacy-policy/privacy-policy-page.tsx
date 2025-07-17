import { PrivacyPolicyInterface } from "@/types/privacy-policy";
import RichEditor from "../rich-editor";

export default function PrivacyPolicyPage({
  privacyPolicyData,
}: {
  privacyPolicyData: PrivacyPolicyInterface;
}) {
  return (
    <section className="max-w 2xl:mt-[17rem] md:mt-[16.8rem] mt-[8.2rem] mb-[15rem]">
      <h1 className="2xl:text-[4rem] lg:text-[3.85rem] text-[2.6rem]">
        {privacyPolicyData.name}
      </h1>
      <div className="lg:mt-[2.2rem] mt-[3rem]">
        <RichEditor content={privacyPolicyData.content} />
      </div>
    </section>
  );
}
