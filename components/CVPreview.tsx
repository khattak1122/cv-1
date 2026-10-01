/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useMemo } from 'react';
import { CVData } from '@/types/cv';
import { resolveTemplate, COLOR_SCHEMES } from '@/lib/template-engine';
import { calculateCVDensity } from '@/lib/cv-density';
import { parseExperience, parseEducation } from '@/lib/cv-parser';
import { Mail, Phone, MapPin, Calendar, Building2, GraduationCap, Briefcase } from 'lucide-react';

interface CVPreviewProps {
  data: CVData;
}

export function CVPreview({ data }: CVPreviewProps) {
  const {
    name,
    job,
    phone,
    email,
    location,
    photoUrl,
    about,
    education,
    experience,
    skills,
    languages,
    template,
    photoPosition: customPhotoPos,
    layoutOverride,
    fontOverride,
    colorOverride,
  } = data;

  const styleConfig = resolveTemplate(template);
  const layout = layoutOverride || styleConfig.layout;
  const font = fontOverride || styleConfig.font;
  const photoPosition = customPhotoPos || styleConfig.photoPosition || (layout === 'full-height-sidebar' ? 'sidebar' : 'left');

  // Check if a color scheme override is applied
  const activeColor = colorOverride
    ? COLOR_SCHEMES.find(c => c.id === colorOverride) || styleConfig.colors
    : styleConfig.colors;

  // Calculate intelligent dynamic density and sizing based on content
  const density = useMemo(() => {
    return calculateCVDensity(data, layout);
  }, [data, layout]);

  // Parse structured experience & education
  const parsedJobs = useMemo(() => parseExperience(experience), [experience]);
  const parsedEdu = useMemo(() => parseEducation(education), [education]);

  const fontClass =
    font === 'serif' ? 'font-serif' :
    font === 'mono' ? 'font-mono' : 'font-sans';

  // Section Heading Class with dynamic sizing and subtle divider
  const sectionHeadingClass = `${density.sectionHeadingClass} ${density.sectionHeadingPaddingBottom} ${density.sectionHeadingMarginBottom} flex items-center justify-between gap-2 ${activeColor.sectionTitle} ${activeColor.sectionLine}`;
  const sidebarSectionHeadingClass = `${density.sectionHeadingClass} ${density.sectionHeadingPaddingBottom} ${density.sectionHeadingMarginBottom} flex items-center justify-between gap-2 text-white border-b border-white/30`;

  // Avatar element rendering with id="cvPhoto"
  const renderAvatar = (extraClass: string = '') => {
    if (photoPosition === 'hidden') {
      return <img id="cvPhoto" src="" alt="" className="hidden" />;
    }

    const sizeClass = extraClass || density.avatarSize;

    if (photoUrl) {
      return (
        <img
          id="cvPhoto"
          src={photoUrl}
          alt={name || 'Profile photo'}
          className={`${sizeClass} rounded-full object-cover shrink-0 bg-stone-800 border-2 border-white/90 shadow-md`}
        />
      );
    }

    return (
      <>
        <div
          id="cvPhotoPlaceholder"
          className={`${sizeClass} rounded-full shrink-0 flex items-center justify-center font-bold text-lg sm:text-xl uppercase bg-black/20 text-white/90 border border-white/20`}
        >
          {name ? name.split(' ').map(n => n[0]).slice(0, 2).join('') : 'CV'}
        </div>
        <img id="cvPhoto" src="" alt="" className="hidden" />
      </>
    );
  };

  // Render professional summary / profile
  const renderProfile = (isSidebar = false) => {
    if (!about || about.trim() === '') {
      return (
        <p id="cvAbout" className={`${density.summaryFontSize} ${density.summaryLineHeight} text-stone-400 italic`}>
          Your professional profile will appear here.
        </p>
      );
    }

    const paragraphs = about.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);

    return (
      <div id="cvAbout" className={`space-y-2 ${density.summaryFontSize} ${density.summaryLineHeight} ${isSidebar ? 'text-white/90' : 'text-stone-700'}`}>
        {paragraphs.map((para, idx) => (
          <p key={idx} className="break-words leading-relaxed text-justify">
            {para}
          </p>
        ))}
      </div>
    );
  };

  // Render Experience with enhanced readability and job hierarchy
  const renderExperienceSection = () => {
    if (!experience || experience.trim() === '') {
      return (
        <div id="cvExperience" className={`${density.bodyFontSize} ${density.bodyLineHeight} text-stone-400 italic`}>
          Your experience will appear here.
        </div>
      );
    }

    if (parsedJobs.length > 0) {
      return (
        <div id="cvExperience" className="space-y-4">
          {parsedJobs.map((jobEntry, idx) => (
            <div
              key={jobEntry.id || idx}
              className={`page-break-avoid ${idx !== parsedJobs.length - 1 ? (density.level === 'spacious' ? 'pb-4 mb-4 border-b border-stone-100' : 'pb-3 mb-3 border-b border-stone-100/80') : ''}`}
            >
              {/* Job Title and Date Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                <h4 className={`${density.jobTitleSize} tracking-tight`}>
                  {jobEntry.title}
                </h4>
                {jobEntry.dates && (
                  <span className={`${density.jobDateSize} shrink-0 flex items-center gap-1 font-mono sm:text-right`}>
                    <Calendar className="w-3 h-3 text-stone-400 opacity-80 inline sm:hidden" />
                    <span>{jobEntry.dates}</span>
                  </span>
                )}
              </div>

              {/* Company / Location Subtitle */}
              {jobEntry.subtitle && (
                <div className={`${density.jobCompanySize} mb-2 flex items-center gap-1.5 flex-wrap`}>
                  <Building2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{jobEntry.subtitle}</span>
                </div>
              )}

              {/* Bullet points or description */}
              {jobEntry.bullets.length > 0 ? (
                <ul className="space-y-1.5 pl-0 mt-1.5">
                  {jobEntry.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className={`flex items-start gap-2.5 ${density.bodyFontSize} ${density.bulletLineHeight} text-stone-700`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0 mt-2 select-none" />
                      <span className="flex-1 break-words">{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : jobEntry.rawText ? (
                <div className={`whitespace-pre-line ${density.bodyFontSize} ${density.bodyLineHeight} text-stone-700`}>
                  {jobEntry.rawText}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      );
    }

    // Fallback: render formatted raw text with enhanced line-height and typography
    const lines = experience.split('\n');
    return (
      <div id="cvExperience" className={`space-y-1 ${density.bodyFontSize} ${density.bodyLineHeight} text-stone-700`}>
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
            const content = trimmed.replace(/^[-*•]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2.5 my-1 break-words">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0 mt-2 select-none" />
                <span className="flex-1 break-words">{content}</span>
              </div>
            );
          }
          return (
            <div key={idx} className="break-words">
              {line || '\u00A0'}
            </div>
          );
        })}
      </div>
    );
  };

  // Render Education with enhanced structure
  const renderEducationSection = () => {
    if (!education || education.trim() === '') {
      return (
        <div id="cvEducation" className={`${density.bodyFontSize} ${density.bodyLineHeight} text-stone-400 italic`}>
          Your education will appear here.
        </div>
      );
    }

    if (parsedEdu.length > 0) {
      return (
        <div id="cvEducation" className="space-y-3">
          {parsedEdu.map((eduEntry, idx) => (
            <div
              key={eduEntry.id || idx}
              className={`page-break-avoid ${idx !== parsedEdu.length - 1 ? 'pb-2.5 mb-2.5 border-b border-stone-100/70' : ''}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-0.5">
                <h4 className={`${density.jobTitleSize} tracking-tight`}>
                  {eduEntry.degree}
                </h4>
                {eduEntry.dates && (
                  <span className={`${density.jobDateSize} shrink-0 font-mono sm:text-right`}>
                    {eduEntry.dates}
                  </span>
                )}
              </div>
              {eduEntry.institution && (
                <div className={`${density.jobCompanySize} flex items-center gap-1.5`}>
                  <GraduationCap className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{eduEntry.institution}</span>
                </div>
              )}
              {eduEntry.details.length > 0 && (
                <ul className="space-y-1 pl-0 mt-1">
                  {eduEntry.details.map((detail, dIdx) => (
                    <li
                      key={dIdx}
                      className={`flex items-start gap-2 ${density.bodyFontSize} ${density.bodyLineHeight} text-stone-600`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-300 shrink-0 mt-2 select-none" />
                      <span className="flex-1">{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      );
    }

    const lines = education.split('\n');
    return (
      <div id="cvEducation" className={`space-y-1 ${density.bodyFontSize} ${density.bodyLineHeight} text-stone-700`}>
        {lines.map((line, idx) => (
          <div key={idx} className="break-words">
            {line || '\u00A0'}
          </div>
        ))}
      </div>
    );
  };

  // Render Skills tags with readable padding and spacing
  const renderSkills = (isSidebarDark = false) => {
    if (!skills || skills.trim() === '') {
      return (
        <span className={isSidebarDark ? "text-white/60 italic text-xs" : "text-stone-400 italic text-xs"}>
          Your skills will appear here.
        </span>
      );
    }
    const items = skills.split('\n').map(s => s.trim()).filter(Boolean);
    if (items.length > 0) {
      return (
        <div className={`flex flex-wrap ${density.skillsGapClass}`}>
          {items.map((skill, index) => (
            <span
              key={index}
              className={`inline-block font-medium tracking-wide transition-colors ${density.skillChipClass} ${
                isSidebarDark
                  ? 'bg-white/20 border border-white/30 text-white shadow-2xs'
                  : `${activeColor.tagBg} ${activeColor.tagBorder} ${activeColor.tagText} border`
              }`}
            >
              {skill.replace(/^[-*•]\s*/, '')}
            </span>
          ))}
        </div>
      );
    }
    return <span className={`whitespace-pre-line ${isSidebarDark ? 'text-white/90' : 'text-stone-700'}`}>{skills}</span>;
  };

  // Render Languages tags with readable padding and spacing
  const renderLanguages = (isSidebarDark = false) => {
    if (!languages || languages.trim() === '') {
      return (
        <span className={isSidebarDark ? "text-white/60 italic text-xs" : "text-stone-400 italic text-xs"}>
          Your languages will appear here.
        </span>
      );
    }
    const items = languages.split('\n').map(s => s.trim()).filter(Boolean);
    if (items.length > 0) {
      return (
        <div className={`flex flex-wrap ${density.skillsGapClass}`}>
          {items.map((lang, index) => (
            <span
              key={index}
              className={`inline-block font-medium tracking-wide transition-colors ${density.skillChipClass} ${
                isSidebarDark
                  ? 'bg-white/15 border border-white/25 text-white/95 shadow-2xs'
                  : `${activeColor.tagBg} ${activeColor.tagBorder} ${activeColor.tagText} border`
              }`}
            >
              {lang.replace(/^[-*•]\s*/, '')}
            </span>
          ))}
        </div>
      );
    }
    return <span className={`whitespace-pre-line ${isSidebarDark ? 'text-white/90' : 'text-stone-700'}`}>{languages}</span>;
  };

  // =========================================================================
  // 1. FULL-HEIGHT TOP-TO-BOTTOM COLORED LEFT SIDEBAR LAYOUT
  //    Rewritten using display: table and display: table-cell with dynamic spacing
  // =========================================================================
  if (layout === 'full-height-sidebar') {
    return (
      <div className="preview-area w-full flex justify-center py-2 print:!p-0 print:!m-0 print:!block">
        <div
          id="cv"
          data-template-id="cv-template"
          data-density={density.level}
          className={`cv-paper cv-container resume-container container full-height-sidebar-layout cv-table w-full max-w-[800px] min-h-[1123px] shadow-xl border rounded-lg transition-all duration-300 bg-white ${fontClass} ${activeColor.cardBorder} overflow-hidden`}
          style={{
            display: 'table',
            tableLayout: 'fixed',
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <div
            className="cv-table-row cv-row"
            style={{ display: 'table-row', width: '100%' }}
          >
            {/* Top-to-Bottom Full-Height Colored Left Column Table-Cell */}
            <div
              className={`sidebar left-column cv-table-cell ${activeColor.headerBg} text-white ${density.sidebarPaddingClass}`}
              style={{
                display: 'table-cell',
                verticalAlign: 'top',
                width: '32%',
                boxSizing: 'border-box',
              }}
            >
              {/* Profile image in top left of sidebar */}
              <div className="flex flex-col items-center text-center pb-3 border-b border-white/20">
                {renderAvatar('w-26 h-26 sm:w-30 sm:h-30 mb-2.5 border-3 border-white/35 shadow-lg')}
                <div className="text-white/80 text-[11px] font-mono tracking-wider uppercase mt-1">
                  #{styleConfig.number} {styleConfig.name}
                </div>
              </div>

              {/* Contact Details in Colored Left Sidebar */}
              <div className="space-y-2.5">
                <h2 className={sidebarSectionHeadingClass}>CONTACT</h2>
                <div className="space-y-2">
                  <p id="cvPhone" className={`flex items-center gap-2 text-white/95 ${density.contactFontSize}`}>
                    <Phone className="w-4 h-4 text-white/80 shrink-0" />
                    <span className="break-all">{phone || 'Phone number'}</span>
                  </p>
                  <p id="cvEmail" className={`flex items-center gap-2 text-white/95 ${density.contactFontSize}`}>
                    <Mail className="w-4 h-4 text-white/80 shrink-0" />
                    <span className="break-all">{email || 'Email address'}</span>
                  </p>
                  <p id="cvLocation" className={`flex items-center gap-2 text-white/95 ${density.contactFontSize}`}>
                    <MapPin className="w-4 h-4 text-white/80 shrink-0" />
                    <span>{location || 'Location'}</span>
                  </p>
                </div>
              </div>

              {/* Skills in Left Column */}
              <div className="cv-section section">
                <h2 className={sidebarSectionHeadingClass}>SKILLS</h2>
                <div id="cvSkills" className="text-white leading-relaxed">
                  {renderSkills(true)}
                </div>
              </div>

              {/* Languages in Left Column */}
              <div className="cv-section section">
                <h2 className={sidebarSectionHeadingClass}>LANGUAGES</h2>
                <div id="cvLanguages" className="text-white leading-relaxed">
                  {renderLanguages(true)}
                </div>
              </div>

              {/* Sidebar bottom indicator */}
              <div className="pt-4 border-t border-white/20 text-[11px] text-white/70">
                <span>Standard A4 Single-Page Profile</span>
              </div>
            </div>

            {/* Right Column Body Table-Cell */}
            <div
              className={`main-content right-column cv-table-cell bg-white ${density.mainPaddingClass}`}
              style={{
                display: 'table-cell',
                verticalAlign: 'top',
                width: '68%',
                boxSizing: 'border-box',
              }}
            >
              {/* Header Zone with Name and Job Title */}
              <div className="cv-header pb-4 border-b border-stone-200 mb-2">
                <h1 id="cvName" className={`${density.nameFontSize} tracking-tight text-stone-900 leading-tight`}>
                  {name || <span className="opacity-50">Your Name</span>}
                </h1>
                <h3 id="cvJob" className={`${density.jobTitleFontSize} mt-1.5 tracking-wider uppercase ${activeColor.sectionTitle}`}>
                  {job || <span className="opacity-50">Your Job Title</span>}
                </h3>
              </div>

              {/* Profile */}
              <div className="cv-section section">
                <h2 className={sectionHeadingClass}>PROFILE</h2>
                {renderProfile(false)}
              </div>

              {/* Experience */}
              <div className="cv-section section">
                <h2 className={sectionHeadingClass}>EXPERIENCE</h2>
                {renderExperienceSection()}
              </div>

              {/* Education */}
              <div className="cv-section section">
                <h2 className={sectionHeadingClass}>EDUCATION</h2>
                {renderEducationSection()}
              </div>

              {/* Footer watermark */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 mt-4">
                <span>CV Style #{styleConfig.number}: {styleConfig.name}</span>
                <span className="no-print">Formatted for A4 Single-Page PDF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. STANDARD / OTHER LAYOUTS WITH DYNAMIC SPACING & PROPORTIONS
  // =========================================================================
  return (
    <div className="preview-area w-full flex justify-center py-2 print:!p-0 print:!m-0 print:!block">
      <div
        id="cv"
        data-template-id="cv-template"
        data-density={density.level}
        className={`cv-paper cv-container resume-container container w-full max-w-[800px] min-h-[1123px] shadow-xl border rounded-lg transition-all duration-300 bg-white ${fontClass} ${activeColor.cardBorder} overflow-hidden flex flex-col justify-between`}
        style={{
          boxSizing: 'border-box',
        }}
      >
        <div>
          {/* Header Layout */}
          <div
            className={`cv-header ${density.headerPaddingClass} transition-colors ${activeColor.headerBg}`}
            style={{ width: '100%', boxSizing: 'border-box' }}
          >
            {photoPosition === 'center' ? (
              <div className="flex flex-col items-center text-center gap-3">
                {renderAvatar()}
                <div>
                  <div className="flex items-center justify-center gap-2">
                    <h1 id="cvName" className={`${density.nameFontSize} tracking-tight ${activeColor.headerText}`}>
                      {name || <span className="opacity-50">Your Name</span>}
                    </h1>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-black/25 text-white/80 border border-white/20">
                      #{styleConfig.number}
                    </span>
                  </div>
                  <h3 id="cvJob" className={`${density.jobTitleFontSize} mt-1 tracking-wider uppercase ${activeColor.headerJob}`}>
                    {job || <span className="opacity-50">Your Job Title</span>}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 mt-2.5 text-xs sm:text-sm">
                    <span id="cvPhone" className={`inline-flex items-center gap-1.5 ${density.contactFontSize} ${activeColor.headerContact}`}>
                      <Phone className="w-3.5 h-3.5 opacity-80 shrink-0" />
                      <span>{phone || 'Phone number'}</span>
                    </span>
                    <span id="cvEmail" className={`inline-flex items-center gap-1.5 ${density.contactFontSize} ${activeColor.headerContact}`}>
                      <Mail className="w-3.5 h-3.5 opacity-80 shrink-0" />
                      <span>{email || 'Email address'}</span>
                    </span>
                    <span id="cvLocation" className={`inline-flex items-center gap-1.5 ${density.contactFontSize} ${activeColor.headerContact}`}>
                      <MapPin className="w-3.5 h-3.5 opacity-80 shrink-0" />
                      <span>{location || 'Location'}</span>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="cv-table w-full"
                style={{
                  display: 'table',
                  tableLayout: 'fixed',
                  width: '100%',
                  borderCollapse: 'collapse',
                }}
              >
                <div
                  className="cv-table-row"
                  style={{ display: 'table-row', width: '100%' }}
                >
                  {/* Left Photo if photoPosition !== right and !== sidebar */}
                  {photoPosition !== 'sidebar' && photoPosition !== 'right' && (
                    <div
                      className="cv-table-cell"
                      style={{
                        display: 'table-cell',
                        verticalAlign: 'middle',
                        width: '105px',
                        paddingRight: '18px',
                      }}
                    >
                      {renderAvatar()}
                    </div>
                  )}

                  {/* Name, Job & Contact Table Cell */}
                  <div
                    className="cv-table-cell"
                    style={{
                      display: 'table-cell',
                      verticalAlign: 'middle',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <h1 id="cvName" className={`${density.nameFontSize} tracking-tight ${activeColor.headerText}`}>
                        {name || <span className="opacity-50">Your Name</span>}
                      </h1>
                      <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-black/25 text-white/80 border border-white/20">
                        #{styleConfig.number}
                      </span>
                    </div>
                    <h3 id="cvJob" className={`${density.jobTitleFontSize} mt-1 tracking-wider uppercase ${activeColor.headerJob}`}>
                      {job || <span className="opacity-50">Your Job Title</span>}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2.5">
                      <span id="cvPhone" className={`inline-flex items-center gap-1.5 ${density.contactFontSize} ${activeColor.headerContact}`}>
                        <Phone className="w-3.5 h-3.5 opacity-80 shrink-0" />
                        <span>{phone || 'Phone number'}</span>
                      </span>
                      <span id="cvEmail" className={`inline-flex items-center gap-1.5 ${density.contactFontSize} ${activeColor.headerContact}`}>
                        <Mail className="w-3.5 h-3.5 opacity-80 shrink-0" />
                        <span>{email || 'Email address'}</span>
                      </span>
                      <span id="cvLocation" className={`inline-flex items-center gap-1.5 ${density.contactFontSize} ${activeColor.headerContact}`}>
                        <MapPin className="w-3.5 h-3.5 opacity-80 shrink-0" />
                        <span>{location || 'Location'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Right Photo if photoPosition === right */}
                  {photoPosition === 'right' && (
                    <div
                      className="cv-table-cell"
                      style={{
                        display: 'table-cell',
                        verticalAlign: 'middle',
                        width: '105px',
                        textAlign: 'right',
                      }}
                    >
                      {renderAvatar()}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* CV Body depending on layout */}
          {layout === 'left-sidebar' ? (
            /* 2-Column Left Sidebar via display: table and table-cell */
            <div
              className="cv-body cv-table w-full min-h-[920px]"
              style={{
                display: 'table',
                tableLayout: 'fixed',
                width: '100%',
                borderCollapse: 'collapse',
              }}
            >
              <div
                className="cv-table-row cv-row"
                style={{ display: 'table-row', width: '100%' }}
              >
                {/* Left Column Table-Cell */}
                <div
                  className={`sidebar left-column cv-table-cell border-r ${activeColor.sidebarBg || 'bg-stone-50/70'} ${activeColor.sidebarBorder || 'border-stone-200'} ${density.sidebarPaddingClass}`}
                  style={{
                    display: 'table-cell',
                    verticalAlign: 'top',
                    width: '32%',
                    boxSizing: 'border-box',
                  }}
                >
                  {photoPosition === 'sidebar' && (
                    <div className="flex justify-center pb-3">
                      {renderAvatar()}
                    </div>
                  )}
                  <div className="cv-section section">
                    <h2 className={sectionHeadingClass}>SKILLS</h2>
                    <div id="cvSkills" className="text-stone-700 leading-relaxed">
                      {renderSkills(false)}
                    </div>
                  </div>
                  <div className="cv-section section">
                    <h2 className={sectionHeadingClass}>LANGUAGES</h2>
                    <div id="cvLanguages" className="text-stone-700 leading-relaxed">
                      {renderLanguages(false)}
                    </div>
                  </div>
                </div>

                {/* Right Main Content Table-Cell */}
                <div
                  className={`main-content right-column cv-table-cell ${density.mainPaddingClass}`}
                  style={{
                    display: 'table-cell',
                    verticalAlign: 'top',
                    width: '68%',
                    boxSizing: 'border-box',
                  }}
                >
                  <div className="cv-section section">
                    <h2 className={sectionHeadingClass}>PROFILE</h2>
                    {renderProfile(false)}
                  </div>
                  <div className="cv-section section">
                    <h2 className={sectionHeadingClass}>EXPERIENCE</h2>
                    {renderExperienceSection()}
                  </div>
                  <div className="cv-section section">
                    <h2 className={sectionHeadingClass}>EDUCATION</h2>
                    {renderEducationSection()}
                  </div>
                </div>
              </div>
            </div>
          ) : layout === 'right-sidebar' ? (
            /* 2-Column Right Sidebar via display: table and table-cell */
            <div
              className="cv-body cv-table w-full min-h-[920px]"
              style={{
                display: 'table',
                tableLayout: 'fixed',
                width: '100%',
                borderCollapse: 'collapse',
              }}
            >
              <div
                className="cv-table-row cv-row"
                style={{ display: 'table-row', width: '100%' }}
              >
                {/* Main Content Table-Cell (Left) */}
                <div
                  className={`main-content right-column cv-table-cell border-r border-stone-200 ${density.mainPaddingClass}`}
                  style={{
                    display: 'table-cell',
                    verticalAlign: 'top',
                    width: '68%',
                    boxSizing: 'border-box',
                  }}
                >
                  <div className="cv-section section">
                    <h2 className={sectionHeadingClass}>PROFILE</h2>
                    {renderProfile(false)}
                  </div>
                  <div className="cv-section section">
                    <h2 className={sectionHeadingClass}>EXPERIENCE</h2>
                    {renderExperienceSection()}
                  </div>
                  <div className="cv-section section">
                    <h2 className={sectionHeadingClass}>EDUCATION</h2>
                    {renderEducationSection()}
                  </div>
                </div>

                {/* Sidebar Table-Cell (Right) */}
                <div
                  className={`sidebar left-column cv-table-cell ${activeColor.sidebarBg || 'bg-stone-50/70'} ${density.sidebarPaddingClass}`}
                  style={{
                    display: 'table-cell',
                    verticalAlign: 'top',
                    width: '32%',
                    boxSizing: 'border-box',
                  }}
                >
                  {photoPosition === 'sidebar' && (
                    <div className="flex justify-center pb-3">
                      {renderAvatar()}
                    </div>
                  )}
                  <div className="cv-section section">
                    <h2 className={sectionHeadingClass}>SKILLS</h2>
                    <div id="cvSkills" className="text-stone-700 leading-relaxed">
                      {renderSkills(false)}
                    </div>
                  </div>
                  <div className="cv-section section">
                    <h2 className={sectionHeadingClass}>LANGUAGES</h2>
                    <div id="cvLanguages" className="text-stone-700 leading-relaxed">
                      {renderLanguages(false)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : layout === 'timeline' ? (
            /* Timeline layout with vertical track */
            <div className={`main-content w-full ${density.mainPaddingClass}`}>
              <div className="cv-section section">
                <h2 className={sectionHeadingClass}>PROFILE</h2>
                {renderProfile(false)}
              </div>
              <div className="cv-section section">
                <h2 className={sectionHeadingClass}>EXPERIENCE</h2>
                <div className="relative pl-4 border-l-2 border-stone-200 space-y-3">
                  {renderExperienceSection()}
                </div>
              </div>
              <div className="cv-section section">
                <h2 className={sectionHeadingClass}>EDUCATION</h2>
                <div className="relative pl-4 border-l-2 border-stone-200">
                  {renderEducationSection()}
                </div>
              </div>
              {/* Side-by-side Skills & Languages using display: table */}
              <div
                className="cv-table w-full pt-2"
                style={{
                  display: 'table',
                  tableLayout: 'fixed',
                  width: '100%',
                  borderCollapse: 'collapse',
                }}
              >
                <div style={{ display: 'table-row', width: '100%' }}>
                  <div
                    className="cv-section section"
                    style={{
                      display: 'table-cell',
                      verticalAlign: 'top',
                      width: '50%',
                      paddingRight: '14px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <h2 className={sectionHeadingClass}>SKILLS</h2>
                    <div id="cvSkills" className="leading-relaxed">
                      {renderSkills(false)}
                    </div>
                  </div>
                  <div
                    className="cv-section section"
                    style={{
                      display: 'table-cell',
                      verticalAlign: 'top',
                      width: '50%',
                      paddingLeft: '14px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <h2 className={sectionHeadingClass}>LANGUAGES</h2>
                    <div id="cvLanguages" className="leading-relaxed">
                      {renderLanguages(false)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Single Column / Minimal ATS / Top Banner */
            <div className={`main-content w-full ${density.mainPaddingClass}`}>
              <div className="cv-section section">
                <h2 className={sectionHeadingClass}>PROFILE</h2>
                {renderProfile(false)}
              </div>
              <div className="cv-section section">
                <h2 className={sectionHeadingClass}>EXPERIENCE</h2>
                {renderExperienceSection()}
              </div>
              <div className="cv-section section">
                <h2 className={sectionHeadingClass}>EDUCATION</h2>
                {renderEducationSection()}
              </div>
              {/* Side-by-side Skills & Languages */}
              <div
                className="cv-table w-full pt-2"
                style={{
                  display: 'table',
                  tableLayout: 'fixed',
                  width: '100%',
                  borderCollapse: 'collapse',
                }}
              >
                <div style={{ display: 'table-row', width: '100%' }}>
                  <div
                    className="cv-section section"
                    style={{
                      display: 'table-cell',
                      verticalAlign: 'top',
                      width: '50%',
                      paddingRight: '14px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <h2 className={sectionHeadingClass}>SKILLS</h2>
                    <div id="cvSkills" className="leading-relaxed">
                      {renderSkills(false)}
                    </div>
                  </div>
                  <div
                    className="cv-section section"
                    style={{
                      display: 'table-cell',
                      verticalAlign: 'top',
                      width: '50%',
                      paddingLeft: '14px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <h2 className={sectionHeadingClass}>LANGUAGES</h2>
                    <div id="cvLanguages" className="leading-relaxed">
                      {renderLanguages(false)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer print-safe watermark */}
        <div className="px-6 py-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
          <span>CV Style #{styleConfig.number}: {styleConfig.name} ({layout}, {photoPosition} photo)</span>
          <span className="no-print">Formatted for A4 Single-Page PDF ({density.level})</span>
        </div>
      </div>
    </div>
  );
}
