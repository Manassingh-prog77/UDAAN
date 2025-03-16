import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  Download,
  Copy,
  CheckCircle,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { marked } from "marked";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const InteractiveDocumentDisplay = ({
  content,
  documentType = "document",
  prompt = "",
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState("");
  const [copied, setCopied] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);
  const editorRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (content?.content?.markdown) {
      setEditableContent(content.content.markdown);
    }
  }, [content]);

  const handleCopyContent = () => {
    if (content) {
      navigator.clipboard.writeText(JSON.stringify(content, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
      }
    }, 100);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) {
      onSave(editableContent);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditableContent(content?.content?.markdown || "");
  };

  const handleDownloadPDF = async () => {
    const contentElement = document.getElementById("document-content");
    if (!contentElement) return;

    setRequestStatus("Generating PDF...");

    try {
      // Create a clean clone for PDF generation
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = contentElement.innerHTML;

      // Apply necessary styles
      tempContainer.style.width = "793px"; // A4 width at 96 DPI
      tempContainer.style.padding = "40px";
      tempContainer.style.backgroundColor = "white";
      tempContainer.style.fontFamily = "Arial, sans-serif";

      // Handle markdown content specifically
      const markdownContent = tempContainer.querySelector(".markdown-preview");
      if (markdownContent) {
        markdownContent.style.fontSize = "14px";
        markdownContent.style.lineHeight = "1.5";
      }

      // Position off-screen
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      document.body.appendChild(tempContainer);

      // Generate canvas
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF",
      });

      // Clean up
      document.body.removeChild(tempContainer);

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${documentType}-${Date.now()}.pdf`);

      setRequestStatus("PDF downloaded successfully");
      setTimeout(() => setRequestStatus(null), 3000);
    } catch (error) {
      console.error("PDF generation error:", error);
      setRequestStatus("Error generating PDF. Please try again.");
      setTimeout(() => setRequestStatus(null), 3000);
    }
  };

  const renderMarkdown = (markdown) => {
    if (!markdown) return { __html: "" };
    return { __html: marked(markdown) };
  };
  return (
    <div className="bg-white min-h-[75vh] rounded-md border border-gray-300 overflow-hidden h-full shadow-sm">
      {/* Header */}
      <div className="px-3 py-2 border-b border-gray-300 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              content ? "bg-green-500" : "bg-gray-400"
            }`}
          />
          <h2 className="text-xs font-medium text-gray-700">
            {content ? "GENERATED OUTPUT" : "OUTPUT PREVIEW"}
          </h2>
          {content && (
            <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
              {documentType?.toUpperCase()}
            </span>
          )}
        </div>

        {content && (
          <div className="flex items-center gap-1">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-1 text-green-600 cursor-pointer hover:text-green-800 hover:bg-gray-100 rounded transition-colors"
                  title="Save">
                  <Save className="w-3 h-3" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1 text-red-600 cursor-pointer hover:text-red-800 hover:bg-gray-100 rounded transition-colors"
                  title="Cancel">
                  <X className="w-3 h-3" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleEdit}
                  className="p-1 text-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
                  title="Edit">
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={handleCopyContent}
                  className="p-1 text-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
                  title="Copy JSON">
                  {copied ? (
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="p-1 text-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
                  title="Download PDF">
                  <Download className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="relative">
        {content ? (
          <div className="max-h-[70vh] overflow-y-auto" id="document-content">
            <div className="flex flex-col gap-4 p-4">
              {/* Document Header */}
              <div className="pb-3 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-800 mb-1">
                  {content.content.header.title}
                </h3>
                <div className="flex items-center gap-3 text-[10px] text-gray-500">
                  <span>REF: {content.content.header.number}</span>
                  <span>DATE: {content.content.header.date}</span>
                  <span>ID: {content.metadata.reference_id}</span>
                </div>
              </div>

              {/* Editable Content */}
              {isEditing ? (
                <textarea
                  ref={editorRef}
                  value={editableContent}
                  onChange={(e) => setEditableContent(e.target.value)}
                  className="w-full h-full min-h-[400px] p-4 text-sm font-mono border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  spellCheck="false"
                />
              ) : (
                <div className="prose prose-sm max-w-none text-gray-800">
                  <div
                    dangerouslySetInnerHTML={renderMarkdown(editableContent)}
                    className="markdown-preview"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 text-center text-gray-500 p-4">
            <div className="w-12 h-12 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-gray-300" />
            </div>
            <h3 className="text-xs font-medium text-gray-700 mb-2">
              No Document Generated
            </h3>
            <p className="max-w-md text-[11px] text-gray-500 mb-4">
              Select document type and provide details to generate a document.
              The output will be provided in Markdown format and can be
              converted to PDF.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {content && (
        <div className="px-3 py-2 border-t border-gray-300 bg-gray-50 flex items-center justify-between text-[10px] text-gray-500">
          <div>Format: Markdown → PDF conversion (editable)</div>
          <div>Generated: {new Date().toLocaleTimeString()}</div>
        </div>
      )}

      {/* Status Message */}
      {requestStatus && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md text-xs">
          {requestStatus}
        </div>
      )}
    </div>
  );
};

export default InteractiveDocumentDisplay;
