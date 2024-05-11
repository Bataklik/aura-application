//? Axe-core types
export type AxeViolationType = [
  {
    id: string;
    impact: "serious" | "moderate" | "minor" | "critical";
    tags: string[];
    description: string;
    help?: string;
    helpUrl?: string;
    nodes: [
      {
        any: {
          id: string;
          data: {
            contrastRatio?: number;
            fontSize?: string;
            fontWeight?: string;
            messageKey?: string;
            expectedContrastRatio?: string;
            fgColor?: string;
            bgColor?: string;
          } | null;
          relatedNodes: {
            html: string;
            target: string[];
          }[];
          impact: "serious" | "moderate" | "minor" | "critical";
          message: string;
        }[];
        all: never[];
        none: never[];
        impact: "serious" | "moderate" | "minor" | "critical";
        html: string;
        target: string[];
        failureSummary: string;
      }
    ];
  }
];
export interface AxeResultsType {
  inapplicable: [
    {
      id: string;
      impact: null | string;
      tags: string[];
      description: string;
      help: string;
      helpUrl: string;
      nodes: any[];
    }
  ];
  incomplete: AxeIncompeleteType;
  passes: [
    {
      id: string;
      impact: null | string;
      tags: string[];
      description: string;
      help: string;
      helpUrl: string;
      nodes: [
        {
          any: any[];
          all: [
            {
              id: string;
              data: null;
              relatedNodes: any[];
              impact: string;
              message: string;
            }
          ];
          none: [
            {
              id: string;
              data: null;
              relatedNodes: any[];
              impact: string;
              message: string;
            }
          ];
          impact: null | string;
          html: string;
          target: string[];
        }
      ];
    }
  ];
  violations: AxeViolationType;
  testEngine: {
    name: string;
    version: string;
  };
  testEnvironment: {
    userAgent: string;
    windowWidth: number;
    windowHeight: number;
    orientationAngle: number;
    orientationType: string;
  };
  testRunner: {
    name: string;
  };
  timestamp: string;
  toolOptions: {
    reporter: string;
  };
  url: string;
}
export type AxeIncompeleteType = [
  {
    id: string;
    impact: "serious" | "moderate" | "minor" | "critical";
    tags: string[];
    description: string;
    help: string;
    helpUrl: string;
    nodes: {
      any: {
        id: string;
        data: {
          contrastRatio?: number;
          fontSize?: string;
          fontWeight?: string;
          messageKey?: string;
          expectedContrastRatio?: string;
          fgColor?: string;
          bgColor?: string;
        } | null;
        relatedNodes: {
          html: string;
          target: string[];
        }[];
        impact: "serious" | "moderate" | "minor" | "critical";
        message: string;
      }[];
      all: never[];
      none: never[];
      impact: "serious" | "moderate" | "minor" | "critical";
      html: string;
      target: string[];
      failureSummary: string;
    }[];
  }
];

//? PA11Y types
export interface PA11YIssueType {
  code: string;
  type: string;
  typeCode: number;
  message: string;
  context: string;
  selector: string;
  runner: string;
  runnerExtras: Record<string, any>;
}

export interface Pa11yResultsType {
  documentTitle: string;
  pageUrl: string;
  issues: PA11YIssueType[];
}
//? Achecker types
export interface AcheckerResultsType {
  report: {
    results: result[];
    numExecuted: number;
    ruleTime: number;
    nls: {
      [key: string]: {
        [key: string]: string;
      };
    };
    summary: {
      counts: {
        violation: number;
        potentialviolation: number;
        recommendation: number;
        potentialrecommendation: number;
        manual: number;
        pass: number;
        ignored: number;
        elements: number;
        elementsViolation: number;
        elementsViolationReview: number;
      };
      scanTime: number;
      ruleArchive: string;
      policies: string[];
      reportLevels: string[];
      startScan: number;
      URL: string;
    };
    scanID: string;
    toolID: string;
    label: string;
  };
}

interface result {
  ruleId: string;
  value: string[];
  path: {
    dom: string;
    aria: string;
  };
  ruleTime: number;
  reasonId: string;
  message: string;
  messageArgs: string[];
  apiArgs: any[];
  bounds: {
    left: number;
    top: number;
    height: number;
    width: number;
  };
  snippet: string;
  category: string;
  ignored: boolean;
  level: string;
  help: string;
}
