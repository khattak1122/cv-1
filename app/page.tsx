'use client';

import React, { useState, useEffect } from 'react';
import { CVData, TemplateId, SAMPLE_CV_DATA } from '@/types/cv';
import { resolveTemplate } from '@/lib/template-engine';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CVForm } from '@/components/CVForm';
import { CVPreview } from '@/components/CVPreview';
import { TemplatesSection } from '@/components/TemplatesSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { Footer } from '@/components/Footer';
import { StylesModal } from '@/components/StylesModal';
import { 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  Edit3, 
  Download,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Dice5,
  Loader2,
  FileCheck,
  Maximize2
} from 'lucide-react';

export default function Home() {
  const [cvData, setCvData] = useState<CVData>(SAMPLE_CV_DATA);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [previewZoom, setPreviewZoom] = useState<number>(100);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [isStylesModalOpen, setIsStylesModalOpen] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);

  const currentStyle = resolveTemplate(cvData.template);

  // Responsive auto-fit zoom on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setPreviewZoom(50);
      } else if (window.innerWidth < 1024) {
        setPreviewZoom(75);
      } else {
        setPreviewZoom(100);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Expose print utilities globally so any button or automated script can call them directly
  useEffect(() => {
    const win = window as unknown as { 
      downloadCV?: () => void;
      printCV?: () => void;
      createPDF?: () => void;
    };

    win.downloadCV = () => {
      setActiveTab('preview');
      setTimeout(() => {
        window.print();
      }, 50);
    };

    win.printCV = () => {
      setActiveTab('preview');
      setTimeout(() => {
        window.print();
      }, 50);
    };

    win.createPDF = () => {
      setShowPrintModal(true);
    };

    return () => {
      delete win.downloadCV;
      delete win.printCV;
      delete win.createPDF;
    };
  }, []);

  // Listen to browser print events to ensure activeTab is set to preview
  useEffect(() => {
    const handleBeforePrint = () => {
      setActiveTab('preview');
    };
    window.addEventListener('beforeprint', handleBeforePrint);
    return () => window.removeEventListener('beforeprint', handleBeforePrint);
  }, []);

  const handleDownloadCV = () => {
    setShowPrintModal(true);
  };

  const handleDirectPrint = () => {
    setActiveTab('preview');
    setTimeout(() => {
      window.print();
    }, 50);
  };

  const executePrint = () => {
    setShowPrintModal(false);
    setActiveTab('preview');
    setTimeout(() => {
      window.print();
    }, 50);
  };

  const exportWithHtml2Pdf = async () => {
    const cvElement = document.getElementById('cv');
    if (!cvElement) return;

    const previousZoom = previewZoom;
    try {
      setIsExportingPdf(true);
      setActiveTab('preview');
      // Reset zoom to 100% for pristine 1:1 pixel rendering during canvas capture
      setPreviewZoom(100);
      await new Promise(r => setTimeout(r, 150));

      const { default: html2canvas } = await import('html2canvas-pro');
      const { jsPDF } = await import('jspdf');

      const cleanFileName = (cvData.name || 'Resume').trim().replace(/[^a-zA-Z0-9_-]/g, '_');

      // html2canvas-pro natively parses oklch(), oklab(), and modern CSS colors
      const canvas = await html2canvas(cvElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1024,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // Standard A4 dimensions: 210mm x 297mm
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
      pdf.save(`${cleanFileName}_CV.pdf`);
      setShowPrintModal(false);
    } catch (err) {
      console.error('PDF export failed, falling back to window.print():', err);
      executePrint();
    } finally {
      setPreviewZoom(previousZoom);
      setIsExportingPdf(false);
    }
  };

  const handleTemplateSelect = (template: TemplateId) => {
    setCvData((prev) => ({
      ...prev,
      template,
      layoutOverride: undefined,
      fontOverride: undefined,
      colorOverride: undefined,
    }));
  };

  const handleNextStyle = () => {
    const nextNum = currentStyle.number >= 1000 ? 1 : currentStyle.number + 1;
    handleTemplateSelect(`template-${nextNum}`);
  };

  const handlePrevStyle = () => {
    const prevNum = currentStyle.number <= 1 ? 1000 : currentStyle.number - 1;
    handleTemplateSelect(`template-${prevNum}`);
  };

  const handleRandomStyle = () => {
    const randNum = Math.floor(Math.random() * 1000) + 1;
    handleTemplateSelect(`template-${randNum}`);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans text-stone-900 selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <Header onQuickPrint={handleDownloadCV} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Builder Section */}
        <section id="builder" className="builder py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Mobile Tab Toggle */}
          <div className="lg:hidden flex items-center justify-center p-1 mb-6 bg-stone-200/80 rounded-xl max-w-md mx-auto no-print">
            <button
              type="button"
              onClick={() => setActiveTab('form')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'form'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Details</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'preview'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Live Preview</span>
            </button>
          </div>

          {/* Builder Layout */}
          <div className="builder-grid grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Area (Left) */}
            <div
              className={`form-column no-print lg:col-span-5 space-y-6 ${
                activeTab === 'preview' ? 'hidden lg:block' : 'block'
              }`}
            >
              <CVForm
                data={cvData}
                onChange={setCvData}
                onDownload={handleDownloadCV}
                onDirectPrint={handleDirectPrint}
                onOpenStylesModal={() => setIsStylesModalOpen(true)}
              />
            </div>

            {/* Preview Area (Right) */}
            <div
              className={`preview-column print:!block print:!visible print:!w-full print:!m-0 print:!p-0 lg:col-span-7 ${
                activeTab === 'form' ? 'hidden lg:block' : 'block'
              }`}
            >
              {/* Preview Toolbar */}
              <div className="preview-toolbar bg-white p-3.5 mb-4 rounded-xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-3 sticky top-20 z-20">
                {/* Style Quick Navigation in Toolbar */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: currentStyle.colors.previewHex }}
                    />
                    <span className="text-xs font-bold text-stone-800">
                      #{currentStyle.number}
                    </span>
                    <span className="text-stone-300">|</span>
                    <span className="text-xs text-stone-600 font-medium max-w-[120px] sm:max-w-[160px] truncate">
                      {currentStyle.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrevStyle}
                      className="p-1 hover:bg-stone-100 rounded text-stone-600 hover:text-stone-900 transition"
                      title="Previous template"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStyle}
                      className="p-1 hover:bg-stone-100 rounded text-stone-600 hover:text-stone-900 transition"
                      title="Next template"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleRandomStyle}
                      className="p-1 hover:bg-purple-100 text-purple-600 rounded transition"
                      title="Surprise me / Random template (1-1000)"
                    >
                      <Dice5 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsStylesModalOpen(true)}
                    className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition"
                  >
                    <LayoutGrid className="w-3 h-3 text-blue-600" />
                    <span>1,000 Styles</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Density quick toggle */}
                  <div className="hidden xl:flex items-center gap-1 bg-stone-100 px-2 py-1 rounded-lg border border-stone-200 text-xs">
                    <Maximize2 className="w-3 h-3 text-blue-600" />
                    <select
                      value={cvData.spacingDensity || 'auto'}
                      onChange={(e) => setCvData({ ...cvData, spacingDensity: e.target.value as any })}
                      className="bg-transparent border-0 text-[11px] font-semibold text-stone-700 focus:outline-none cursor-pointer"
                      title="Adjust vertical page occupancy & spacing"
                    >
                      <option value="auto">Auto A4 Space</option>
                      <option value="spacious">Spacious (Short CV)</option>
                      <option value="normal">Normal Sizing</option>
                      <option value="compact">Compact (Long CV)</option>
                    </select>
                  </div>

                  {/* Mobile Zoom Toggle */}
                  <div className="flex sm:hidden items-center gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setPreviewZoom(50)}
                      className={`px-1.5 py-0.5 rounded ${
                        previewZoom <= 60 ? 'bg-white font-bold text-blue-700 shadow-2xs' : 'text-stone-600'
                      }`}
                    >
                      Fit
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewZoom(100)}
                      className={`px-1.5 py-0.5 rounded ${
                        previewZoom >= 90 ? 'bg-white font-bold text-blue-700 shadow-2xs' : 'text-stone-600'
                      }`}
                    >
                      100%
                    </button>
                  </div>

                  {/* Desktop Zoom controls */}
                  <div className="hidden sm:flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200">
                    <button
                      type="button"
                      onClick={() => setPreviewZoom(Math.max(60, previewZoom - 10))}
                      className="p-1 hover:bg-white rounded text-stone-600 hover:text-stone-900 transition"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-mono font-medium px-1 text-stone-600 min-w-[36px] text-center">
                      {previewZoom}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setPreviewZoom(Math.min(130, previewZoom + 10))}
                      className="p-1 hover:bg-white rounded text-stone-600 hover:text-stone-900 transition"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewZoom(100)}
                      className="p-1 hover:bg-white rounded text-stone-600 hover:text-stone-900 transition text-[11px] font-medium px-1.5"
                      title="Reset Zoom"
                    >
                      100%
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownloadCV}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / PDF</span>
                  </button>
                </div>
              </div>

              {/* Preview Container with Zoom */}
              <div className="overflow-x-auto pb-8 flex justify-center print:!overflow-visible print:!p-0 print:!m-0 print:!block print:!w-full">
                <div
                  style={{
                    transform: `scale(${previewZoom / 100})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.15s ease-out',
                  }}
                  className="preview-transform-wrapper w-full flex justify-center print:!transform-none print:!w-full print:!block print:!m-0 print:!p-0"
                >
                  <CVPreview data={cvData} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <TemplatesSection
          currentTemplate={cvData.template}
          onSelectTemplate={handleTemplateSelect}
          onOpenModal={() => setIsStylesModalOpen(true)}
        />

        {/* Features Section */}
        <FeaturesSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Visual Modal for All 1,000 Templates */}
      <StylesModal
        isOpen={isStylesModalOpen}
        onClose={() => setIsStylesModalOpen(false)}
        currentStyleId={cvData.template}
        onSelectStyle={handleTemplateSelect}
      />

      {/* Download / Print PDF Instructions Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm no-print">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center gap-2.5 text-blue-600">
              <Download className="w-6 h-6" />
              <h3 className="text-lg font-bold text-stone-900">
                Download Your CV as PDF
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              When the browser print dialog appears:
            </p>
            <ul className="text-xs sm:text-sm text-stone-700 space-y-2 bg-stone-50 p-3.5 rounded-lg border border-stone-200">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  Set <strong>Destination</strong> to <strong>&ldquo;Save as PDF&rdquo;</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  Under <em>More Settings</em>, enable <strong>&ldquo;Background graphics&rdquo;</strong> for header colors
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  Set paper size to <strong>A4</strong> and margins to <strong>Default</strong> or <strong>None</strong>
                </span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={exportWithHtml2Pdf}
                disabled={isExportingPdf}
                className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isExportingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <FileCheck className="w-4 h-4" />
                    <span>Download A4 PDF</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={executePrint}
                className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Browser Print</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
