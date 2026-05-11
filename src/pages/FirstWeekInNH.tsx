import { useTranslation } from 'react-i18next'
import { usePageMeta } from '../hooks/usePageMeta'
import { Link } from 'react-router-dom'
import { DisclaimerBanner } from '../components/DisclaimerBanner'

type Section = { h: string; p: string }

type Pack = { title: string; subtitle: string; printHint: string; sections: Section[] }

const PACKS: Record<string, Pack> = {
  en: {
    title: 'Your first week in New Hampshire',
    subtitle:
      'Plain-language checklist for newcomers. Confirm every phone number and address on the official website before you travel.',
    printHint:
      'To save this page as a PDF: use your browser’s Print menu (Ctrl+P or ⌘P), then choose “Save as PDF.”',
    sections: [
      {
        h: 'Day 1 — Safety & emergencies',
        p:
          'Call 911 for police, fire, or ambulance. For mental health crisis, call or text 988. When it is not an emergency, dial 211 NH for housing, food, and referrals (24/7, with language help).',
      },
      {
        h: 'Day 1–3 — Someone to call about your case',
        p:
          'If you were resettled, stay in touch with your case manager at your agency (for example Ascentria or IINE in Manchester). Write down their name, phone, and office hours.',
      },
      {
        h: 'Health & insurance',
        p:
          'Ask your case manager how to apply for health coverage in New Hampshire. For doctors and dentists, follow your plan’s provider list or ask 211 for low-cost clinics.',
      },
      {
        h: 'Schools for children',
        p:
          'Bring enrollment documents the school district requests (often proof of address and immunizations). If you are in temporary housing, ask the district about McKinney-Vento rights for students.',
      },
      {
        h: 'Legal help — two different systems',
        p:
          'Immigration court and immigration forms need an immigration lawyer or accredited representative. Eviction, benefits denials, and many family safety issues go through civil legal aid (603 Legal Aid screener first).',
      },
      {
        h: 'Know your rights basics',
        p:
          'See our Know Your Rights page for trusted national PDFs and cards. This site cannot tell you what will happen in your individual case.',
      },
    ],
  },
  ne: {
    title: 'न्यू ह्याम्पशायरमा तपाईंको पहिलो हप्ता',
    subtitle:
      'यो साधारण भाषामा चेकलिस्ट हो। यात्रा गर्नु अघि आधिकारिक वेबसाइटमा प्रत्येक फोन र ठेगाना पुष्टि गर्नुहोस्।',
    printHint:
      'PDF को रूपमा बचत गर्न: ब्राउजरको प्रिन्ट मेनु (Ctrl+P वा ⌘P) प्रयोग गर्नुहोस्, अनि “Save as PDF” छान्नुहोस्।',
    sections: [
      {
        h: 'दिन १ — सुरक्षा र आपतकालीन',
        p:
          'प्रहरी, अग्नि वा एम्बुलेन्सको लागि ९११ डायल गर्नुहोस्। मानसिक स्वास्थ्य संकटमा ९८८ कल वा टेक्स्ट गर्नुहोस्। आपतकालीन नभएमा २११ NH ले आवास, खाना र सन्दर्भ जोड्छ (२४/७, भाषा सहयोग)।',
      },
      {
        h: 'दिन १–३ — तपाईंको मुद्दाका लागि कल गर्ने व्यक्ति',
        p:
          'यदि पुनर्वासन भएको छ भने, आफ्नो एजेन्सीको केस म्यानेजरसँग सम्पर्कमा रहनुहोस् (उदाहरण म्यानचेस्टरमा Ascentria वा IINE)। उनीहरूको नाम, फोन र कार्यालय समय लेख्नुहोस्।',
      },
      {
        h: 'स्वास्थ्य र बीमा',
        p:
          'न्यू ह्याम्पशायरमा स्वास्थ्य बीमाको लागि निवेदन कसरी गर्ने भनेर केस म्यानेजरलाई सोध्नुहोस्। डाक्टर र दन्त चिकित्सकको लागि, आफ्नो योजनाको प्रदायक सूची पालना गर्नुहोस् वा सस्तो क्लिनिकको लागि २११ सोध्नुहोस्।',
      },
      {
        h: 'बालबालिकाको विद्यालय',
        p:
          'विद्यालय जिल्लाले माग गरेको दर्ता कागजात ल्याउनुहोस् (प्रायः ठेगाना र खोप प्रमाण पत्र)। अस्थायी आवासमा हुनुहुन्छ भने, विद्यार्थीहरूको लागि McKinney-Vento अधिकारबारे जिल्लालाई सोध्नुहोस्।',
      },
      {
        h: 'कानुनी मद्दत — दुई फरक प्रणालीहरू',
        p:
          'आप्रवासन अदालत र फारामहरूका लागि आप्रवासन वकील वा मान्यता प्राप्त प्रतिनिधि चाहिन्छ। निष्कासन, लाभ अस्वीकृति र धेरै पारिवारिक सुरक्षा विषयहरू नागरिक कानुनी सहायताबाट (पहिले ६०३ Legal Aid स्क्रिनर)।',
      },
      {
        h: 'आफ्नो अधिकार — आधारभूत',
        p:
          'विश्वसनीय राष्ट्रिय PDF र कार्डहरूको लागि हाम्रो Know Your Rights पृष्ठ हेर्नुहोस्। यो साइटले तपाईंको व्यक्तिगत मुद्दामा के हुन्छ भन्न सक्दैन।',
      },
    ],
  },
  rw: {
    title: 'Icyumweru cyawe cya mbere muri New Hampshire',
    subtitle:
      "Ururundi rurimi roroshye rw'ibikorwa ukora. Emeza nimero zose na aderesi ku rubuga rwa nyacyo utarakoresha urugendo.",
    printHint:
      "Kubika iyi nkuru nka PDF: koresha menyu ya Print ya browser (Ctrl+P cyangwa ⌘P), uhitemo « Save as PDF ».",
    sections: [
      {
        h: 'Umunsi wa 1 — umutekano n’ibihe by’ihutiraho',
        p:
          'Hamagara 911 ku mapirisi, umuriro, cyangwa ambilansi. Mu myitwarire ikomeye y’ubuzima bw’umutwe, hamagara cyangwa wohereze ubutumwa kuri 988. Ibi si iby’ihutiraho, hamagara 211 NH ku mazu, ibiribwa, no guhabwa abandi bakubashyirikihe (24/7, barimo gufasha mu ndimi).',
      },
      {
        h: 'Iminsi 1–3 — umuntu w’hamagara ku kibazo cyawe',
        p:
          'Nimara kwakira serivisi z’abimukira, komeza uhagarare vuba n’umuyobozi w’akazi w’ikigo cyawe (urugero Ascentria cyangwa IINE i Manchester). Andika izina rye, nimero, n’igihe afunguye.',
      },
      {
        h: 'Ubuzima n’ubwishingizi',
        p:
          'Sobanuza umuyobozi wawe uko wakwigira ku bwishingizi bw’ubuzima muri New Hampshire. Kwa muganga n’abavuzi b’amenyo, koresha urutonde rw’abantu bahuza n’ubwishingizi cyangwa ubaze 211 kugeza ku bitaro bidakomeye ku biciro.',
      },
      {
        h: 'Amasomo y’abana',
        p:
          'Ujyanye impapuro z’iyandikwa ishuri risaba (akenshi aderesi n’urupapuro rw’inkingo). Nihaba utuye mu mazu ataziguye, babaza ishuri ku burenganzira bwa McKinney-Vento bw’abanyeshuri.',
      },
      {
        h: 'Ubufasha bw’amategeko — uburyo bubiri butandukanye',
        p:
          'Inkiko z’imibereho n’impapuro z’imibereho zikeneye avoka y’imibereho cyangwa umuhuza wemewe. Gukurikiranwa mu nzu, kwangwa amafaranga, n’ibibazo bimwe by’umutekano w’umuryango bigana ku bufasha bw’amategeko y’abaturage (banza muri 603 Legal Aid).',
      },
      {
        h: 'Guhisha amategeko yawe — by’ibanze',
        p:
          'Reba urupapuro rwacu « Know Your Rights » kugirango ubone PDF n’ikarita zemerewe muri Leta. Uru rubuga ntirushobora kuvuga ibizaba ku rubanza rwawe ku giti cyawe.',
      },
    ],
  },
}

