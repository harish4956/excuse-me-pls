export function scoreLabel(score: number, type: 'believability' | 'absurdity'): string {
  if (type === 'believability') {
    if (score >= 9) return 'Dangerously Credible';
    if (score >= 7) return 'Solid Alibi';
    if (score >= 5) return 'Worth Trying';
    if (score >= 3) return 'Use With Caution';
    return 'Nobody Will Buy This';
  } else {
    if (score >= 9) return 'Maximum Chaos';
    if (score >= 7) return 'Impressively Unhinged';
    if (score >= 5) return 'Getting Weird';
    if (score >= 3) return 'Mildly Suspicious';
    return 'Almost Boring';
  }
}

export function getConfidenceTagline(believability: number, absurdity: number): string {
  if (believability >= 8) return 'Confidence level: bizarrely solid';
  if (believability >= 6 && absurdity <= 5) return 'This excuse is dangerously usable';
  if (absurdity >= 9) return 'This should probably not be emailed to HR';
  if (believability <= 3 && absurdity >= 7) return 'For entertainment and cowardice only';
  if (believability >= 6) return 'Deploy with moderate confidence';
  return 'Proceed at your own risk';
}
