export type UserProfile = {
    name?: string;
    height?: string;
    weight?: string;
    race?: string;
    gender?: string;
    age?: string;
    goal?: string;
    diet?: string;
    frequency?: string;
    squat?: string;
    bench?: string;
    deadlift?: string;
    answerStyle?: string;
    influencer?: string;
    responseLength?: number;
    toggleCitations?: boolean;
}

export interface Message {
    question: string;
    answer: string;
    citations: Citation[];
}

export interface Citation {
    title: string;
    url: string;
    ranking: number;
}