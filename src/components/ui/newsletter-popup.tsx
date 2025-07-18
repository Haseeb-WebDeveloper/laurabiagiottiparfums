"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useLocale } from "@/lib/i18n/context";
import { useState } from "react";
import { countries } from "countries-list";
import SplitText from "./split-text";
import { toast } from "sonner";

interface NewsletterPopupProps {
  customTrigger?: React.ReactNode;
}

const titleOptions = [
  { value: "sir", label: "Sir" },
  { value: "mrs", label: "Mrs" },
  { value: "dr", label: "Dr" },
];

export default function NewsletterPopup({
  customTrigger,
}: NewsletterPopupProps) {
  const { t } = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    privacyPolicy: false,
    newsletter: false,
    marketing: false,
  });

  // Convert countries object to array of options
  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.name,
  }));

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.email ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.privacyPolicy
    ) {
      toast.error(t("newsLatterError"));
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      // Reset form
      setFormData({
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        privacyPolicy: false,
        newsletter: false,
        marketing: false,
      });

      toast.success(t("newsLatterSuccess"));
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t("newsLatterError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{customTrigger}</DialogTrigger>
      <DialogContent className="w-[93vw] h-[95vh] overflow-y-auto z-[210]">
        <div className="p-4">
          <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
            <div className="w-full">
              <h4 className="text-[2rem]  font-[700] leading-[90%] tracking-wider max-w-[400px]">
                {t("newsLatterTitle")}
              </h4>
            </div>
            <div className="w-full">
              <p className="max-w-[400px]">{t("newsLatterDescription")}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-end gap-4 mb-[0.5rem]">
              <div>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full py-2 border-b-[1px] border-foreground bg-background text-[1rem] focus:ring-0 "
                >
                  <option value="text-[1rem]">{t("newsLatterTitle")}</option>
                  {titleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder={t("newsLatterFirstName")}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full py-2 border-b-[1px] border-foreground bg-background text-[1rem] focus:ring-0 "
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder={t("newsLatterLastName")}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full py-2 border-b-[1px] border-foreground bg-background text-[1rem] focus:ring-0 "
                />
              </div>

              {/* Second Row */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder={t("newsLatterEmail")}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full py-2 border-b-[1px] border-foreground bg-background text-[1rem] focus:ring-0 "
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder={t("newsLatterPhone")}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full py-2 border-b-[1px] border-foreground bg-background text-[1rem] focus:ring-0 "
                />
              </div>
              <div>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full py-2 border-b-[1px] border-foreground bg-background text-[1rem] focus:ring-0 "
                >
                  <option value="">{t("newsLatterCountry")}</option>
                  {countryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-[0.2rem] mt-[2rem]">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="privacyPolicy"
                  id="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onChange={handleCheckboxChange}
                  className="mt-1"
                />
                <label htmlFor="privacyPolicy" className="flex flex-col">
                  <span className="font-bold text-[1rem]">
                    {t("newsLatterPrivacyPolicy")} *
                  </span>
                  <span className="text-[0.9rem]">
                    {t("newsLatterPrivacyPolicyDescription")}
                  </span>
                </label>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="newsletter"
                  id="newsletter"
                  checked={formData.newsletter}
                  onChange={handleCheckboxChange}
                  className="mt-1"
                />
                <label htmlFor="newsletter" className="flex flex-col">
                  <span className="font-bold text-[1rem]">
                    {t("newsLatterNewsletter")}
                  </span>
                  <p className="text-[0.9rem]">
                    {t("newsLatterNewsletterDescription")}
                  </p>
                </label>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="marketing"
                  id="marketing"
                  checked={formData.marketing}
                  onChange={handleCheckboxChange}
                  className="mt-1"
                />
                <label htmlFor="marketing" className="flex flex-col">
                  <span className="font-bold text-[1rem]">
                    {t("newsLatterMarketing")}
                  </span>
                  <p className="text-[0.9rem]">
                    {t("newsLatterMarketingDescription")}
                  </p>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-[2.5rem]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.50rem] py-[0.55rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? t("newsLatterSubmitting")
                  : t("newsLatterConfirm")}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
