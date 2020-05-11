import { HighlightWord } from './HighlightWord';

export class TextHighlighter {

    private prohibition: string;
    private leftProhibition: string;
    private rightProhibition: string;

    private highlightWords: HighlightWord[];

    constructor(prohibition: string, highlightWords: HighlightWord[]) {
        this.prohibition = prohibition;
        this.leftProhibition = " " + this.prohibition;
        this.rightProhibition = this.prohibition + " ";
        this.highlightWords = highlightWords;
    }

    text2HighlightHTML(text: string): string {

        // 禁則文字。もしタブが入っていたら置換処理を行わない。
        if(-1 !== text.indexOf(this.prohibition)) {
            return this.sanitize(text);
        }

        let replaced:any = text;

        var replacedNum = 0;
        let replaces = {};

        for(var i = 0; i < this.highlightWords.length; i++) {

            let highlightWord = this.highlightWords[i];

            for(var j = 0; j < highlightWord.words.length; j++) {
                let word = highlightWord.words[j];
                let reg = new RegExp("(" + word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + ")", 'g');
                let changed = replaced.replace(reg, (match, group1, offset, s): string => {
                    if(0 < offset && s[offset - 1] === this.prohibition) {
                        return match;
                    }

                    return this.leftProhibition + String(replacedNum) + this.rightProhibition;
                });

                if(changed !== replaced) {
                    replaced = changed;
                    replaces[replacedNum] = {word: word, color_code: highlightWord.colorCode};
                    replacedNum++;
                }
            }
        }

        for(var i = 0; i < replacedNum; i++) {
            let reg = new RegExp(this.leftProhibition + String(i) + this.rightProhibition, 'g');
            let word = this.sanitize(replaces[i]["word"]);
            replaced = replaced.replace(reg, "<span style=\"font-weight: bold; background-color: #" + replaces[i]["color_code"] + "\">" + word + "</span>");
        }

        return replaced;
    }

    sanitize(s: string): string {
        return s.replace(/[&'`"<>]/g, function(match) {
            return {
                '&': '&amp;',
                "'": '&#x27;',
                '`': '&#x60;',
                '"': '&quot;',
                '<': '&lt;',
                '>': '&gt;',
            }[match];
        });
    }
}