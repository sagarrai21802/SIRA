
// // pages/SchemaGenerator.tsx
// import React, { useState } from 'react';
// import { Card } from '../components/UI/Card';
// import { Button } from '../components/UI/Button';
// import { Input } from '../components/UI/Input';
// import { LoadingSpinner } from '../components/UI/LoadingSpinner';
// import { FileCode } from 'lucide-react';
// import { generateSchema } from '../lib/seoToolkitFixed';

// export default function SchemaGenerator() {
//   const [websiteUrl, setWebsiteUrl] = useState('');
//   const [socialMediaUrl, setSocialMediaUrl] = useState('');
//   const [contactEmail, setContactEmail] = useState('');
//   const [contactPhone, setContactPhone] = useState('');
//   const [isGeneratingSchema, setIsGeneratingSchema] = useState(false);
//   const [schemaResult, setSchemaResult] = useState<string | null>(null);
//   const [schemaError, setSchemaError] = useState<string | null>(null);

//   const handleGenerateSchema = async () => {
//     if (!websiteUrl.trim()) {
//       setSchemaError('Website URL is required');
//       return;
//     }

//     setIsGeneratingSchema(true);
//     setSchemaError(null);
//     setSchemaResult(null);

//     try {
//       const result = await generateSchema({
//         websiteUrl,
//         socialMediaUrl,
//         contactEmail,
//         contactPhone,
//       });
//       setSchemaResult(result.schema || '');
//     } catch (err) {
//       setSchemaError(err instanceof Error ? err.message : 'Failed to generate schema');
//     } finally {
//       setIsGeneratingSchema(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-6">
//       <h1 className="text-4xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
//         <FileCode className="w-10 h-10 text-green-600" /> Schema Generator
//       </h1>

//       <Card className="p-6 shadow-lg border border-gray-200 dark:border-gray-700">
//         <div className="space-y-4">
//           <Input
//             value={websiteUrl}
//             onChange={(e) => setWebsiteUrl(e.target.value)}
//             placeholder="Website URL (required)"
//             disabled={isGeneratingSchema}
//           />
//           <Input
//             value={socialMediaUrl}
//             onChange={(e) => setSocialMediaUrl(e.target.value)}
//             placeholder="Social Media URL"
//             disabled={isGeneratingSchema}
//           />
//           <Input
//             value={contactEmail}
//             onChange={(e) => setContactEmail(e.target.value)}
//             placeholder="Contact Email"
//             disabled={isGeneratingSchema}
//           />
//           <Input
//             value={contactPhone}
//             onChange={(e) => setContactPhone(e.target.value)}
//             placeholder="Contact Phone"
//             disabled={isGeneratingSchema}
//           />

//           {schemaError && <p className="text-red-600">{schemaError}</p>}

//           <Button
//             onClick={handleGenerateSchema}
//             disabled={isGeneratingSchema || !websiteUrl.trim()}
//           >
//             {isGeneratingSchema ? <><LoadingSpinner size="sm" /> Generating...</> : 'Generate Schema'}
//           </Button>
//         </div>

//         {schemaResult && (
//           <div className="mt-6">
//             <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">Generated JSON-LD Schema</h3>
//             <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
//               {schemaResult}
//             </pre>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// }

// pages/SchemaGenerator.tsx
// import React, { useState } from 'react';
// import { Card } from '../components/UI/Card';
// import { Button } from '../components/UI/Button';
// import { Input } from '../components/UI/Input';
// import { LoadingSpinner } from '../components/UI/LoadingSpinner';
// import { FileCode, Copy } from 'lucide-react'; // 👈 added Copy icon
// import { generateSchema } from '../lib/seoToolkitFixed';

// export default function SchemaGenerator() {
//   const [websiteUrl, setWebsiteUrl] = useState('');
//   const [socialMediaUrl, setSocialMediaUrl] = useState('');
//   const [contactEmail, setContactEmail] = useState('');
//   const [contactPhone, setContactPhone] = useState('');
//   const [isGeneratingSchema, setIsGeneratingSchema] = useState(false);
//   const [schemaResult, setSchemaResult] = useState<string | null>(null);
//   const [schemaError, setSchemaError] = useState<string | null>(null);
//   const [copied, setCopied] = useState(false); // 👈 added state

//   const handleGenerateSchema = async () => {
//     if (!websiteUrl.trim()) {
//       setSchemaError('Website URL is required');
//       return;
//     }

//     setIsGeneratingSchema(true);
//     setSchemaError(null);
//     setSchemaResult(null);

