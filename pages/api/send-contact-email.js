import nodemailer from 'nodemailer';

// Styling constants for consistent design
const STYLES = {
  colors: {
    primary: '#2563eb',
    secondary: '#1e40af',
    success: '#16a34a',
    info: '#0284c7',
    background: '#f8fafc',
    text: {
      primary: '#1e293b',
      secondary: '#475569',
      light: '#94a3b8'
    },
    border: '#e2e8f0'
  },
  spacing: {
    section: '30px',
    element: '20px',
    text: '15px'
  }
};

const createTransporter = () => {
  try {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });
  } catch (error) {
    console.error('Failed to create email transporter:', error);
    throw new Error('Email configuration error');
  }
};

const formatDateTime = (timestamp) => {
  try {
    return new Date(timestamp).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
      hour12: true
    });
  } catch (error) {
    console.error('Date formatting error:', error);
    return timestamp;
  }
};

const createEmailSection = ({ title, content, theme = 'default' }) => {
  const themes = {
    default: { bg: STYLES.colors.background, border: STYLES.colors.primary },
    success: { bg: '#f0fdf4', border: STYLES.colors.success },
    info: { bg: '#f0f9ff', border: STYLES.colors.info }
  };

  const currentTheme = themes[theme] || themes.default;

  return `
    <div style="
      margin: ${STYLES.spacing.section} 0;
      padding: ${STYLES.spacing.element};
      background-color: ${currentTheme.bg};
      border-left: 4px solid ${currentTheme.border};
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    ">
      <h2 style="
        color: ${STYLES.colors.text.primary};
        margin: 0 0 ${STYLES.spacing.text} 0;
        font-size: 1.5rem;
        font-weight: 600;
      ">${title}</h2>
      ${content}
    </div>
  `;
};

