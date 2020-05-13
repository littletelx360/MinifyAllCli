import {CommentRemover} from './commentRemover';
import {HexMinifier} from './hexMinifier';
import {CssMinifier} from './langDefaultMinifiers/cssMinifier';
import {HtmlMinifier} from './langDefaultMinifiers/htmlMinifier';
import {JsonMinifier} from './langDefaultMinifiers/jsonMinifier';

/**
 * GlobalMinifiers contain functions that are used by multiple languages to be minifized.
 */
export class GlobalMinifierClass {
    constructor(private willMinifyHex: boolean) {
    }

    /**
     * Summary Function that does all the steps to minify all the css code.
     * @param cssContent css array to be minified.
     * @return string with all the code minified.
     */
    public minifyCssScssLessSass(cssContent: string[]): string {
        const removeComments: string[] = this.removeComments(cssContent);
        const hexMinifiedCss: string[] = this.HexMinify(removeComments);
        const minifierCss: CssMinifier = new CssMinifier(hexMinifiedCss);
        return minifierCss.getCssMinified();
    }

    /**
     * Summary Function that does all the steps to minify all the json code.
     * @param jsonContent json array to be minified.
     * @return  string with all the code minified.
     */
    public minifyJsonJsonc(jsonContent: string[]): string {
        const contentWithHexMinified: string[] = this.HexMinify(jsonContent);
        const removeComments: string[] = this.removeComments(contentWithHexMinified);
        const minifierJson: JsonMinifier = new JsonMinifier(removeComments);
        return minifierJson.getJSONMinified();
    }

    /**
     * Summary Function that does all the steps to minify all the html code.
     * @param  htmlContent html array to be minified.
     * @return string with all the code minified.
     */
    public minifyHtml(htmlContent: string[]): string {
        const minifierHtml: HtmlMinifier = new HtmlMinifier(htmlContent);
        minifierHtml.removeMultipleLineComments();
        return minifierHtml.getHtmlMinified();
    }

    /**
     * Summary minifies hexadecimal code if enabled.
     *
     * Description receives an array with all the content,
     * and minifies it's hexadecimal, rgb and rgba values;
     * then return the new array;
     * If it is enabled it will initialize the HexMinifier
     * class and it will make all the processes and return
     * the new array of values OR it will simply return the
     * received value and do nothing.
     *
     * @param content Array with all the lines to be hexMinified.
     */
    public HexMinify(content: string[]): string[] {
        let returnValue: string[];

        if (this.willMinifyHex) {
            const hexMinifier: HexMinifier = new HexMinifier(content);
            // Minifier methods
            hexMinifier.shortHexMain();
            hexMinifier.shortRGBMain();
            hexMinifier.shortRGBAMain();
            returnValue = hexMinifier.getHexMinified();
        } else {
            returnValue = content;
        }
        return returnValue;
    }


    /**
     * Summary it removes the comments from a class.
     *
     * Description removeComments receives an array with the content
     * and removes single line and multiple line comments (//)(/* * /)
     * by calling the class removeComments and calling the method
     * removeCommentsMain, Then gets the result with getLineRemoved.
     *
     * @param content All the content to remove the comments
     */
    public removeComments(content: string[]): string[] {
        const removeComments = new CommentRemover(content);
        removeComments.removeCommentsMain();
        return removeComments.getCommentsRemoved();
    }
}
