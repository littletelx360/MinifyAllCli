import {showHelp, showVersion} from './informationCLI';
import {ArgumentsOptions, parseArgumentsIntoOptions} from "./argumentParser";
import {createFile, readFileContent} from "../controller/fileController";
import {displayException} from "./displayException";
import {detectLanguageAndMinify} from "../index";

/**
 * First function called when the user executes the CLI command.
 * It receives and parses the arguments and calls the appropriate function
 * to continue with the command execution.
 *
 * @param rawArgs arguments directly given by the user.
 */
export async function startCommand(rawArgs: string[]): void {
    let options: ArgumentsOptions;
    try {
        options = parseArgumentsIntoOptions(rawArgs);
    } catch (e) { // if the arguments passed are not right
        displayException(400, 'your arguments are wrong', e);
    }

    if (!options.help && !options.version) { // OK
        const content: string[] = await readFileContent(options.file);
        const minifiedCode = detectLanguageAndMinify(options.file, content, options.minifyHex);
        createFile(options.file, minifiedCode, options.suffix);
    } else if (options.help) { // if the user specified help
        showHelp();
    } else if (options.version) { // if the user specified version
        showVersion();
    }
}