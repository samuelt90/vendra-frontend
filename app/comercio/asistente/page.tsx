import CommerceAssistant from "../components/assistant/CommerceAssistant";

export default function CommerceAssistantPage() {
  return (
    <main
      className="
        min-h-svh
        bg-[var(--commerce-bg)]
        px-[var(--commerce-page-x)]
        pb-32 pt-28
        text-[var(--commerce-ink)]
        md:pb-28 md:pt-36
      "
    >
      <CommerceAssistant variant="page" />
    </main>
  );
}

