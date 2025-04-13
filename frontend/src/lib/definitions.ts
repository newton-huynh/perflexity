export type UserProfile = {
    name?: string;
    height?: string;
    weight?: string;
    answer_style?: string;
    gender?: string;
    age?: number;
    goal?: string;
}

export interface Message {
    question: string;
    answer: string;
    citations?: Citation[];
}

export interface Citation {
    title: string;
    url: string;
}