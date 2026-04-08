import { LegalPage } from '@/components/LegalPage';

const PRIVACY_SECTIONS = [
  {
    title: 'Overview',
    paragraphs: [
      'This Privacy Policy explains how USA Test collects, uses, stores, and discloses information when you visit the site, take a daily test, use practice mode, submit contact information, or interact with the leaderboard.',
      'This policy is written for the site as it operates today. USA Test is a lightweight learning product built around a daily test, category-based practice mode, local browser storage, session cookies, and optional post-test contact capture.',
    ],
  },
  {
    title: 'Information We Collect',
    bullets: [
      'Information you provide voluntarily, such as your first name, last initial, phone number, and SMS consent choice if you claim a leaderboard spot after the daily test.',
      'Test activity information, such as your score, question count, answer state, completion time, streak information, and leaderboard submission details.',
      'Technical and usage information, such as browser-stored local data, cookie-based session identifiers, IP-derived region information when available, and basic request metadata needed to operate the site.',
      'Support or feedback information you provide through future contact or support channels.',
    ],
  },
  {
    title: 'How We Use Information',
    bullets: [
      'To operate the daily test, practice mode, timer flows, and answer review experience.',
      'To save or restore limited browser-side progress, such as daily test completion status, streak information, and saved display name.',
      'To operate leaderboards, including ranking, tie-breaking based on completion time, and display of submitted names and scores.',
      'To create or maintain browser sessions and link a session to a leaderboard submission when a user chooses to provide identifying information.',
      'To send reminder or notification messages only when a user has provided a phone number and explicitly consented to receive SMS messages.',
      'To improve reliability, monitor abuse, troubleshoot failures, and analyze how the product is used.',
    ],
  },
  {
    title: 'Cookies, Local Storage, and Similar Technologies',
    paragraphs: [
      'USA Test uses an HTTP-only session cookie to identify a browser session and support attribution for leaderboard and daily-result records. The site also stores certain limited information in browser local storage, such as whether today’s daily test was already completed, streak-related data, and a saved display name for later convenience.',
      'These technologies help the product function correctly. If you clear cookies or local storage, some saved state may be lost and the site may treat your browser as a new session.',
    ],
  },
  {
    title: 'How We Share Information',
    paragraphs: [
      'We may share information with service providers that help us operate the site, host data, support infrastructure, or send communications. Based on the current implementation, this includes hosted database and backend tooling and any messaging vendors used for optional reminders.',
      'We may also disclose information when reasonably necessary to comply with law, enforce our terms, protect users, investigate fraud or abuse, or defend legal rights.',
      'We do not describe USA Test as selling personal information in this policy.',
    ],
  },
  {
    title: 'Leaderboard and Public Information',
    paragraphs: [
      'If you choose to claim your place on a leaderboard, certain information may be displayed publicly, including your submitted display name, score, and in some cases state or region information derived from your request.',
      'Please submit only the name format you are comfortable displaying publicly.',
    ],
  },
  {
    title: 'SMS and Contact Information',
    paragraphs: [
      'Phone numbers are collected only if you choose to submit contact information after the daily test. If you provide SMS consent, USA Test may use your phone number to send test-related reminders or similar communications.',
      'You are responsible for providing a valid mobile number and for making sure you want to receive those messages. Message and data rates may apply depending on your carrier plan.',
    ],
  },
  {
    title: 'Data Retention',
    paragraphs: [
      'We retain information for as long as reasonably necessary to operate the site, maintain leaderboard integrity, comply with legal obligations, resolve disputes, and enforce agreements.',
      'Some information may persist in your browser until you clear it. Server-side session, result, lead, and user records may be retained for operational or business purposes unless deleted earlier.',
    ],
  },
  {
    title: 'Children’s Privacy',
    paragraphs: [
      'USA Test is intended for a general audience and is not directed to children under 13. If you believe a child under 13 has provided personal information through the site, please contact us so we can review and address the issue.',
    ],
  },
  {
    title: 'Your Choices and Requests',
    bullets: [
      'You can avoid providing post-test contact information by simply not submitting the leaderboard-claim form.',
      'You can clear browser-stored local data through your browser settings.',
      'You can stop future SMS communications by using the instructions included in the messages, when applicable.',
      'You can contact us regarding access, correction, or deletion requests, and we will review requests in light of applicable law and our legitimate business needs.',
    ],
  },
  {
    title: 'Security',
    paragraphs: [
      'We use reasonable administrative, technical, and organizational measures to protect information, but no internet transmission or storage method is completely secure. You use the site at your own risk.',
    ],
  },
  {
    title: 'Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. When we do, we will post the revised version on this page and update the effective date above. Continued use of USA Test after changes become effective means you accept the revised policy.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      'If you have questions about this Privacy Policy or want to contact us about privacy-related issues, use the Contact Us page on this site until a dedicated privacy contact address is published.',
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This Privacy Policy is adapted for USA Test based on the kinds of privacy topics commonly covered by consumer learning products, but it has been rewritten to reflect this site’s actual features and current data flows."
      effectiveDate="April 8, 2026"
      sections={PRIVACY_SECTIONS}
    />
  );
}
