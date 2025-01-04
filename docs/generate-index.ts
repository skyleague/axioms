import fs from 'node:fs'
import path from 'node:path'

const readmePath = './src/content/docs/api/README.md'
const outputFilePath = './src/content/docs/generated-docs.md'
const descriptionsDir = './src/utils'
const overviewPath = './src/utils/overview.md'
const itemsDir = './src/content/docs'
const frontmatter = `---
title: Axioms
--- `

function readFile(filePath: string): string {
    try {
        return fs.readFileSync(filePath, 'utf8')
    } catch (error) {
        console.error(`Error reading file at ${filePath}:`, error)
        return ''
    }
}

function parseReadme(readmeContent: string): { groupName: string; description?: string; links: string[] }[] {
    const groups: { groupName: string; description?: string; links: string[] }[] = []
    const groupRegex = /##\s+([^\n]+)\s*\n([\s\S]*?)(?=\n##|\Z)/g

    let match: RegExpExecArray | null
    do {
        match = groupRegex.exec(readmeContent)
        if (match) {
            const groupName = match[1].trim()
            const groupContent = match[2].trim()
            const splitContent = groupContent.split('\n').filter((line) => line.trim() !== '')

            const description = splitContent.length > 0 && !splitContent[0].startsWith('-') ? splitContent[0] : undefined
            const links = splitContent.filter((line) => line.startsWith('-')).map((line) => line.replace(/^-/, '').trim())

            groups.push({ groupName, description, links })
        }
    } while (match)
    return groups
}

function getGroupDescription(groupName: string): string | undefined {
    const descriptionFilePath = path.join(descriptionsDir, `${groupName.toLowerCase()}.md`)
    return fs.existsSync(descriptionFilePath) ? readFile(descriptionFilePath).trim() : undefined
}

function getItemExplanation(item: string): string {
    const itemPath = path.join(itemsDir, `${item.replace(/\/$/, '')}.md`)
    if (fs.existsSync(itemPath)) {
        const content = readFile(itemPath)
        const explanationMatch = content.match(/(?:---\s*([\s\S]*?)\s*---)(?=[\s\S]*?##\s)([\s\S]*?)(?=##)/)
        const exampleMatch = content.match(/(?:(### Example[\s\S]*?)(##\s))/)
        const modifiedExampleMatch = exampleMatch ? exampleMatch[1].replace(/### Example/, '') : ''
        const itemExplanation = `${explanationMatch ? explanationMatch[2] : ''} ${modifiedExampleMatch}`

        return itemExplanation
    }
    return ''
}

function generateGroupSection(groupName: string, links: string[], description: string | undefined): string {
    const descriptionSection = description ? `${description}\n` : ''
    const itemsCard = links
        .map((link) => {
            const itemPath = link.replace(/\[([^\]]+)]\(([^)]+)\)/, (_match, _text, url) => url)
            const itemExplanation = getItemExplanation(itemPath)
            return `- #### ${link}\n  ${itemExplanation}`
        })
        .join('\n')

    const itemsTitle = descriptionSection.length ? '#### Functions' : ''

    return `## ${groupName} \n ${descriptionSection} \n ${itemsTitle} \n${itemsCard}\n`
}

function generateMarkdown(): string {
    const readmeContent = readFile(readmePath)
    const overviewContent = readFile(overviewPath)

    const groups = parseReadme(readmeContent)

    const groupSections = groups
        .map((group) => {
            const description = getGroupDescription(group.groupName)
            return generateGroupSection(group.groupName, group.links, description)
        })
        .join('\n')

    return `${frontmatter} \n ${overviewContent} \n ${groupSections}`
}

function generateAndSaveMarkdown() {
    fs.writeFileSync(outputFilePath, generateMarkdown(), 'utf8')
    console.log(`Axioms file generated at ${outputFilePath}`)
}

generateAndSaveMarkdown()
