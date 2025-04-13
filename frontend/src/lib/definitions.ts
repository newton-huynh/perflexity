export type UserProfile = {
    name?: string;
    height?: string;
    weight?: string;
    race?: string;
    gender?: string;
    age?: number;
    goal?: string;
    diet?: string;
    frequency?: string;
    squat?: number;
    bench?: number;
    deadlift?: number;
    answer_style?: string;
    influencer?: string;
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