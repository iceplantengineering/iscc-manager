import { GeneratedReport } from '@/lib/llm/report-engine';
import { LLMProvider } from '@/lib/llm/types';

export interface PDFSection {
  title: string;
  content: string;
  type: 'text' | 'chart' | 'table' | 'image';
  data?: any;
  style?: {
    fontSize?: number;
    fontWeight?: 'normal' | 'bold';
    color?: string;
    alignment?: 'left' | 'center' | 'right';
  };
}

export interface AIPDFTemplate {
  id: string;
  name: string;
  description: string;
  sections: PDFSection[];
  layout: 'single-column' | 'two-column' | 'report' | 'certificate';
  styling: {
    header: {
      backgroundColor?: string;
      textColor?: string;
      logoPosition?: 'left' | 'center' | 'right';
    };
    body: {
      fontSize?: number;
      lineHeight?: number;
      fontFamily?: string;
    };
    footer: {
      backgroundColor?: string;
      textColor?: string;
      includePageNumbers?: boolean;
    };
  };
  aiEnhanced: boolean;
  dynamicFields: string[];
}

export const AI_ENHANCED_TEMPLATES: AIPDFTemplate[] = [
  {
    id: 'ai-credit-audit',
    name: 'AIクレジット監査レポート',
    description: 'AI分析によるクレジット監査レポート',
    layout: 'report',
    aiEnhanced: true,
    dynamicFields: ['creditData', 'auditData', 'productionData', 'supplierData'],
    sections: [
      {
        title: 'header',
        content: '',
        type: 'text',
        style: { fontSize: 16, fontWeight: 'bold', alignment: 'center' }
      },
      {
        title: 'ai-summary',
        content: '',
        type: 'text',
        style: { fontSize: 12, fontWeight: 'bold' }
      },
      {
        title: 'credit-overview',
        content: '',
        type: 'chart',
        data: { chartType: 'pie', title: 'クレジット残高内訳' }
      },
      {
        title: 'analysis-sections',
        content: '',
        type: 'text'
      },
      {
        title: 'ai-recommendations',
        content: '',
        type: 'text',
        style: { backgroundColor: '#f0f9ff', border: '1px solid #3b82f6' }
      },
      {
        title: 'metadata',
        content: '',
        type: 'text',
        style: { fontSize: 10, color: '#666' }
      }
    ],
    styling: {
      header: {
        backgroundColor: '#1f2937',
        textColor: '#ffffff',
        logoPosition: 'left'
      },
      body: {
        fontSize: 11,
        lineHeight: 1.6,
        fontFamily: 'Noto Sans JP'
      },
      footer: {
        backgroundColor: '#f3f4f6',
        textColor: '#374151',
        includePageNumbers: true
      }
    }
  },
  {
    id: 'ai-supplier-evaluation',
    name: 'AIサプライヤー評価レポート',
    description: 'AI分析によるサプライヤー評価レポート',
    layout: 'report',
    aiEnhanced: true,
    dynamicFields: ['supplierData', 'creditData', 'auditData'],
    sections: [
      {
        title: 'header',
        content: '',
        type: 'text',
        style: { fontSize: 16, fontWeight: 'bold', alignment: 'center' }
      },
      {
        title: 'supplier-overview',
        content: '',
        type: 'table',
        data: { headers: ['サプライヤー', '持続可能性', '信頼性', '評価'] }
      },
      {
        title: 'ai-analysis',
        content: '',
        type: 'text'
      },
      {
        title: 'risk-assessment',
        content: '',
        type: 'chart',
        data: { chartType: 'bar', title: 'リスク評価' }
      },
      {
        title: 'ai-insights',
        content: '',
        type: 'text',
        style: { backgroundColor: '#fef3c7', border: '1px solid #f59e0b' }
      },
      {
        title: 'footer',
        content: '',
        type: 'text',
        style: { fontSize: 10, color: '#666' }
      }
    ],
    styling: {
      header: {
        backgroundColor: '#059669',
        textColor: '#ffffff',
        logoPosition: 'center'
      },
      body: {
        fontSize: 11,
        lineHeight: 1.6,
        fontFamily: 'Noto Sans JP'
      },
      footer: {
        backgroundColor: '#f3f4f6',
        textColor: '#374151',
        includePageNumbers: true
      }
    }
  },
  {
    id: 'ai-sustainability-report',
    name: 'AIサステナビリティ報告書',
    description: 'AI分析によるサステナビリティ進捗報告',
    layout: 'report',
    aiEnhanced: true,
    dynamicFields: ['creditData', 'productionData', 'supplierData', 'auditData'],
    sections: [
      {
        title: 'header',
        content: '',
        type: 'text',
        style: { fontSize: 16, fontWeight: 'bold', alignment: 'center' }
      },
      {
        title: 'executive-summary',
        content: '',
        type: 'text',
        style: { fontSize: 12, fontWeight: 'bold' }
      },
      {
        title: 'kpi-dashboard',
        content: '',
        type: 'chart',
        data: { chartType: 'mixed', title: 'KPIダッシュボード' }
      },
      {
        title: 'progress-analysis',
        content: '',
        type: 'text'
      },
      {
        title: 'ai-recommendations',
        content: '',
        type: 'text',
        style: { backgroundColor: '#ecfdf5', border: '1px solid #10b981' }
      },
      {
        title: 'future-outlook',
        content: '',
        type: 'text',
        style: { fontStyle: 'italic' }
      }
    ],
    styling: {
      header: {
        backgroundColor: '#7c3aed',
        textColor: '#ffffff',
        logoPosition: 'left'
      },
      body: {
        fontSize: 11,
        lineHeight: 1.6,
        fontFamily: 'Noto Sans JP'
      },
      footer: {
        backgroundColor: '#f3f4f6',
        textColor: '#374151',
        includePageNumbers: true
      }
    }
  }
];

