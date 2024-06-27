// CandidatePageContainer.tsx

import React, { useState } from 'react';
import { CandidatePageHeader } from './CandidatePageHeader';
import { CandidatePageDetail } from './CandidatePageDetail';

interface OptionType {
    label: string;
    value: string;
  }

const CandidatePageContainer: React.FC = () => {
  const [selectedJobPost, setSelectedJobPost] = useState<OptionType | null>(null);

  const handleJobPostChange = (jobPost: OptionType | null) => {
    setSelectedJobPost(jobPost);
  };

  return (
    <>
      <CandidatePageHeader onJobPostChange={handleJobPostChange} />
      <CandidatePageDetail selectedJobPost={selectedJobPost} />
    </>
  );
};

export { CandidatePageContainer };
