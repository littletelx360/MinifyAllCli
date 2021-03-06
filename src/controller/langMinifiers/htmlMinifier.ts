/**
 * @file That is called when the user minifies an HTML document
 * This file receives the HTML document and returns the minified one.
 * @author Jose Gracia Berenguer
 * @since 0.3.0
 * @see README.md
 * @link https://github.com/Josee9988/MinifyAll repository.
 * @link https://github.com/Josee9988/MinifyAll/issues issues and enhancements.
 */

/**
 * Class that contain all the functions needed for minify html.
 */
export class HtmlMinifier {

    /**
     * Summary Minifier constructor that receives the content.
     *
     * Description this is the constructor of the class and it
     * will receive an array with the content and it will assign it
     * to a private variable that will be used later on.
     *
     * @param  htmlContent all the code that will be minified.
     */
    constructor(private htmlContent: string[]) {
    }

    /**
     * Summary getHtmlMinified finds lasts spaces and trim it into just one line.
     *
     * Description the method will get the array with all the lines and will
     * make one String out of all of them; Then it will use REGEX
     * to replace multiple concurrencies, like removing multiple spaces,
     * unnecessary tabulations and specific things per each language.
     *
     * @return the line minified.
     */
    public getHtmlMinified(): string {
        return this.htmlContent.join('').replace(/;\}|\s+}/g, '}')
            .replace(/\/\*.*?\*\//g, '').replace(/:\s/g, ':')
            .replace(/ {/g, '{') // removes spaces before a '{'
            .replace(/[\t]/g, '') // removes any tab character
            .replace(/[\s\s]{2,}/g, ' ') // removes two whitespaces into 1
            .replace(/>[\s]+/g, '>') // removes whitespaces between labels
            .replace(/(>)\1+/g, '>')
            .replace(/\s=/g, '=') // remove space before '='
            .replace(/=\s/g, '=') // remove space after '='
            .replace(/\s\s/g, ' ') // remove two consecutive spaces
            ;
    }


    /**
     * Summary removes multiline comments.
     *
     * Description removeMultipleLineComments checks line by line
     * and removes the multiple line comments
     * it only removes the content inside the comments
     * if the multiple line comment is placed in a line
     * with useful code it will not be replaced.
     *
     */
    public removeMultipleLineComments(): void {
        for (let i = 0; i < this.htmlContent.length; i++) {
            const begin: RegExpMatchArray | null = this.htmlContent[i].match(/(<!--)/ig); // first <!-- found
            if (begin !== null) {
                for (let j = 0; j < this.htmlContent.length; j++) {
                    const end: RegExpMatchArray | null = this.htmlContent[j].match(/(-->)/g); // found --> end
                    if (end !== null) {
                        for (let k = i; k < j + 1; k++) {
                            if (k === i) {
                                const firstCharacterToRemove: number = this.htmlContent[k].indexOf('<!--');
                                const firstLineToReplace: string = this.htmlContent[k].substring(0, firstCharacterToRemove);
                                this.htmlContent[k] = firstLineToReplace;
                            } else if (k === j) {
                                const lastCharacterToRemove: number = this.htmlContent[k].indexOf('-->');
                                const lastLineToReplace: string = this.htmlContent[k].substring(lastCharacterToRemove + 2,
                                    this.htmlContent[k].length);
                                this.htmlContent[k] = lastLineToReplace;
                            } else {
                                this.htmlContent[k] = '';
                            }
                        }
                        break; // to stop reading the rest of the document
                    }
                }
            }
        }
    }
}