const formatUserInteractionData = (formData) => {
  if (!formData?.selectedSections) return '';

  const sectionData = Object.entries(formData.selectedSections).map(([section, viewed]) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid ${STYLES.colors.border};">
        ${section.charAt(0).toUpperCase() + section.slice(1)}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid ${STYLES.colors.border};">
        ${viewed ? '✅' : '❌'}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid ${STYLES.colors.border};">
        ${formData.expandedSections[section] ? '✅' : '❌'}
      </td>
    </tr>
  `).join('');

  return createEmailSection({
    title: 'User Interaction Summary',
    content: `
      <table style="
        width: 100%;
        border-collapse: collapse;
        background-color: white;
        border-radius: 8px;
        overflow: hidden;
      ">
        <thead>
          <tr style="background-color: ${STYLES.colors.background};">
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid ${STYLES.colors.border};">Section</th>
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid ${STYLES.colors.border};">Viewed</th>
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid ${STYLES.colors.border};">Expanded</th>
          </tr>
        </thead>
        <tbody>
          ${sectionData}
        </tbody>
      </table>
      ${formatFormResponses(formData.formResponses)}
    `,
    theme: 'info'
  });
};

const formatFormResponses = (responses) => {
  if (!responses) return '';

  // For safety, handle arrays for multi-select
  const responseItems = Object.entries(responses).map(([key, value]) => {
    const displayValue = Array.isArray(value) ? value.join(', ') : value;
    return `
      <div style="
        margin-bottom: ${STYLES.spacing.text};
        padding: ${STYLES.spacing.text};
        background-color: white;
        border-radius: 4px;
      ">
        <strong style="color: ${STYLES.colors.text.primary};">${key}:</strong>
        <span style="color: ${STYLES.colors.text.secondary}; margin-left: 8px;">${displayValue}</span>
      </div>
    `;
  }).join('');

  return `
    <div style="margin-top: ${STYLES.spacing.element};">
      <h3 style="
        color: ${STYLES.colors.text.primary};
        margin: 0 0 ${STYLES.spacing.text} 0;
      ">Form Responses</h3>
      ${responseItems}
    </div>
  `;
};

const formatAnalysisResults = (analysisData) => {
  if (!analysisData) return '';

  const formatMatchScore = (score) => {
    if (!score) return 'Not Available';
    const numScore = parseFloat(score);
    return isNaN(numScore) ? score : `${Math.round(numScore)}%`;
  };

  const formatSection = (data, title) => {
    if (!data?.sections) return '';

    const sectionsHtml = data.sections.map(section => `
      <div style="
        margin-bottom: ${STYLES.spacing.text};
        padding: ${STYLES.spacing.text};
        background-color: white;
        border-radius: 8px;
      ">
        <h4 style="
          color: ${STYLES.colors.text.primary};
          margin: 0 0 10px 0;
        ">${section.title || ''}</h4>
        ${section.highlight ? `
          <p style="
            color: ${STYLES.colors.primary};
            font-weight: 600;
            margin: 8px 0;
          ">${section.highlight}</p>
        ` : ''}
        <p style="
          margin: 8px 0;
          line-height: 1.6;
          color: ${STYLES.colors.text.secondary};
        ">${section.content || ''}</p>
      </div>
    `).join('');

    return createEmailSection({
      title,
      content: sectionsHtml,
      theme: 'info'
    });
  };

  return `
    ${formatSection(analysisData.candidateProfile, 'Candidate Profile Analysis')}
    ${formatSection(analysisData.assessmentFramework, 'Assessment Framework')}
    ${createEmailSection({
      title: 'Match Evaluation',
      content: `
        <div style="
          padding: ${STYLES.spacing.text};
          background-color: white;
          border-radius: 8px;
        ">
          <div style="
            font-size: 1.25rem;
            color: ${STYLES.colors.success};
            font-weight: 600;
            margin-bottom: ${STYLES.spacing.text};
          ">
            Match Score: ${formatMatchScore(analysisData.matchScore)}
          </div>
          ${analysisData.expertMatch ? `
            <div style="
              margin-top: ${STYLES.spacing.text};
              padding: ${STYLES.spacing.text};
              background-color: ${STYLES.colors.background};
              border-radius: 4px;
            ">
              <pre style="
                margin: 0;
                white-space: pre-wrap;
                font-family: monospace;
                color: ${STYLES.colors.text.secondary};
              ">${JSON.stringify(analysisData.expertMatch, null, 2)}</pre>
            </div>
          ` : ''}
        </div>
      `,
      theme: 'success'
    })}
  `;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message, analysisData, formData, timestamp, source } = req.body;

    // Example: Ensure you pass an array for multiple-choice question #7
    // analysisData.questionnaire.answers = {
    //   7: ["programming", "data"],  // multiselect
    //   6: "range_2",               // single choice
    //   ...
    // }

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const transporter = createTransporter();
    const formattedDate = formatDateTime(timestamp);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'gm.scalabrin@gmail.com',
      subject: `Civetta AI Analysis - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.5;
            color: ${STYLES.colors.text.primary};
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          ">
            ${createEmailSection({
              title: 'New Analysis Submission',
              content: `
                <p style="color: ${STYLES.colors.text.secondary}; margin: 0;">
                  Received on ${formattedDate}
                </p>
              `,
              theme: 'default'
            })}

            ${createEmailSection({
              title: 'Contact Information',
              content: `
                <div style="
                  background-color: white;
                  padding: ${STYLES.spacing.text};
                  border-radius: 8px;
                ">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="
                        padding: 12px 0;
                        color: ${STYLES.colors.text.primary};
                        font-weight: 600;
                        width: 120px;
                      ">Name:</td>
                      <td style="padding: 12px 0;">${name}</td>
                    </tr>
                    <tr>
                      <td style="
                        padding: 12px 0;
                        color: ${STYLES.colors.text.primary};
                        font-weight: 600;
                      ">Email:</td>
                      <td style="padding: 12px 0;">${email}</td>
                    </tr>
                    <tr>
                      <td style="
                        padding: 12px 0;
                        color: ${STYLES.colors.text.primary};
                        font-weight: 600;
                      ">Source:</td>
                      <td style="padding: 12px 0;">${source}</td>
                    </tr>
                  </table>

                  <div style="margin-top: ${STYLES.spacing.element};">
                    <h3 style="
                      color: ${STYLES.colors.text.primary};
                      margin: 0 0 ${STYLES.spacing.text} 0;
                    ">Message</h3>
                    <div style="
                      background-color: ${STYLES.colors.background};
                      padding: ${STYLES.spacing.text};
                      border-radius: 6px;
                    ">${message}</div>
                  </div>
                </div>
              `,
              theme: 'info'
            })}

            ${formatUserInteractionData(formData)}
            ${formatAnalysisResults(analysisData)}
          </body>
        </html>
      `,
      replyTo: email,
      attachments: [
        {
          filename: 'analysis-data.json',
          content: JSON.stringify(
            {
              analysisData,
              formData,
              contactInfo: { name, email, message, timestamp, source }
            },
            null,
            2
          ),
          contentType: 'application/json'
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully' });

  } catch (error) {
    console.error('Failed to send email:', error);
    return res.status(500).json({
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
