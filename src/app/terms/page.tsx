import { LegalPage } from '@/components/LegalPage';

const TERMS_SECTIONS = [
  {
    title: 'Acceptance of These Terms',
    paragraphs: [
      'These Terms of Service govern your access to and use of USA Test. By using the site, you agree to these terms. If you do not agree, do not use the site.',
      'These terms apply to the daily test, practice mode, leaderboard features, informational pages, and any related communications or future features offered through the site.',
    ],
  },
  {
    title: 'Eligibility and Use of the Site',
    paragraphs: [
      'You may use USA Test only if you can form a binding agreement under applicable law and your use is not prohibited by law. If you use the site on behalf of an organization, you represent that you have authority to bind that organization.',
    ],
  },
  {
    title: 'License to Use USA Test',
    paragraphs: [
      'Subject to these terms, USA Test grants you a limited, non-exclusive, non-transferable, revocable license to access and use the site for personal, non-commercial use.',
      'This license does not allow you to copy, resell, reverse engineer, scrape at scale, or exploit the site or its content except as permitted by law or with our written permission.',
    ],
  },
  {
    title: 'Accounts, Sessions, and Submissions',
    paragraphs: [
      'USA Test may create a browser session automatically through cookies or similar technologies. You do not currently need a traditional username-and-password account to use core site features.',
      'If you submit your name, phone number, or other information to claim a leaderboard spot, you agree that the information you provide is accurate and that you have the right to provide it.',
    ],
  },
  {
    title: 'Acceptable Use',
    bullets: [
      'Do not use the site for unlawful, fraudulent, deceptive, or abusive purposes.',
      'Do not interfere with the site’s operation, security, or availability.',
      'Do not attempt to bypass daily-test limitations, manipulate scores, automate submissions, or access data you are not authorized to access.',
      'Do not upload or transmit malware, spam, or harmful code.',
      'Do not impersonate another person or submit misleading contact information.',
    ],
  },
  {
    title: 'Leaderboard Rules',
    paragraphs: [
      'Leaderboard positions are based on the rules and product logic currently implemented by USA Test, including scoring and time-based tie-breaking where applicable.',
      'We may remove, adjust, or refuse leaderboard entries if we believe an entry is inaccurate, abusive, fraudulent, automated, or inconsistent with the intended operation of the site.',
    ],
  },
  {
    title: 'User Feedback',
    paragraphs: [
      'If you send us suggestions, feedback, or ideas about USA Test, you agree we may use them without restriction or compensation to you, unless applicable law requires otherwise.',
    ],
  },
  {
    title: 'Intellectual Property',
    paragraphs: [
      'USA Test, including its branding, design, copy, software, question presentation, graphics, and site content, is owned by or licensed to us and is protected by applicable intellectual property laws.',
      'These terms do not transfer any ownership rights to you.',
    ],
  },
  {
    title: 'Third-Party Services',
    paragraphs: [
      'USA Test may rely on third-party infrastructure, analytics, messaging providers, hosting services, or database tools. We are not responsible for third-party sites, products, or services except as required by law.',
    ],
  },
  {
    title: 'Availability and Changes',
    paragraphs: [
      'We may change, suspend, or discontinue any part of USA Test at any time, including categories, leaderboard behavior, contact flows, content, or legal pages, without prior notice.',
      'We do not guarantee that the site will always be available, error-free, secure, or compatible with every device or browser.',
    ],
  },
  {
    title: 'Disclaimers',
    paragraphs: [
      'USA Test is provided on an “as is” and “as available” basis to the fullest extent permitted by law. We disclaim all warranties, express or implied, including implied warranties of merchantability, fitness for a particular purpose, non-infringement, and uninterrupted availability.',
      'We do not guarantee that every question, answer, explanation, ranking, or result will always be complete, accurate, or free from error.',
    ],
  },
  {
    title: 'Limitation of Liability',
    paragraphs: [
      'To the fullest extent permitted by law, USA Test and its operators will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of data, goodwill, profits, or business opportunity arising from or related to your use of the site.',
      'To the fullest extent permitted by law, our total liability for any claim arising out of or relating to USA Test will not exceed one hundred U.S. dollars (US $100) or the amount you paid us to use the site, if any, in the twelve months before the claim arose.',
    ],
  },
  {
    title: 'Indemnity',
    paragraphs: [
      'You agree to defend, indemnify, and hold harmless USA Test and its operators from claims, liabilities, damages, losses, and expenses arising out of your misuse of the site, your violation of these terms, or your violation of applicable law or the rights of another person.',
    ],
  },
  {
    title: 'Termination',
    paragraphs: [
      'We may suspend or terminate your access to USA Test at any time if we believe you violated these terms, created risk for the site or its users, or used the site in a way that is abusive, unlawful, or inconsistent with its intended purpose.',
    ],
  },
  {
    title: 'Governing Law and Disputes',
    paragraphs: [
      'These terms are governed by applicable U.S. law and the laws of the state that we designate in a future update, without regard to conflict-of-law rules.',
      'If a dispute arises, we encourage you to contact us first through the Contact Us page so we can try to resolve it informally. If formal dispute terms, venue terms, or arbitration terms are added later, we will post them here.',
    ],
  },
  {
    title: 'Changes to These Terms',
    paragraphs: [
      'We may revise these Terms of Service from time to time. When we do, we will update the effective date on this page. Your continued use of USA Test after revised terms take effect means you accept the updated terms.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      'For questions about these Terms of Service, use the Contact Us page on this site until a dedicated legal contact address is published.',
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of Service"
      intro="These Terms of Service are adapted for USA Test based on the kinds of product terms commonly used by consumer learning platforms, but they have been rewritten to fit this site’s actual daily test, practice, leaderboard, and contact-capture flows."
      effectiveDate="April 8, 2026"
      sections={TERMS_SECTIONS}
    />
  );
}
