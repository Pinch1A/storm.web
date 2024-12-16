import { InterestItemType } from "@/types";

export const fetchInterestsData = async (): Promise<InterestItemType[]> => {
  try {
    const interestsResponse = await fetch('/api/interests', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!interestsResponse.ok) {
      throw new Error(`Failed to fetch interests: ${interestsResponse.statusText}`);
    }

    const interests = await interestsResponse.json();

    console.log('Fetched interests:', interests);
    return interests as InterestItemType[];
  } catch (error) {
    console.error('Error fetching Interests data:', error);
    return [];
  }
};