//     try {
//       const result = await generateSchema({
//         websiteUrl,
//         socialMediaUrl,
//         contactEmail,
//         contactPhone,
//       });
//       setSchemaResult(result.schema || '');
//     } catch (err) {
//       setSchemaError(err instanceof Error ? err.message : 'Failed to generate schema');
//     } finally {
//       setIsGeneratingSchema(false);
//     }
//   };

//   const handleCopy = () => {
//     if (schemaResult) {
//       navigator.clipboard.writeText(schemaResult);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-6">
//       <h1 className="text-4xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
//         <FileCode className="w-10 h-10 text-green-600" /> Schema Generator
//       </h1>

//       <Card className="p-6 shadow-lg border border-gray-200 dark:border-gray-700">
//         <div className="space-y-4">
//           <Input
//             value={websiteUrl}
//             onChange={(e) => setWebsiteUrl(e.target.value)}
//             placeholder="Website URL (required)"
//             disabled={isGeneratingSchema}
//           />
//           <Input
//             value={socialMediaUrl}
//             onChange={(e) => setSocialMediaUrl(e.target.value)}
//             placeholder="Social Media URL"
//             disabled={isGeneratingSchema}
//           />
//           <Input
//             value={contactEmail}
//             onChange={(e) => setContactEmail(e.target.value)}
//             placeholder="Contact Email"
//             disabled={isGeneratingSchema}
//           />
//           <Input
//             value={contactPhone}
//             onChange={(e) => setContactPhone(e.target.value)}
//             placeholder="Contact Phone"
//             disabled={isGeneratingSchema}
//           />

//           {schemaError && <p className="text-red-600">{schemaError}</p>}

//           <Button
//             onClick={handleGenerateSchema}
//             disabled={isGeneratingSchema || !websiteUrl.trim()}
//           >
//             {isGeneratingSchema ? <><LoadingSpinner size="sm" /> Generating...</> : 'Generate Schema'}
//           </Button>
//         </div>

//         {schemaResult && (
//           <div className="mt-6">
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Generated JSON-LD Schema</h3>
//               <Button
//                 onClick={handleCopy}
//                 variant="secondary"
//                 size="sm"
//                 className="flex items-center gap-2"
//               >
//                 <Copy className="w-4 h-4" />
//                 {copied ? 'Copied!' : 'Copy'}
//               </Button>
//             </div>
//             <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
//               {schemaResult}
//             </pre>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { FileCode, Copy } from 'lucide-react'; // 👈 added Copy icon
import { generateSchema } from '../lib/seoToolkitFixed';

export default function SchemaGenerator() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [socialMediaUrl, setSocialMediaUrl] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isGeneratingSchema, setIsGeneratingSchema] = useState(false);
  const [schemaResult, setSchemaResult] = useState<string | null>(null);
  const [schemaError, setSchemaError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false); // 👈 added state

  const handleGenerateSchema = async () => {
    if (!websiteUrl.trim()) {
      setSchemaError('Website URL is required');
      return;
    }

    setIsGeneratingSchema(true);
    setSchemaError(null);
    setSchemaResult(null);

    try {
      const result = await generateSchema({
        websiteUrl,
        socialMediaUrl,
        contactEmail,
        contactPhone,
      });
      setSchemaResult(result.schema || '');
    } catch (err) {
      setSchemaError(err instanceof Error ? err.message : 'Failed to generate schema');
    } finally {
      setIsGeneratingSchema(false);
    }
  };

  const handleCopy = () => {
    if (schemaResult) {
      navigator.clipboard.writeText(schemaResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
        <FileCode className="w-10 h-10 text-green-600" /> Schema Generator
      </h1>

      <Card className="p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          <Input
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="Website URL (required)"
            disabled={isGeneratingSchema}
          />
          <Input
            value={socialMediaUrl}
            onChange={(e) => setSocialMediaUrl(e.target.value)}
            placeholder="Social Media URL"
            disabled={isGeneratingSchema}
          />
          <Input
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="Contact Email"
            disabled={isGeneratingSchema}
          />
          <Input
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder="Contact Phone"
            disabled={isGeneratingSchema}
          />

          {schemaError && <p className="text-red-600">{schemaError}</p>}

          <Button
            onClick={handleGenerateSchema}
            disabled={isGeneratingSchema || !websiteUrl.trim()}
          >
            {isGeneratingSchema ? <><LoadingSpinner size="sm" /> Generating...</> : 'Generate Schema'}
          </Button>
        </div>

        {schemaResult && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Generated JSON-LD Schema</h3>
              <Button
                onClick={handleCopy}
                variant="secondary"
                size="sm"
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>

            {/* Card-like schema display */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              {schemaResult}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
