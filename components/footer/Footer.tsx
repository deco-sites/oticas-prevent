import BackToTop from "$store/components/footer/BackToTop.tsx";
import Divider from "$store/components/footer/Divider.tsx";
import ExtraLinks from "$store/components/footer/ExtraLinks.tsx";
import FooterItems from "$store/components/footer/FooterItems.tsx";
import Logo from "$store/components/footer/Logo.tsx";
import MobileApps from "$store/components/footer/MobileApps.tsx";
import PaymentMethods from "$store/components/footer/PaymentMethods.tsx";
import RegionSelector from "$store/components/footer/RegionSelector.tsx";
import Social from "$store/components/footer/Social.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import { clx } from "$store/sdk/clx.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Agencia from "$store/components/footer/Agencia.tsx";
import ReclameAqui from "$store/components/footer/ReclameAqui.tsx";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";
import Copyright from "$store/components/footer/Copyright.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter"
    | "InstagramNew"
    | "TiktokNew"
    | "FacebookNew"
    | "LinkedinNew";
  link: string;
}

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

export interface MobileApps {
  /** @description Link to the app */
  apple?: string;
  /** @description Link to the app */
  android?: string;
}

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  variation?:
    | "Variation 1"
    | "Variation 2"
    | "Variation 3"
    | "Variation 4"
    | "Variation 5";
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    mobileApps?: boolean;
    regionOptions?: boolean;
    extraLinks?: boolean;
    backToTheTop?: boolean;
    agencia?: boolean;
    reclameAqui?: boolean;
    copyright?: boolean;
  };
}

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  mobileApps?: MobileApps;
  regionOptions?: RegionOptions;
  extraLinks?: Item[];
  backToTheTop?: {
    text?: string;
  };
  agencia?: {
    image: ImageWidget;
    link?: string;
    alt?: string;
  };
  reclameAqui?: {
    title?: string;
    image: ImageWidget;
    link?: string;
    alt?: string;
  };
  copyright?: {
    text?: string;
  };
  layout?: Layout;
}

const LAYOUT = {
  "Primary": "bg-primary text-primary-content",
  "Secondary": "bg-secondary text-secondary-content",
  "Accent": "bg-accent text-accent-content",
  "Base 100": "bg-base-100 text-base-content",
  "Base 100 inverted": "bg-base-content text-base-100",
};

