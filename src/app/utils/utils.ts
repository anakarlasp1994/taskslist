//  Regular expressions
export const mentionRegex = /(?<!\S)@[A-Za-z0-9_]+(?!\S)/g;
export const hashtagRegex = /#(\w+)/g;
export const linkRegex =  /\b((http|https):\/\/|www\.)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?\b/g;
export const mailRegex = /[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/g;
  
export enum ClasificationColor {
    Hashtag = '#702EE6',
    Word = '#04142F',
    Mail = '#F58E0A',
    Mention = '#07A873',
    Link = '#007FFF'
}
  
export enum ClasificationBackground{
    Hashtag = '#DBC7FF',
    Word = '#FFFFFF',
    Mail = '#FFE6C7',
    Mention = '#ADF0D9',
    Link = '#D6EBFF'
}
  
export interface ClassifiedWord {
    type: 'Hashtag' | 'Mail' | 'Mention' | 'Link' | 'Word';
    value: string;
    color: string;
    background: string;
    show: string;
}

export interface Task {
    id: number;
    text: string;
    words?: ClassifiedWord[]
}
  