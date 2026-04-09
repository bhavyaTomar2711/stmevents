import { getSiteContent } from "@/lib/site-content";
import { SiteContentProvider } from "@/lib/hooks/useSiteContent";
import ConditionalFooter from "./ConditionalFooter";

export default async function FooterDataProvider() {
  const siteContent = await getSiteContent();
  return (
    <SiteContentProvider initialData={siteContent}>
      <ConditionalFooter />
    </SiteContentProvider>
  );
}
