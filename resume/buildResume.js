const fs = require('fs');
const { mdToPdf } = require('md-to-pdf');

const { argv } = require('yargs');

function wrapHeadingSections(content) {
    const inLines = content.split('\n');
    const outLines = [];
    const stack = [0];

    for (let i = 0; i < inLines.length; i++) {
        const l = inLines[i];
        const linePrefix = l.trim().split(' ')[0];

        if (linePrefix[0] !== '#') {
            // Not a heading
            outLines.push(l);
            continue;
        }

        const hText = l
            .split(':')
            .map((p, n) => (n > 0 ? `<span class="headerPart${n}">${p}</span>` : p))
            .join(':');

        const level = linePrefix.length;
        let lastLevel = stack.slice(-1)[0];

        const id = l
            .split('')
            .filter((c) => ![' ', '#'].includes(c))
            .join('');

        if (level === lastLevel) {
            // Same level, close old and open new
            outLines.push(`\n\n</div>\n\n`);
            outLines.push(`\n\n<div id="${id}" class="level${level}">\n\n`);
            outLines.push(hText);
        } else if (level > lastLevel) {
            // Sub heading, open new and add to stack
            stack.push(level);
            outLines.push(`\n\n<div id="${id}" class="level${level}">\n\n`);
            outLines.push(hText);
        } else if (level < lastLevel) {
            // End of higher level heading
            while (stack.slice(-1)[0] >= level) {
                outLines.push(`\n\n</div>\n\n`);
                stack.pop();
            }

            stack.push(level); // TODO: Refactor this
            outLines.push(`\n\n<div id="${id}" class="level${level}">\n\n`);
            outLines.push(hText);
        }
    }

    outLines.push('\n\n</div>\n\n'.repeat(stack.length - 1));

    return outLines.join('\n');
}

function readMarkdown(coverPage, includeReferences) {
    let pages = [];

    if (coverPage) {
        const cPage = fs.readFileSync(`${__dirname}/covers/${coverPage}.md`).toString();
        pages.push(`<div id="coverPage">\n\n${cPage}\n\n</div>\n\n`);
    }

    const resume = fs.readFileSync(`${__dirname}/resume.md`).toString();
    pages.push(`<div id="main">\n\n${resume}\n\n</div>\n\n`);

    if (includeReferences) {
        const rPage = fs.readFileSync(`${__dirname}/references.md`).toString();
        pages.push(`<div id="references">\n\n${rPage}\n\n</div>\n\n`);
    }

    return pages.join('\n\n<div class="page-break"></div>\n\n');
}

async function generate(content, outputName, outputDir, ext) {
    await mdToPdf(
        { content },
        {
            dest: `${outputDir}/${outputName}.${ext}`,
            stylesheet: `${__dirname}/styles.css`,
            as_html: ext === 'html',
            pdf_options: {
                format: 'Letter',
                margin: '10mm 5mm'
            },
            launch_options: {
                defaultViewport: {
                    width: 1920,
                    height: 1080
                }
            }
        }
    );
}

async function main() {
    const {
        coverPage,
        references,
        outputName = 'Matthew_Meade_Resume',
        html,
        pdf = true,
        outputDir = `${__dirname}/output`
    } = argv;

    const md = readMarkdown(coverPage, references);

    const content = wrapHeadingSections(md);

    if (html) {
        generate(content, outputName, outputDir, 'html');
    }

    if (pdf) {
        generate(content, outputName, outputDir, 'pdf');
    }
}

main().catch((e) => console.error(e));
