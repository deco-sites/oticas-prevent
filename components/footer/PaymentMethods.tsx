import Icon from "$store/components/ui/Icon.tsx";

export interface PaymentItem {
  label:
    | "Diners"
    | "Elo"
    | "Mastercard"
    | "Pix"
    | "Visa"
    | "EloNew"
    | "DinnersNew"
    | "MasterCardNew"
    | "PixNew"
    | "VisaNew";
}

export default function PaymentMethods(
  { content }: { content?: { title?: string; items?: PaymentItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4">
          {content.title && (
            <h3 class="text-lg text-white font-extrabold uppercase">
              {content.title}
            </h3>
          )}
          <ul class="flex items-center gap-4 flex-wrap">
            {content.items.map((item) => {
              return (
                <li
                  class="border text-white"
                  title={item.label}
                >
                  <Icon
                    width={48}
                    height={32}
                    strokeWidth={1}
                    id={item.label}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
