import { CookiesPolicyInterface } from "@/types/cookies-policy";
import RichEditor from "../rich-editor";

export default function CookiesPolicyPage({
  cookiesPolicyData,
}: {
  cookiesPolicyData: CookiesPolicyInterface;
}) {
  return (
    <section className="max-w 2xl:mt-[17rem] lg:mt-[16.8rem] mt-[8.2rem] mb-[15rem]">
      <h1 className="2xl:text-[4rem] lg:text-[3.85rem] text-[2.6rem]">
        {cookiesPolicyData.name}
      </h1>
      <div className="lg:mt-[2.2rem] mt-[3rem]">
        <RichEditor content={cookiesPolicyData.content} />
      </div>
    </section>
  );
}
