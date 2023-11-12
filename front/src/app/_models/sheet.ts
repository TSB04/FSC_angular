export class Sheet {
    ine?: number;
    title?: string;
    desc?: string;
    author?: string;
    published_date?: string;
    stars?: {
        id: number;
        count: number;
        author: string;
        sheet: string;
        starred_at: string;

    };
    comments?: {
        id: number;
        comment: string;
        author: string;
        sheet: string;
        commented_at: string;
    };
};