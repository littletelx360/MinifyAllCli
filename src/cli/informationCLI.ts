import chalk from 'chalk';

/**
 * Summary: showVersion outputs the version of the package.
 */
export function showVersion() {
    console.log(chalk.bold.gray('0.0.0'));
}

/**
 * Summary: showHelp shows the help for the package 'minifyall'
 * it outputs all the global options, usage, hints and examples of use.
 */
export function showHelp(): void {
    console.log(chalk.green('\nMinifyAllCli') + chalk.gray(` v0.0.0`));

    console.log(`\n${chalk.bold('Usage')}: minifyall ${chalk.magenta('[file] [options]\n')}`);

    console.log(chalk.bold('Global options:\n'));
    console.log('  -h, --help\t\t  Output usage information. (will ignore any other arguments)');
    console.log('  -v, --version\t\t  Output package version. (will ignore any other arguments)');
    console.log('  -m, --minify-hex\t\t  Will minify the hexadecimal color values. (default = false)');
    console.log('  -s, --suffix\t\t  The string of the suffix file. (default = "-min")');
    console.log('  -o, --output\t\t  The new output file (will ignore "--suffix" argument)');


    console.log(chalk.bold('\nExamples of use:'));
    console.log('  minifyall --help');
    console.log('  minifyall --version');
    console.log('  minifyall myFile.css');
    console.log('  minifyall myFile.css -m -s .min');
    console.log('  minifyall myFile.css --minify-hex -s -minified');
    console.log('  minifyall myFile.css -o myNewFile.css');

    console.log(`\nFor more information visit: ${chalk.bold('https://github.com/Josee9988/MinifyAllCli')}`);
}