export function FirstWeekInNH() {
  const { i18n, t } = useTranslation()
  const lang = i18n.language.split('-')[0] ?? 'en'
  const pack = PACKS[lang] ?? PACKS.en

  usePageMeta(pack.title, pack.subtitle)

  return (
    <div className="page-with-nav first-week-page">
      <article className="page-shell page-shell--narrow first-week-print">
        <p className="first-week-print-hint screen-only">{pack.printHint}</p>
        <h1 className="page-title">{pack.title}</h1>
        <p className="page-lead">{pack.subtitle}</p>

        <DisclaimerBanner variant="default" className="first-week-disclaimer" />

        <ol className="first-week-sections">
          {pack.sections.map((s, i) => (
            <li key={i} className="first-week-section">
              <h2 className="page-subtitle">{s.h}</h2>
              <p className="page-body">{s.p}</p>
            </li>
          ))}
        </ol>

        <p className="page-body screen-only">
          <Link to="/know-your-rights">{t('kyr.navLink')}</Link>
          {' · '}
          <Link to="/services#nh-refugee-needs">{t('kyr.needsLink')}</Link>
        </p>

        <p className="page-body" style={{ marginTop: 24 }}>
          <Link to="/" className="event-detail-back">
            ← {t('common.backHome')}
          </Link>
        </p>
      </article>
    </div>
  )
}