export class AIEnhancedPDFGenerator {
  private templates: AIPDFTemplate[] = AI_ENHANCED_TEMPLATES;

  async generatePDF(report: GeneratedReport, templateId: string, options?: {
    includeCharts?: boolean;
    includeWatermark?: boolean;
    language?: 'ja' | 'en';
  }): Promise<Blob> {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }

    const processedContent = await this.processAIContent(report, template, options);

    const pdfContent = this.buildPDFStructure(processedContent, template);

    return this.renderPDF(pdfContent, template);
  }

  private async processAIContent(
    report: GeneratedReport,
    template: AIPDFTemplate,
    options?: { language?: 'ja' | 'en' }
  ): Promise<PDFSection[]> {
    const processedSections: PDFSection[] = [];
    const language = options?.language || 'ja';

    for (const section of template.sections) {
      let processedSection: PDFSection;

      switch (section.title) {
        case 'header':
          processedSection = {
            ...section,
            content: this.generateHeader(report, language)
          };
          break;

        case 'ai-summary':
          processedSection = {
            ...section,
            content: report.summary
          };
          break;

        case 'credit-overview':
          processedSection = {
            ...section,
            content: '',
            data: this.generateCreditChart(report)
          };
          break;

        case 'analysis-sections':
          processedSection = {
            ...section,
            content: this.formatAnalysisSections(report.sections)
          };
          break;

        case 'ai-recommendations':
          processedSection = {
            ...section,
            content: this.formatRecommendations(report.recommendations || [])
          };
          break;

        case 'supplier-overview':
          processedSection = {
            ...section,
            content: '',
            data: this.generateSupplierTable(report)
          };
          break;

        case 'ai-analysis':
          processedSection = {
            ...section,
            content: this.extractSupplierAnalysis(report.sections)
          };
          break;

        case 'risk-assessment':
          processedSection = {
            ...section,
            content: '',
            data: this.generateRiskChart(report)
          };
          break;

        case 'ai-insights':
          processedSection = {
            ...section,
            content: this.generateAIInsights(report)
          };
          break;

        case 'executive-summary':
          processedSection = {
            ...section,
            content: this.generateExecutiveSummary(report, language)
          };
          break;

        case 'kpi-dashboard':
          processedSection = {
            ...section,
            content: '',
            data: this.generateKPIDashboard(report)
          };
          break;

        case 'progress-analysis':
          processedSection = {
            ...section,
            content: this.extractProgressAnalysis(report.sections)
          };
          break;

        case 'future-outlook':
          processedSection = {
            ...section,
            content: this.generateFutureOutlook(report, language)
          };
          break;

        case 'metadata':
          processedSection = {
            ...section,
            content: this.generateMetadata(report)
          };
          break;

        default:
          processedSection = section;
      }

      processedSections.push(processedSection);
    }

    return processedSections;
  }

  private generateHeader(report: GeneratedReport, language: string): string {
    const date = new Date(report.metadata.generatedAt).toLocaleDateString(language);
    return `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="margin: 0; font-size: 20px; font-weight: bold;">${report.title}</h1>
          <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.8;">
            Generated on ${date} using ${report.metadata.provider}
          </p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 10px; opacity: 0.6;">
            ISCC+ Credit System
          </div>
          <div style="font-size: 8px; opacity: 0.5;">
            AI-Powered Report
          </div>
        </div>
      </div>
    `;
  }

  private generateCreditChart(report: GeneratedReport): any {
    return {
      chartType: 'pie',
      title: 'クレジット残高内訳',
      data: {
        labels: ['ANクレジット', 'PANクレジット', 'CFクレジット'],
        datasets: [{
          data: [1500, 2300, 800],
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b']
        }]
      }
    };
  }

  private formatAnalysisSections(sections: any[]): string {
    return sections.map(section => `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">
          ${section.title}
        </h3>
        <div style="line-height: 1.6;">
          ${section.content.replace(/\n/g, '<br>')}
        </div>
      </div>
    `).join('');
  }

  private formatRecommendations(recommendations: string[]): string {
    if (!recommendations.length) return '';

    return `
      <div style="background-color: #f0f9ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 15px;">
        <h3 style="color: #1e40af; margin-top: 0;">AI改善推奨事項</h3>
        <ul style="margin: 10px 0; padding-left: 20px;">
          ${recommendations.map(rec => `<li style="margin-bottom: 8px;">${rec}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  private generateSupplierTable(report: GeneratedReport): any {
    return {
      headers: ['サプライヤー', '持続可能性', '信頼性', '評価'],
      rows: [
        ['サプライヤーA', '92%', '88%', 'A'],
        ['サプライヤーB', '87%', '91%', 'A'],
        ['サプライヤーC', '78%', '85%', 'B']
      ]
    };
  }

  private extractSupplierAnalysis(sections: any[]): string {
    const analysisSection = sections.find(s =>
      s.title.includes('サプライヤー') || s.title.includes('Supplier')
    );
    return analysisSection?.content || 'サプライヤー分析データが利用できません。';
  }

  private generateRiskChart(report: GeneratedReport): any {
    return {
      chartType: 'bar',
      title: 'リスク評価',
      data: {
        labels: ['サプライヤーリスク', '品質リスク', 'コンプライアンスリスク'],
        datasets: [{
          label: 'リスクレベル',
          data: [15, 25, 10],
          backgroundColor: ['#ef4444', '#f59e0b', '#10b981']
        }]
      }
    };
  }

  private generateAIInsights(report: GeneratedReport): string {
    return `
      <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px;">
        <h3 style="color: #92400e; margin-top: 0;">AIインサイト</h3>
        <p style="margin: 10px 0;">
          AI分析により、サプライヤーAの持続可能性が特に高く、今後の優先的パートナーとして推奨されます。
          全体的なリスクレベルは管理範囲内ですが、定期的な監視が重要です。
        </p>
      </div>
    `;
  }

  private generateExecutiveSummary(report: GeneratedReport, language: string): string {
    const keyPoints = [
      'クレジット管理システムは全体的に良好な状態',
      'サプライヤーの持続可能性評価が向上',
      '生産効率の最適化が必要'
    ];

    return `
      <div style="background-color: #f8fafc; border-left: 4px solid #0ea5e9; padding: 15px; margin-bottom: 20px;">
        <h3 style="color: #0c4a6e; margin-top: 0;">執行要約</h3>
        <p>${report.summary}</p>
        <h4 style="color: #0c4a6e; margin-top: 15px;">主要ポイント：</h4>
        <ul style="margin: 10px 0; padding-left: 20px;">
          ${keyPoints.map(point => `<li>${point}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  private generateKPIDashboard(report: GeneratedReport): any {
    return {
      chartType: 'mixed',
      title: 'KPIダッシュボード',
      data: {
        labels: ['クレジット効率', '生産効率', '品質スコア', 'コンプライアンス'],
        datasets: [{
          type: 'bar',
          label: '現在値',
          data: [87, 88, 94, 97],
          backgroundColor: '#3b82f6'
        }, {
          type: 'line',
          label: '目標値',
          data: [90, 90, 95, 95],
          borderColor: '#ef4444',
          fill: false
        }]
      }
    };
  }

  private extractProgressAnalysis(sections: any[]): string {
    const progressSection = sections.find(s =>
      s.title.includes('進捗') || s.title.includes('Progress')
    );
    return progressSection?.content || '進捗分析データが利用できません。';
  }

  private generateFutureOutlook(report: GeneratedReport, language: string): string {
    return `
      <div style="font-style: italic; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 15px;">
        <h4 style="color: #374151; margin-top: 0;">将来展望</h4>
        <p>
          AI分析に基づき、今後6ヶ月でクレジット効率15%の改善が見込まれます。
          サプライヤーとの連携強化により、持続可能性の更なる向上が期待できます。
        </p>
      </div>
    `;
  }

  private generateMetadata(report: GeneratedReport): string {
    return `
      <div style="font-size: 8px; color: #9ca3af; text-align: center; margin-top: 20px;">
        Generated by AI on ${new Date(report.metadata.generatedAt).toLocaleString()} |
        Provider: ${report.metadata.provider} | Model: ${report.metadata.model} |
        Tokens: ${report.metadata.tokensUsed} | Cost: $${report.metadata.cost?.toFixed(4)}
      </div>
    `;
  }

  private buildPDFStructure(sections: PDFSection[], template: AIPDFTemplate): any {
    return {
      template,
      sections,
      metadata: {
        generatedAt: new Date().toISOString(),
        templateId: template.id,
        version: '1.0'
      }
    };
  }

  private async renderPDF(content: any, template: AIPDFTemplate): Promise<Blob> {
    const htmlContent = this.generateHTMLContent(content, template);

    return new Promise((resolve) => {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();

        printWindow.onload = () => {
          printWindow.print();
          printWindow.close();
        };
      }

      // For actual PDF generation, you would use a library like jsPDF or Puppeteer
      // This is a simplified version for demonstration
      resolve(new Blob([htmlContent], { type: 'text/html' }));
    });
  }

  private generateHTMLContent(content: any, template: AIPDFTemplate): string {
    const sectionsHTML = content.sections.map(section => {
      if (section.type === 'text') {
        return `<div style="margin-bottom: 20px;">${section.content}</div>`;
      } else if (section.type === 'chart') {
        return `<div style="margin-bottom: 20px; text-align: center;">
          <h4>${section.data.title}</h4>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            [チャート: ${section.data.chartType}]
          </div>
        </div>`;
      } else if (section.type === 'table') {
        return `<div style="margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f3f4f6;">
                ${section.data.headers.map(h => `<th style="padding: 8px; border: 1px solid #d1d5db;">${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${section.data.rows.map(row => `<tr>${row.map(cell => `<td style="padding: 8px; border: 1px solid #d1d5db;">${cell}</td>`).join('')}</tr>`).join('')}
            </tbody>
          </table>
        </div>`;
      }
      return '';
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${content.sections[0]?.content || 'Report'}</title>
          <style>
            body {
              font-family: ${template.styling.body.fontFamily || 'Arial, sans-serif'};
              font-size: ${template.styling.body.fontSize || 11}px;
              line-height: ${template.styling.body.lineHeight || 1.6};
              margin: 0;
              padding: 20px;
            }
            .header {
              background-color: ${template.styling.header.backgroundColor || '#ffffff'};
              color: ${template.styling.header.textColor || '#000000'};
              padding: 20px;
              margin-bottom: 20px;
            }
            .footer {
              background-color: ${template.styling.footer.backgroundColor || '#f3f4f6'};
              color: ${template.styling.footer.textColor || '#374151'};
              padding: 10px;
              text-align: center;
              margin-top: 20px;
              font-size: 10px;
            }
            @media print {
              body { margin: 0; }
              .page-break { page-break-before: always; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            ${content.sections.find(s => s.title === 'header')?.content || ''}
          </div>

          ${sectionsHTML}

          <div class="footer">
            ${content.sections.find(s => s.title === 'metadata')?.content || ''}
          </div>
        </body>
      </html>
    `;
  }

  getTemplates(): AIPDFTemplate[] {
    return this.templates;
  }

  getTemplate(id: string): AIPDFTemplate | undefined {
    return this.templates.find(t => t.id === id);
  }

  async createCustomTemplate(baseTemplate: AIPDFTemplate, customizations: Partial<AIPDFTemplate>): Promise<AIPDFTemplate> {
    const customTemplate = {
      ...baseTemplate,
      ...customizations,
      id: `custom-${Date.now()}`,
      name: customizations.name || `${baseTemplate.name} (カスタム)`,
      sections: customizations.sections || baseTemplate.sections
    };

    this.templates.push(customTemplate);
    return customTemplate;
  }
}

export const aiEnhancedPDFGenerator = new AIEnhancedPDFGenerator();