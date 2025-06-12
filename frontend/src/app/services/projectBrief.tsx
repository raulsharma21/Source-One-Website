// services/projectBrief.ts

export interface ContactData {
  name?: string;
  email: string;
  company?: string;
}

export interface ProjectBriefData {
  answers: Record<string, any>;
  contactData: ContactData;
  submittedAt: string;
}

export interface ProjectBriefResponse {
  success: boolean;
  message: string;
  id?: string;
}

/**
 * Submit project brief data to your API
 */
export async function submitProjectBrief(data: {
  answers: Record<string, any>;
  contactData: ContactData;
}): Promise<ProjectBriefResponse> {
  const payload: ProjectBriefData = {
    ...data,
    submittedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch('/api/project-brief', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to submit project brief:', error);
    throw new Error('Failed to submit project brief. Please try again.');
  }
}

/**
 * Save progress to localStorage (optional feature)
 */
export function saveWizardProgress(step: number, answers: Record<string, any>) {
  try {
    const progress = {
      step,
      answers,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('wizardProgress', JSON.stringify(progress));
  } catch (error) {
    console.warn('Failed to save wizard progress:', error);
  }
}

/**
 * Load progress from localStorage (optional feature)
 */
export function loadWizardProgress(): { step: number; answers: Record<string, any> } | null {
  try {
    const saved = localStorage.getItem('wizardProgress');
    if (!saved) return null;

    const progress = JSON.parse(saved);
    
    // Check if progress is less than 24 hours old
    const savedAt = new Date(progress.savedAt);
    const now = new Date();
    const hoursDiff = (now.getTime() - savedAt.getTime()) / (1000 * 60 * 60);
    
    if (hoursDiff > 24) {
      // Clear old progress
      localStorage.removeItem('wizardProgress');
      return null;
    }

    return { step: progress.step, answers: progress.answers };
  } catch (error) {
    console.warn('Failed to load wizard progress:', error);
    return null;
  }
}

/**
 * Clear saved progress
 */
export function clearWizardProgress() {
  try {
    localStorage.removeItem('wizardProgress');
  } catch (error) {
    console.warn('Failed to clear wizard progress:', error);
  }
}