function Footer({
  logo,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
  sections = [{
    "label": "Sobre",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Termos de uso",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Trabalhe conosco",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Central de atendimento",
      },
      {
        "href": "/whatsapp",
        "label": "Fale conosco pelo WhatsApp",
      },
      {
        "href": "/trocaedevolucao",
        "label": "Troca e devolução",
      },
    ],
  }],
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/" }, { label: "Tiktok", link: "/" }],
  },
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
  },
  mobileApps = { apple: "/", android: "/" },
  regionOptions = { currency: [], language: [] },
  extraLinks = [],
  backToTheTop,
  agencia,
  reclameAqui,
  copyright,
  layout = {
    backgroundColor: "Primary",
    variation: "Variation 1",
    hide: {
      logo: false,
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      paymentMethods: false,
      mobileApps: false,
      regionOptions: false,
      extraLinks: false,
      backToTheTop: false,
      agencia: false,
      reclameAqui: false,
      copyright: false,
    },
  },
}: Props) {
  const _logo = layout?.hide?.logo ? <></> : <Logo logo={logo} />;
  const _newsletter = layout?.hide?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
      layout={{
        tiled: layout?.variation == "Variation 4" ||
          layout?.variation == "Variation 5",
      }}
    />
  );
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
      sections={sections}
      justify={layout?.variation == "Variation 2" ||
        layout?.variation == "Variation 3"}
    />
  );
  const _social = layout?.hide?.socialLinks
    ? <></>
    : <Social content={social} vertical={layout?.variation == "Variation 3"} />;

  const _payments = layout?.hide?.paymentMethods
    ? <></>
    : <PaymentMethods content={payments} />;

  const _apps = layout?.hide?.mobileApps
    ? <></>
    : <MobileApps apple={mobileApps?.apple} android={mobileApps?.android} />;

  const _reclameAqui = layout?.hide?.reclameAqui
    ? <></>
    : <ReclameAqui reclameAqui={reclameAqui} />;

  const _region = layout?.hide?.regionOptions
    ? <></>
    : <RegionSelector content={regionOptions} />;

  const _links = layout?.hide?.extraLinks
    ? <></>
    : <ExtraLinks content={extraLinks} />;

  const _agencia = layout?.hide?.agencia
    ? <></>
    : <Agencia agencia={agencia} />;

  const _copyright = layout?.hide?.copyright
    ? <></>
    : <Copyright copyright={copyright} />;

  return (
    <footer
      class={clx(
        "w-full flex flex-col pt-10 pb-2 md:pb-10 gap-10 bg-secondary", /*,
        LAYOUT[layout?.backgroundColor ?? "Primary"],*/
      )}
    >
      <div class="lg:container mx-6 lg:mx-auto">
        {(!layout?.variation || layout?.variation == "Variation 1") && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row md:justify-between md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12">
              {_logo}
              {_sectionLinks}
              {_newsletter}
            </div>
            <Divider />
            <div class="flex flex-col md:flex-row gap-10 md:gap-14 md:items-end">
              {_payments}
              {_reclameAqui}
              {_social}
              <div class="flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-end">
                {_apps}
                {_region}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
              {_copyright}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 2" && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row gap-10">
              <div class="flex flex-col gap-10 lg:w-1/2">
                {_logo}
                {_social}
                {_payments}
                {_reclameAqui}
                {_apps}
                {_region}
              </div>
              <div class="flex flex-col justify-between gap-10 lg:gap-20 lg:w-1/2 lg:pr-10">
                {_newsletter}
                {_sectionLinks}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-10 text-white">
              <div class="flex  gap-10">
                <PoweredByDeco />
                {_agencia}
              </div>
              {_copyright}
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 3" && (
          <div class="flex flex-col gap-10">
            {_logo}
            <div class="flex flex-col lg:flex-row gap-14">
              <div class="flex flex-col md:flex-row lg:flex-col md:justify-between lg:justify-normal gap-10 lg:w-2/5">
                {_newsletter}
                <div class="flex flex-col gap-10">
                  {_payments}
                  {_reclameAqui}
                  {_apps}
                </div>
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-3/5 lg:items-end">
                <div class="flex flex-col md:flex-row gap-10">
                  {_sectionLinks}
                  {_social}
                </div>
                {_region}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_copyright}
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 4" && (
          <div class="flex flex-col gap-10">
            {_newsletter}
            {layout?.hide?.newsletter ? <></> : <Divider />}
            <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:justify-between">
              {_sectionLinks}
              <div class="flex flex-col md:flex-row lg:flex-col gap-10 lg:gap-10 lg:w-2/5 lg:pl-10">
                <div class="flex flex-col md:flex-row gap-10 lg:gap-20">
                  <div class="lg:flex-auto">
                    {_payments}
                    {_reclameAqui}
                  </div>
                  <div class="lg:flex-auto">
                    {_social}
                  </div>
                </div>
                <div class="flex flex-col gap-10 lg:gap-10">
                  {_region}
                  {_apps}
                </div>
              </div>
            </div>
            <Divider />
            <div class="flex flex-col md:flex-row md:justify-between gap-10 md:items-center text-white">
              {_logo}
              <PoweredByDeco />
            </div>
          </div>
        )}
        {layout?.variation == "Variation 5" && (
          <div class="flex flex-col gap-10">
            {_newsletter}
            {layout?.hide?.newsletter ? <></> : <Divider />}
            {_logo}
            <div class="flex flex-col md:flex-row gap-10 lg:gap-20 md:justify-between">
              {_sectionLinks}
              <div class="flex flex-col gap-10 md:w-2/5 lg:pl-10">
                {_payments}
                {_reclameAqui}
                {_social}
                {_apps}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10 md:items-center">
              <PoweredByDeco />
              <div class="flex flex-col md:flex-row gap-10 md:items-center">
                {_links}
                {_region}
                {_copyright}
              </div>
            </div>
          </div>
        )}
      </div>
      {layout?.hide?.backToTheTop
        ? <></>
        : <BackToTop content={backToTheTop?.text} />}
    </footer>
  );
}

export default Footer;
